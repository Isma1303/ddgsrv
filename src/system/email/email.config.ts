import { configuration } from '../configuration'
import { createTransport } from 'nodemailer'

const smtpPort = configuration.mailTrap.port
const smtpHost = configuration.mailTrap.host
const smtpServerName = process.env.MAIL_TRAP_TLS_SERVERNAME || (smtpHost === 'smtp-relay.brevo.com' ? 'smtp-relay.sendinblue.com' : smtpHost)
const fromAddressPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const namedFromAddressPattern = /^.+<[^\s@]+@[^\s@]+\.[^\s@]+>$/

const isValidFromAddress = (value: string): boolean => {
    const normalized = value.trim()
    return fromAddressPattern.test(normalized) || namedFromAddressPattern.test(normalized)
}

export const emailConfig = createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    tls: {
        servername: smtpServerName
    },
    auth: {
        user: configuration.mailTrap.user,
        pass: configuration.mailTrap.password
    }
})

export const sendEmail = async (to: string, subject: string, text: string, html?: string) => {
    try {
        if (!configuration.mailTrap.user || !configuration.mailTrap.password) {
            throw new Error("Missing SMTP credentials. Define MAIL_TRAP_USER and MAIL_TRAP_PASSWORD")
        }

        if (!configuration.mailTrap.from || !isValidFromAddress(configuration.mailTrap.from)) {
            throw new Error(`Invalid MAIL_FROM value: "${configuration.mailTrap.from}". Use "correo@dominio.com" or "Nombre <correo@dominio.com>"`)
        }

        await emailConfig.sendMail({
            from: configuration.mailTrap.from,
            to,
            subject,
            text,
            html,
        })
        return true
    } catch (error) {
        console.error("Error sending email:", error)
        return false
    }
}