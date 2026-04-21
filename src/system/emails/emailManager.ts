import { nodemailerSendEmail } from './nodemailer_send_email'

export type EMAIL_TRANSPORT = 'nodemailer'

export interface ISendEmailParams {
    to: string[]
    subject: string
    html: string
    sender?: string
    transport: EMAIL_TRANSPORT
}

const sendEmail = async (params: ISendEmailParams) => {
    switch (params.transport) {
        case 'nodemailer':
            await nodemailerSendEmail({
                to: params.to,
                subject: params.subject,
                html: params.html,
                from: "donotreply@3d400c8f-11c8-4c8b-a5de-54e096eb6e28.azurecomm.net",
                sender: params.sender,
            })
            break
        default:
            throw new Error('Transport not supported')
    }
}

export default sendEmail
