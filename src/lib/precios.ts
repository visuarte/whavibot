/**
 * Módulo de productos y precios - Visuarte Print Shop
 * 
 * Ahora lee desde Neon PostgreSQL como fuente única de verdad.
 * Mantiene fallback estático solo para desarrollo sin DB.
 * 
 * Todos los precios son BASE (sin IVA). 
 * El IVA se calcula como 21% sobre la base.
 */

import { getProductsFromDB, getProductByKeyDB } from "./db"
import type { ProductCatalog, PrecioCalculado, ProductType, ProductUnit } from "./types"

/**
 * Fallback estático para desarrollo sin DB
 */
const PRODUCTS_FALLBACK: Record<string, ProductCatalog> = {
    tarjetas_clasicas: {
        key: "tarjetas_clasicas",
        nombre: "Tarjetas Clásicas",
        descripcion: "Tarjetas de visita clásicas",
        imagen: "",
        tipo: "cantidad_fija",
        unidad: "uds",
        cantidadesDisponibles: [250, 500, 1000, 2500],
        precios: {
            250: 55.50,
            500: 70.76,
            1000: 90.05,
            2500: 165.45
        }
    },
    lona_frontlit: {
        key: "lona_frontlit",
        nombre: "Lona Frontlit",
        descripcion: "Lona publicitaria para exteriores",
        imagen: "",
        tipo: "por_m2",
        precioPorM2: 7.00,
        unidad: "m²",
        cantidadesDisponibles: []
    }
}

/**
 * Convierte producto de DB a formato catálogo
 */
function dbToCatalog(p: any): ProductCatalog {
    const cantidades = p.prices ? p.prices.map((pr: any) => pr.cantidad).sort((a: number, b: number) => a - b) : []
    const precios: Record<number, number> = {}
    if (p.prices) {
        p.prices.forEach((pr: any) => {
            precios[pr.cantidad] = parseFloat(pr.precioBase)
        })
    }

    return {
        key: p.key,
        nombre: p.nombre,
        descripcion: p.descripcion,
        imagen: p.imagen,
        tipo: p.tipo as ProductType,
        precioPorM2: p.precioPorM2 ? parseFloat(p.precioPorM2) : undefined,
        unidad: p.unidad as ProductUnit,
        cantidadesDisponibles: cantidades,
        precios
    }
}

/**
 * Obtiene productos desde DB (fuente principal)
 */
export async function getProductsFromDBCached(): Promise<Record<string, ProductCatalog>> {
    try {
        const products = await getProductsFromDB()

        if (!products || products.length === 0) {
            console.warn("[precios] DB vacía, usando fallback estático")
            return PRODUCTS_FALLBACK
        }

        const catalog: Record<string, ProductCatalog> = {}
        products.forEach((p: any) => {
            catalog[p.key] = dbToCatalog(p)
        })

        return catalog
    } catch (error) {
        console.error("[precios] Error DB, usando fallback:", error)
        return PRODUCTS_FALLBACK
    }
}

/**
 * Obtiene un producto por key desde DB
 */
export async function getProductByKey(key: string): Promise<ProductCatalog | null> {
    try {
        const product = await getProductByKeyDB(key)

        if (!product) {
            return PRODUCTS_FALLBACK[key] || null
        }

        return dbToCatalog(product)
    } catch (error) {
        console.error("[precios] Error al obtener producto:", error)
        return PRODUCTS_FALLBACK[key] || null
    }
}

/**
 * Obtiene lista de productos para select
 */
export async function getProductList(): Promise<ProductCatalog[]> {
    const products = await getProductsFromDBCached()
    return Object.values(products).sort((a, b) => a.nombre.localeCompare(b.nombre))
}

/**
 * Verifica si un producto tiene variantes
 */
export function tieneVariantes(product: ProductCatalog): boolean {
    const v = (product as any).variantes
    return v ? v.length > 0 : false
}

/**
 * Obtiene variantes de un producto
 */
export function getVariantes(product: ProductCatalog): string[] {
    if (!product.precios) return []
    return Object.keys(product.precios).map(String)
}

// Re-export types
export type { ProductCatalog, PrecioCalculado, ProductType, ProductUnit } from "./types"

// IVA constants
export const IVA_PERCENT = 0.21

/**
 * Redondeo psicológico - convierte precio técnico a comercial
 * Ej: 84.09 -> 89.99, 120.50 -> 129.99
 */
export function redondeoPsicologico(base: number): number {
    if (base <= 0) return 0

    // Redondear a 9.99
    const rounded = Math.ceil(base / 10) * 10 - 0.01
    return Math.round(rounded * 100) / 100
}

/**
 * Calcula precio de un producto (usa DB o fallback)
 */
export async function calcularPrecio(
    productoKey: string,
    cantidad: number | string,
    areaM2?: number,
    varianteIndex?: number
): Promise<PrecioCalculado> {
    const producto = await getProductByKey(productoKey)

    if (!producto) {
        throw new Error(`Producto no encontrado: ${productoKey}`)
    }

    let base = 0
    let cantidadFinal: number

    // Producto por metro cuadrado
    if (producto.tipo === "por_m2") {
        const area = areaM2 || 1
        base = (producto.precioPorM2 || 0) * area
        cantidadFinal = area
    }
    // Producto con cantidad fija
    else if (producto.tipo === "cantidad_fija" && producto.precios) {
        const cantidadNum = parseInt(String(cantidad)) || 0
        cantidadFinal = cantidadNum

        // Buscar precio exacto o interpolar
        const precios = producto.precios

        if (precios[cantidadNum]) {
            base = precios[cantidadNum]
        } else {
            // Interpolar entre precios cercanos
            const cantidades = Object.keys(precios).map(Number).sort((a, b) => a - b)
            const menor = cantidades.filter(c => c <= cantidadNum).pop()
            const mayor = cantidades.find(c => c >= cantidadNum)

            if (menor && mayor && menor !== mayor) {
                // Interpolación lineal
                const ratio = (cantidadNum - menor) / (mayor - menor)
                base = precios[menor] + (precios[mayor] - precios[menor]) * ratio
            } else if (menor) {
                base = precios[menor]
            } else if (mayor) {
                base = precios[mayor]
            }
        }
    } else {
        // Default para productos sin precios definidos
        cantidadFinal = parseInt(String(cantidad)) || 1
    }

    // Redondeo psicológico
    base = redondeoPsicologico(base)

    const iva = base * IVA_PERCENT
    const total = base + iva

    return {
        base,
        iva,
        total,
        cantidad: cantidadFinal,
        producto: {
            nombre: producto.nombre,
            key: producto.key
        }
    }
}

// Export PRODUCTS for backward compatibility (uses fallback in SSR)
export const PRODUCTS = PRODUCTS_FALLBACK
