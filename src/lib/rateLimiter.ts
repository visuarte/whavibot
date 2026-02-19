/**
 * Rate Limiter simple para APIs públicas
 * Usa almacenamiento en memoria (para desarrollo local)
 * Para producción: usar Redis/Upstash
 */

import { RateLimiterMemory } from 'rate-limiter-flexible'

// Limit: 10 requests per minute per IP
const rateLimiter = new RateLimiterMemory({
    points: 10,
    duration: 60,
})

/**
 * Verifica rate limit y lanza error si excedido
 */
export async function checkRateLimit(ip: string): Promise<void> {
    try {
        await rateLimiter.consume(ip)
    } catch {
        throw new Error('Too many requests. Please try again later.')
    }
}

/**
 * Extrae IP del request (maneja proxies)
 */
export function getClientIp(request: Request): string {
    const forwarded = request.headers.get('x-forwarded-for')
    if (forwarded) {
        return forwarded.split(',')[0].trim()
    }
    return request.headers.get('x-real-ip') || 'unknown'
}
