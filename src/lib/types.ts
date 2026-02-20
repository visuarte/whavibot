/**
 * Tipos para el catálogo de productos
 */

export type ProductType = "cantidad_fija" | "por_m2" | "gran_formato"
export type ProductUnit = "uds" | "m²" | "cm"

export interface ProductVariant {
    nombre: string
    precios: Record<number, number>
}

export interface ProductCatalog {
    key: string
    nombre: string
    descripcion?: string
    imagen?: string
    tipo: ProductType
    precioPorM2?: number
    cantidadesDisponibles: number[]
    unidad: ProductUnit
    precios?: Record<number, number>
    variantes?: ProductVariant[]
    category?: string
    // Para gran formato (flexible/rígido)
    materialType?: string // 'flexible' | 'rigido' | etc
    anchoMinCm?: number
    anchoMaxCm?: number
    altoMinCm?: number
    altoMaxCm?: number
    anchoRecomendadoCm?: number
    altoRecomendadoCm?: number
}

export interface PrecioCalculado {
    base: number
    iva: number
    total: number
    cantidad: number
    producto: {
        nombre: string
        key: string
    }
    unidad?: string
}
