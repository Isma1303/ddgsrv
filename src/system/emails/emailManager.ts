/* eslint-disable indent */
import { auth0OutlookSendEmail } from './auth0_outlook_send_email'
import { nodemailerSendEmail } from './nodemailer_send_email'

export type EMAIL_TRANSPORT = 'nodemailer' | 'auth0'

export interface ISendEmailParams {
    to: string[]
    subject: string
    html: string
    from: string
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
                from: params.from,
                sender: params.sender,
            })
            break
        case 'auth0':
            await auth0OutlookSendEmail({
                toRecipients: params.to,
                subject: params.subject,
                body: params.html,
                emailContentType: 'HTML',
            })
            break
        default:
            throw new Error('Transport not supported')
    }
}

export default sendEmail
