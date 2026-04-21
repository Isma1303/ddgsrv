import express from 'express'
import { config } from 'dotenv'
config()
import morgan from 'morgan'
import { routes } from './system/routes'
//CORS
import cors from 'cors'
import { corsOptions } from './system/lib/cors.config'

//Passport
import passport from 'passport'
import { strategies } from './system/lib/passport.config'

//Swagger
import swaggerUi from 'swagger-ui-express'
import swaggerJsDoc from 'swagger-jsdoc'
import { swaggerConfig } from './system/lib/swagger.config'

//security
import helmet from 'helmet'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const permissionsPolicy = require('permissions-policy')

//Rate Limiting

const app = express()
// if (process.env.DEV_MODE !== 'true') {
//     app.set('trust proxy', true)
// }
// Settings
app.set('port', process.env.PORT || 3000)

//Middlewares
app.use(
    helmet({
        hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'", process.env.URL_PROD || ''],
                imgSrc: ["'self'", 'data:'],
                connectSrc: ["'self'", process.env.URL_PROD || ''],
            },
        },
        frameguard: { action: 'sameorigin' },
        noSniff: true,
        referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
    }),
)
app.use(
    permissionsPolicy({
        features: {
            geolocation: ['self'],
            camera: [],
        },
    }),
)
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))
app.use(express.static('public'))
app.use(passport.initialize())
passport.use(strategies.JWT.strategy)

// Routes
routes.forEach((ruta) => app.use(ruta.endPoint, ruta.router))

if (process.env.DEV_MODE === 'true') {
    const specs = swaggerJsDoc(swaggerConfig)
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs))
}
app.use(function (req, res) {
    const respuesta = {
        message: 'Recurso no encontrado',
        statusCode: 404,
    }
    res.status(respuesta.statusCode).json(respuesta)
})

// Static files

// Starting the server
app.listen(app.get('port'), () => {
    console.info(`Server on port ${app.get('port')}`)
})
