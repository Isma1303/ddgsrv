import { Attachment } from 'nodemailer/lib/mailer'

export default interface Email {
    from: string
    sender?: string
    subject: string
    to: string | string[]
    html: string
    cc?: string | string[]
    bcc?: string | string[]
    text?: string
    attachments?: Attachment[]
}
