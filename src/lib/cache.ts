/**
 * Sistema de caché en memoria para datos que rara vez cambian
 * Especialmente útil para productos que son estáticos
 */

interface CacheEntry<T> {
    data: T
    timestamp: number
    ttl: number // en milisegundos
}

class MemoryCache {
    private cache = new Map<string, CacheEntry<any>>()

    /**
     * Obtiene un valor del caché
     */
    get<T>(key: string): T | null {
        const entry = this.cache.get(key)

        if (!entry) {
            return null
        }

        // Verificar si el caché ha expirado
        const age = Date.now() - entry.timestamp
        if (age > entry.ttl) {
            this.cache.delete(key)
            return null
        }

        return entry.data as T
    }

    /**
     * Establece un valor en el caché
     */
    set<T>(key: string, data: T, ttl: number = 3600000): void {
        this.cache.set(key, {
            data,
            timestamp: Date.now(),
            ttl
        })
    }

    /**
     * Elimina un valor del caché
     */
    delete(key: string): void {
        this.cache.delete(key)
    }

    /**
     * Limpia todo el caché
     */
    clear(): void {
        this.cache.clear()
    }

    /**
     * Obtiene el número de entradas en caché
     */
    size(): number {
        return this.cache.size
    }
}

// Instancia global del caché
const cache = new MemoryCache()

/**
 * Caché de productos con validación automática
 * TTL: 1 hora (3600000 ms)
 */
export const productCache = {
    /**
     * Obtiene productos del caché
     */
    get: () => cache.get('products'),

    /**
     * Establece productos en caché
     */
    set: (data: any) => cache.set('products', data, 3600000),

    /**
     * Invalida el caché de productos
     */
    invalidate: () => cache.delete('products')
}

/**
 * Caché de cotizaciones recientes
 * TTL: 5 minutos (300000 ms)
 */
export const quotationCache = {
    /**
     * Obtiene cotizaciones del caché
     */
    get: () => cache.get('quotations'),

    /**
     * Establece cotizaciones en caché
     */
    set: (data: any) => cache.set('quotations', data, 300000),

    /**
     * Invalida el caché
     */
    invalidate: () => cache.delete('quotations')
}

/**
 * Exporta la instancia de caché para uso directo si es necesario
 */
export const memoryCache = cache
