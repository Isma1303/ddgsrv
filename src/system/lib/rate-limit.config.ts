import rateLimit from 'express-rate-limit'

// Rate limiter para endpoints de autenticación (más restrictivo)
export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 10, // máximo 10 intentos por IP por ventana de tiempo
    message: {
        error: 'Demasiados intentos de autenticación. Intente nuevamente en 15 minutos.',
        statusCode: 429,
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    skipSuccessfulRequests: false, // Count successful requests
    skipFailedRequests: false, // Count failed requests
})

// Rate limiter estándar para endpoints protegidos
export const standardLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // máximo 100 requests por IP por ventana de tiempo
    message: {
        error: 'Demasiadas solicitudes. Intente nuevamente en 15 minutos.',
        statusCode: 429,
    },
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: false,
    skipFailedRequests: false,
})

// Rate limiter más permisivo para endpoints públicos (como health check)
export const publicLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 1000, // máximo 300 requests por IP por ventana de tiempo
    message: {
        error: 'Demasiadas solicitudes. Intente nuevamente en 15 minutos.',
        statusCode: 429,
    },
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: false,
    skipFailedRequests: false,
})

// Rate limiter para endpoints críticos (más restrictivo)
export const criticalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 20, // máximo 20 requests por IP por ventana de tiempo
    message: {
        error: 'Demasiadas solicitudes a recursos críticos. Intente nuevamente en 15 minutos.',
        statusCode: 429,
    },
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: false,
    skipFailedRequests: false,
})
