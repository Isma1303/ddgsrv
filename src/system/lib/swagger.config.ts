export const swaggerConfig = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'codeliq API',
            version: '0.0.1',
            description: 'Servidor para codeliq',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
            {
                url: '',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./src/**/*.doc.ts'],
}
