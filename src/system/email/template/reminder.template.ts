import { IUser } from "../../../admin/auth/user.interface";
import { IEvent } from "../../../ddg/events/events.interface";

export const ReminderTemplate = (
    logo_url: string,
    user_name: string,
    service_name: string,
    service_date:string | Date,
    event_link: string,
) => {
  const year = new Date().getFullYear();
  return `
    <!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Recordatorio de Evento</title>
</head>

<body style="margin:0; padding:0; background-color:#ffffff; font-family: Arial, Helvetica, sans-serif;">

    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#ffffff;">
        <tr>
            <td align="center">

                <!-- Contenedor principal -->
                <table width="600" cellpadding="0" cellspacing="0" style="border-collapse:collapse; background-color:#ffffff;">

                    <!-- HEADER -->
                    <tr>
                        <td align="center" style="background-color:#06b6d4; padding:25px;">
                            <img src="${logo_url}" alt="Logo" style="max-height:60px; display:block;">
                        </td>
                    </tr>

                    <!-- BODY -->
                    <tr>
                        <td style="padding:35px; color:#000000;">

                            <h2 style="margin-top:0; color:#000000;">
                                Hola, ${user_name}
                            </h2>

                            <p style="font-size:15px; line-height:1.6; margin-bottom:25px;">
                                Este es un recordatorio de tu evento programado. 
                                A continuación encontrarás los detalles:
                            </p>

                            <!-- Card de información -->
                            <table width="100%" cellpadding="0" cellspacing="0" 
                                   style="border:1px solid #e5e5e5; border-radius:6px; padding:20px;">
                                <tr>
                                    <td style="padding:15px;">

                                        <p style="margin:10px 0;">
                                            <strong>Evento:</strong> ${service_name}
                                        </p>

                                        <p style="margin:10px 0;">
                                            <strong>Fecha:</strong> ${service_date}
                                        </p>

                                        <p style="margin:10px 0;">
                                            <strong>Departamento:</strong> ${event_link}
                                        </p>

                                    </td>
                                </tr>
                            </table>

                            <!-- Botón -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:30px;">
                                <tr>
                                    <td align="center">
                                        <a href="${event_link}"
                                           style="background-color:#06b6d4; 
                                                  color:#ffffff; 
                                                  text-decoration:none; 
                                                  padding:14px 30px; 
                                                  border-radius:5px; 
                                                  display:inline-block; 
                                                  font-weight:bold;">
                                            Ver Detalles
                                        </a>
                                    </td>
                                </tr>
                            </table>

                            <p style="font-size:14px; margin-top:30px; line-height:1.6;">
                                Por favor, asegúrate de asistir puntualmente.
                            </p>

                        </td>
                    </tr>

                    <tr>
                        <td align="center" style="padding:20px; font-size:12px; color:#666666; border-top:1px solid #e5e5e5;">
                            © ${year} Tu Empresa <br>
                            Este es un correo automático, por favor no responder.
                        </td>
                    </tr>

                </table>

            </td>
        </tr>
    </table>

</body>
</html>
    `;
};
