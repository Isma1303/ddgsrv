import config from '../../config'

export const nodeMailerConfig = {
    host: config.EMAIL.EMAIL_HOST,
    port: parseInt(config.EMAIL.EMAIL_PORT),
    auth: {
        user: config.EMAIL.EMAIL_USER,
        pass: config.EMAIL.EMAIL_PASS.length > 0 ? config.EMAIL.EMAIL_PASS : config.EMAIL.EMAIL_SECRET_KEY,
    },
}
