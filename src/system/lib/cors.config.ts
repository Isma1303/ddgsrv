import * as cors from 'cors'

const allowedOrigins: string[] = ['']
if (process.env.DEV_MODE === 'true') {
    allowedOrigins.push(
        ...['http://localhost:3000', 'http://localhost:5173', 'http://localhost:5173/', 'http://127.0.0.1:5173', process.env.URL_DEV || ''].filter(
            Boolean,
        ),
    )
}

export const corsOptions: cors.CorsOptions = {
    origin: function (origin, callback) {
        // Permitir solicitudes sin origin (requests de misma-origen, Postman, etc)
        if (!origin) {
            callback(null, true)
            return
        }

        // Permitir todos los localhost en cualquier puerto
        if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
            callback(null, true)
            return
        }

        // En producción, validar contra lista de orígenes permitidos
        if (allowedOrigins.includes(origin)) {
            callback(null, true)
        } else {
            console.warn(`CORS bloqueó origen: ${origin}`)
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'offset',
        'limit',
        'sort',
        'orden',
        'details',
        'directionsort',
        'nofilterrls',
        'conditions',
    ],
}
