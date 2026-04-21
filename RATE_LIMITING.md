# Rate Limiting Implementation

## Overview

Esta aplicación implementa un sistema de rate limiting en múltiples niveles para proteger contra ataques de fuerza bruta, abuso de API y mejorar la seguridad general.

## Configuraciones de Rate Limiting

### 1. Auth Limiter (Más Restrictivo)

- **Ventana de tiempo**: 15 minutos
- **Límite**: 10 requests por IP
- **Aplicación**: Endpoints de autenticación (`/user/authenticate`)
- **Propósito**: Prevenir ataques de fuerza bruta en login

### 2. Critical Limiter (Restrictivo)

- **Ventana de tiempo**: 15 minutos
- **Límite**: 50 requests por IP
- **Aplicación**: Endpoints críticos del sistema
- **Endpoints incluidos**:
    - `/user/authenticate`
    - `/employee/sendBonusReport`
    - `/user/changePassword`
    - `/user/authToken`

### 3. Standard Limiter (Estándar)

- **Ventana de tiempo**: 15 minutos
- **Límite**: 100 requests por IP
- **Aplicación**: Todos los endpoints protegidos por autenticación
- **Propósito**: Protección general de la API

### 4. Public Limiter (Permisivo)

- **Ventana de tiempo**: 15 minutos
- **Límite**: 300 requests por IP
- **Aplicación**: Endpoints públicos
- **Endpoints incluidos**:
    - `/` (endpoint principal)
    - `/encrypt/:value`
    - `/health`

## Endpoints Exentos de Rate Limiting

Los siguientes endpoints no tienen rate limiting aplicado:

- `/health` - Health check
- `/docs` - Documentación Swagger
- `/docs/*` - Recursos de documentación

## Implementación Técnica

### Archivos Principales

1. **`src/system/lib/rate-limit.config.ts`**
    - Configuraciones centralizadas de rate limiting
    - Diferentes niveles de restricción

2. **`src/system/utils/rate-limit.utils.ts`**
    - Middlewares personalizados para aplicar rate limiting específico
    - Lógica para determinar qué tipo de rate limiting aplicar

3. **`src/app.ts`**
    - Aplicación global del rate limiting estándar
    - Middleware específico para endpoints críticos

### Middlewares Aplicados

1. **Rate Limiting Global**: Se aplica a todas las rutas
2. **Rate Limiting Específico**: Se aplica según el tipo de endpoint
3. **Rate Limiting Individual**: Se aplica a endpoints específicos cuando es necesario

## Headers de Respuesta

El sistema incluye headers estándar de rate limiting:

- `RateLimit-Limit`: Límite de requests por ventana
- `RateLimit-Remaining`: Requests restantes en la ventana actual
- `RateLimit-Reset`: Tiempo hasta el reset de la ventana

## Mensajes de Error

Cuando se excede el límite, se devuelve un error 429 (Too Many Requests) con un mensaje descriptivo:

```json
{
    "error": "Demasiadas solicitudes. Intente nuevamente en 15 minutos.",
    "statusCode": 429
}
```

## Configuración por Entorno

Los límites pueden ajustarse según el entorno:

- **Desarrollo**: Límites más permisivos para facilitar testing
- **Producción**: Límites más restrictivos para seguridad

## Monitoreo y Logs

Se recomienda monitorear:

- Número de requests bloqueados por rate limiting
- IPs que frecuentemente exceden los límites
- Patrones de uso anómalos

## Mejores Prácticas

1. **Configuración Gradual**: Los límites se pueden ajustar gradualmente según el uso real
2. **Monitoreo Continuo**: Revisar logs regularmente para detectar patrones anómalos
3. **Documentación**: Mantener actualizada la documentación de endpoints críticos
4. **Testing**: Probar los límites en entorno de desarrollo antes de producción

## Personalización

Para agregar nuevos endpoints críticos, editar el array `CRITICAL_ENDPOINTS` en `src/system/utils/rate-limit.utils.ts`.

Para modificar límites, editar las configuraciones en `src/system/lib/rate-limit.config.ts`.
