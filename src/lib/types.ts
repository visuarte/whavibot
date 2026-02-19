/**
 * Tipos para el catálogo de productos
 */

export type ProductType = "cantidad_fija" | "por_m2"
export type ProductUnit = "uds" | "m²"

export interface ProductVariant {
    nombre: string
    precios: Record<number, number>
}

export interface ProductCatalog {
    key: string
    nombre: string
    descripcion?: string
    tipo: ProductType
    precioPorM2?: number
    cantidadesDisponibles: number[]
    unidad: ProductUnit
    precios?: Record<number, number>
    variantes?: ProductVariant[]
}

export interface PrecioCalculado {
    base: number
    iva: number
    total: number
    cantidad: string
    producto: string
}
