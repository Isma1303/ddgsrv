import { Request, Response, NextFunction } from 'express'
import { criticalLimiter, standardLimiter } from '../lib/rate-limit.config'

// Lista de endpoints críticos que requieren rate limiting más restrictivo
const CRITICAL_ENDPOINTS = [
    '/user/authenticate',
    '/employee/sendBonusReport',
    '/user/changePassword',
    '/user/authToken'
]

// Lista de endpoints que deben saltarse el rate limiting global
const SKIP_RATE_LIMIT_ENDPOINTS = [
    '/health',
    '/docs',
    '/docs/*',
]

/**
 * Middleware para aplicar rate limiting específico según el tipo de endpoint
 */
export const applySpecificRateLimit = (req: Request, res: Response, next: NextFunction) => {
    const path = req.path

    // Saltar rate limiting para endpoints específicos
    if (SKIP_RATE_LIMIT_ENDPOINTS.some(endpoint =>
        endpoint.endsWith('*') ? path.startsWith(endpoint.slice(0, -1)) : path === endpoint
    )) {
        return next()
    }

    // Aplicar rate limiting crítico para endpoints sensibles
    if (CRITICAL_ENDPOINTS.some(endpoint => path.includes(endpoint))) {
        return criticalLimiter(req, res, next)
    }

    // Para el resto, usar el rate limiting estándar (ya aplicado globalmente)
    return next()
}

/**
 * Middleware para aplicar rate limiting crítico a endpoints específicos
 */
export const applyCriticalRateLimit = (req: Request, res: Response, next: NextFunction) => {
    return criticalLimiter(req, res, next)
}

/**
 * Middleware para aplicar rate limiting estándar a endpoints específicos
 */
export const applyStandardRateLimit = (req: Request, res: Response, next: NextFunction) => {
    return standardLimiter(req, res, next)
} 