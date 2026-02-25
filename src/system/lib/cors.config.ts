import * as cors from 'cors'

const allowedOrigins: string[] = ['']
if (process.env.DEV_MODE === 'true') {
    allowedOrigins.push(
        ...[

            'http://localhost:3000',
            'http://localhost:4200',


        ],
    )
}

export const corsOptions: cors.CorsOptions = {
    origin: function (origin, callback) {
        if (origin && allowedOrigins.includes(origin)) {
            callback(null, true)
        } else if (origin) {
            callback(new Error('Not allowed by CORS'))
        } else {
            callback(null, true)
        }
    },
}
