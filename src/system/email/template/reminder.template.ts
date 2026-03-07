import { DepartmentModel } from "../../../ddg/departments/department.model";

export const ReminderTemplate = (
  logo_url: string,
  user_name: string,
  service_name: string,
  service_date: string | Date,
  event_link: string,
  event_start: string | Date,
  event_end: string | Date,
  notes?: string,
) => {
  const departmentModel = new DepartmentModel();
  const formatDate = (value: string | Date): string => {
    const date = value instanceof Date ? value : new Date(value);

    if (Number.isNaN(date.getTime())) {
      return String(value);
    }

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const formatTime = (value: string | Date): string => {
    const date = value instanceof Date ? value : new Date(value);

    if (Number.isNaN(date.getTime())) {
      return String(value);
    }

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${hours}:${minutes}`;
  };

  const formattedServiceDate = formatDate(service_date);
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
                                            <strong>Fecha:</strong> ${formattedServiceDate}
                                        </p>

                                        <p style="margin:10px 0;">
                                            <strong>Departamento:</strong> ${event_link}
                                        </p>

                                        <p style="margin:10px 0;">
                                            <strong>Hora de inicio:</strong> ${formatTime(event_start)}
                                        </p>

                                        <p style="margin:10px 0;">
                                            <strong>Hora de finalización:</strong> ${formatTime(event_end)}
                                        </p>
                                        ${
                                          notes
                                            ? `
                                        <p style="margin:10px 0;">
                                            <strong>Notas:</strong> ${notes}
                                        </p>
                                        `
                                            : ""
                                        }
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
                            © ${year} Codeliq <br>
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
