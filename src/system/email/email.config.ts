import { configuration } from "../configuration";
import { createTransport } from "nodemailer";

const smtpPort = configuration.mailTrap.port;
const smtpHost = configuration.mailTrap.host;
const smtpServerName = process.env.MAIL_TRAP_TLS_SERVERNAME;
const fromAddressPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const namedFromAddressPattern = /^.+<[^\s@]+@[^\s@]+\.[^\s@]+>$/;
const EMAIL_MAX_ATTEMPTS = Number(process.env.EMAIL_MAX_ATTEMPTS || 5);
const EMAIL_RETRY_BASE_DELAY_MS = Number(
  process.env.EMAIL_RETRY_BASE_DELAY_MS || 5000,
);
const RATE_LIMIT_STATUS_CODES = new Set([421, 429, 450, 451, 452]);
const SMTP_RATE_DELTA_MS = Number(process.env.SMTP_RATE_DELTA_MS || 60000);
const SMTP_RATE_LIMIT = Number(process.env.SMTP_RATE_LIMIT || 10);

export interface SendEmailResult {
  sent: boolean;
  rateLimited: boolean;
}

const isValidFromAddress = (value: string): boolean => {
  const normalized = value.trim();
  return (
    fromAddressPattern.test(normalized) ||
    namedFromAddressPattern.test(normalized)
  );
};

export const emailConfig = createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: false,
  pool: true,
  maxConnections: 1,
  rateDelta: SMTP_RATE_DELTA_MS,
  rateLimit: SMTP_RATE_LIMIT,
  tls: {
    servername: smtpServerName,
  },
  auth: {
    user: configuration.mailTrap.user,
    pass: configuration.mailTrap.password,
  },
});

export const sendEmail = async (
  to: string,
  subject: string,
  text: string,
  html?: string,
): Promise<SendEmailResult> => {
  if (!configuration.mailTrap.user || !configuration.mailTrap.password) {
    throw new Error(
      "Missing SMTP credentials. Define MAIL_TRAP_USER and MAIL_TRAP_PASSWORD",
    );
  }

  if (
    !configuration.mailTrap.from ||
    !isValidFromAddress(configuration.mailTrap.from)
  ) {
    throw new Error(
      `Invalid MAIL_FROM value: "${configuration.mailTrap.from}". Use "correo@dominio.com" or "Nombre <correo@dominio.com>"`,
    );
  }

  const normalizedText = text ?? "";
  const looksLikeHtml = /<\/?[a-z][\s\S]*>/i.test(normalizedText);
  const htmlBody = html ?? (looksLikeHtml ? normalizedText : undefined);
  const textBody = looksLikeHtml
    ? "Este correo contiene contenido HTML. Si no puedes verlo, habilita la visualizacion HTML en tu cliente de correo."
    : normalizedText;

  for (let attempt = 1; attempt <= EMAIL_MAX_ATTEMPTS; attempt += 1) {
    try {
      await emailConfig.sendMail({
        from: configuration.mailTrap.from,
        to,
        subject,
        text: textBody,
        html: htmlBody,
      });
      return { sent: true, rateLimited: false };
    } catch (error: any) {
      const responseCode = Number(error?.responseCode);
      const errorMessage = String(error?.response || error?.message || "");
      const isRateLimited =
        RATE_LIMIT_STATUS_CODES.has(responseCode) ||
        /excessive message rate|rate limit|too many/i.test(errorMessage);
      const hasAttemptsLeft = attempt < EMAIL_MAX_ATTEMPTS;

      if (!isRateLimited || !hasAttemptsLeft) {
        console.error("Error sending email:", error);
        return { sent: false, rateLimited: isRateLimited };
      }

      const waitMs = EMAIL_RETRY_BASE_DELAY_MS * 2 ** (attempt - 1);
      await new Promise((resolve) => setTimeout(resolve, waitMs));
    }
  }

  return { sent: false, rateLimited: false };
};
