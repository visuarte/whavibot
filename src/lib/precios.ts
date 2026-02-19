/**
 * Módulo de productos y precios - Visuarte Print Shop
 * 
 * Ahora lee desde Prisma como fuente única de verdad.
 * Mantiene fallback estático solo para desarrollo sin DB.
 * 
 * Todos los precios son BASE (sin IVA). 
 * El IVA se calcula como 21% sobre la base.
 */

import { prisma } from "./prisma"
import type { Product, ProductPrice, Cotizacion, Lead } from "@prisma/client"

/**
 * Tipo de producto según el tipo de cálculo de precio
 */
export type ProductType = "cantidad_fija" | "por_m2"

/**
 * Tipo de unidad de medida
 */
export type ProductUnit = "uds" | "m²"

/**
 * Variante de precio para productos con múltiples opciones
 */
export interface ProductVariant {
    nombre: string
    precios: Record<number, number>
}

/**
 * Producto formateado para el catálogo
 */
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

/**
 * Resultado del cálculo de precio
 */
export interface PrecioCalculado {
    base: number
    iva: number
    total: number
    producto: ProductCatalog
    cantidad: number | string
    variante?: string
}

/**
 * Constante del porcentaje de IVA
 */
export const IVA_PERCENT = 0.21

/**
 * Redondeo psicológico (Charm Pricing)
 * Convierte precio técnico a precio comercial terminado en 9
 * Ej: 84.09 → 89, 169.01 → 179, 238.50 → 249
 */
export function redondeoPsicologico(precioTecnico: number): number {
    // Redondea hacia arriba al siguiente múltiplo de 10, luego resta 1 para terminar en 9
    const redondeado = Math.ceil(precioTecnico / 10) * 10
    return parseFloat((redondeado - 0.01).toFixed(2)) // termina en .99
}

// Fallback estático para desarrollo (solo si DB no tiene datos)
const PRODUCTS_FALLBACK: Record<string, ProductCatalog> = {
    tarjetas_clasicas: {
        key: "tarjetas_clasicas",
        nombre: "Tarjetas de Visita Clásicas",
        descripcion: "85x55 mm - Sin Laminar",
        tipo: "cantidad_fija",
        precios: { 250: 55.50, 500: 70.76, 1000: 90.05, 2500: 165.45 },
        cantidadesDisponibles: [250, 500, 1000, 2500],
        unidad: "uds"
    },
    tarjetas_laminadas: {
        key: "tarjetas_laminadas",
        nombre: "Tarjetas Laminadas",
        descripcion: "85x55 mm - Mate o Brillo",
        tipo: "cantidad_fija",
        precios: { 250: 75.10, 500: 90.56, 1000: 125.34, 2500: 169.90 },
        cantidadesDisponibles: [250, 500, 1000, 2500],
        unidad: "uds"
    },
    flyers_a5: {
        key: "flyers_a5",
        nombre: "Flyers A5",
        descripcion: "148x210mm, 135gr 2 caras",
        tipo: "cantidad_fija",
        precios: { 100: 45.75, 250: 65.85, 500: 85.30, 750: 110.05, 1000: 125.40, 1500: 165.40, 2500: 185.25 },
        cantidadesDisponibles: [100, 250, 500, 750, 1000, 1500, 2500],
        unidad: "uds"
    },
    vinilos_corte: {
        key: "vinilos_corte",
        nombre: "Vinilos de Corte",
        descripcion: "Con transportador, hasta 60x40cm, 2 colores",
        tipo: "por_m2",
        precioPorM2: 55,
        cantidadesDisponibles: [],
        unidad: "m²"
    }
}

/**
 * Convierte producto de Prisma a formato catálogo
 */
function prismaToCatalog(p: Product & { precios?: ProductPrice[] }): ProductCatalog {
    return {
        key: p.key,
        nombre: p.nombre,
        descripcion: p.descripcion || undefined,
        tipo: p.tipo as ProductType,
        precioPorM2: p.precioPorM2 || undefined,
        unidad: p.unidad as ProductUnit,
        cantidadesDisponibles: p.precios?.map(px => px.cantidad).sort((a, b) => a - b) || [],
        precios: p.precios?.reduce((acc, px) => {
            acc[px.cantidad] = px.precioBase
            return acc
        }, {} as Record<number, number>)
    }
}

/**
 * Obtiene productos desde DB (fuente principal)
 */
export async function getProductsFromDB(): Promise<Record<string, ProductCatalog>> {
    try {
        const products = await prisma.product.findMany({
            include: {
                precios: { orderBy: { cantidad: 'asc' } }
            },
            orderBy: { nombre: 'asc' }
        })

        if (products.length === 0) {
            console.warn("[precios] DB vacía, usando fallback estático")
            return PRODUCTS_FALLBACK
        }

        const catalog: Record<string, ProductCatalog> = {}
        products.forEach(p => {
            catalog[p.key] = prismaToCatalog(p)
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
        const product = await prisma.product.findUnique({
            where: { key },
            include: {
                precios: { orderBy: { cantidad: 'asc' } }
            }
        })

        return product ? prismaToCatalog(product) : null
    } catch (error) {
        console.error("[precios] Error al obtener producto:", error)
        return PRODUCTS_FALLBACK[key] || null
    }
}

/**
 * Obtiene lista de productos para select
 */
export async function getProductList(): Promise<ProductCatalog[]> {
    const products = await getProductsFromDB()
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
    return (product as any).variantes?.map((v: ProductVariant) => v.nombre) || []
}

/**
 * Redondea a 2 decimales
 */
function roundToTwo(num: number): number {
    return Math.round((num + Number.EPSILON) * 100) / 100
}

/**
 * Interpola precio para cantidad no exacta
 */
function interpolarPrecio(precios: Record<number, number>, cantidad: number): number {
    const cantidades = Object.keys(precios).map(Number).sort((a, b) => a - b)

    if (cantidades.length === 0) return 0
    if (cantidad <= cantidades[0]) return precios[cantidades[0]]
    if (cantidad >= cantidades[cantidades.length - 1]) return precios[cantidades[cantidades.length - 1]]

    for (let i = 0; i < cantidades.length - 1; i++) {
        if (cantidad >= cantidades[i] && cantidad <= cantidades[i + 1]) {
            const menor = cantidades[i]
            const mayor = cantidades[i + 1]
            const precioMenor = precios[menor]
            const precioMayor = precios[mayor]
            const proporcion = (cantidad - menor) / (mayor - menor)
            return roundToTwo(precioMenor + (precioMayor - precioMenor) * proporcion)
        }
    }
    return 0
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
    let cantidadFinal = cantidad

    // Producto por metro cuadrado
    if (producto.tipo === "por_m2") {
        const area = areaM2 || 1
        base = (producto.precioPorM2 || 0) * area
        cantidadFinal = `${area} m²`
    }
    // Producto con cantidad fija
    else if (producto.tipo === "cantidad_fija" && producto.precios) {
        const cantidadNum = typeof cantidad === "string" ? parseInt(cantidad) : cantidad
        base = producto.precios[cantidadNum]

        if (base === undefined) {
            base = interpolarPrecio(producto.precios, cantidadNum)
        }
    }

    const iva = roundToTwo(base * IVA_PERCENT)
    const total = roundToTwo(base + iva)

    return {
        base: roundToTwo(base),
        iva,
        total,
        producto,
        cantidad: cantidadFinal
    }
}

// Exportar PRODUCTS para compatibilidad (deprecated - usa getProductsFromDB)
export const PRODUCTS = PRODUCTS_FALLBACK
