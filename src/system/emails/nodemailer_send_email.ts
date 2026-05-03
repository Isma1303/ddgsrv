import Email from '../interfaces/email.interface'
import * as nodemailer from 'nodemailer'
import { nodeMailerConfig } from '../lib/nodemailer.config'
import configuration from '../../config'
/**
 * Sends an email using Nodemailer.
 * @param {Email} emailConfig - The configuration for the email to be sent.
 * @returns {Promise<void>} - A promise that resolves when the email is sent.
 */
export const nodemailerSendEmail = async (emailConfig: Email): Promise<void> => {
    try {
        if (!emailConfig.sender) {
            emailConfig.sender = configuration.EMAIL.EMAIL_USER
        }
        const transporter = nodemailer.createTransport(nodeMailerConfig)
        await transporter.sendMail(emailConfig)
    } catch (error) {
        throw error
    }
}
