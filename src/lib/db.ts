/**
 * Funciones de base de datos para Visuarte Print Shop
 * 
 * Este módulo proporciona funciones async para interactuar con la base de datos
 * usando Prisma. Se integra con lib/precios.ts para guardar cotizaciones y leads.
 */

import { prisma } from "./prisma"
import { IVA_PERCENT, redondeoPsicologico, type PrecioCalculado } from "./precios"

/**
 * Tipo de resultado con información de DB
 */
export interface PrecioCalculadoDB extends PrecioCalculado {
    productId?: string
    cotizacionId?: string
}

/**
 * Obtiene todos los productos desde la base de datos
 */
export async function getProductsFromDB() {
    try {
        const products = await prisma.product.findMany({
            include: {
                precios: {
                    orderBy: { cantidad: 'asc' }
                }
            },
            orderBy: { nombre: 'asc' }
        })
        return products
    } catch (error) {
        console.error("[db] Error al obtener productos de DB:", error)
        return null
    }
}

/**
 * Obtiene un producto por su key
 */
export async function getProductByKeyFromDB(key: string) {
    try {
        const product = await prisma.product.findUnique({
            where: { key },
            include: {
                precios: {
                    orderBy: { cantidad: 'asc' }
                }
            }
        })
        return product
    } catch (error) {
        console.error("[db] Error al obtener producto de DB:", error)
        return null
    }
}

/**
 * Redondea un número a 2 decimales
 */
function roundToTwo(num: number): number {
    return Math.round((num + Number.EPSILON) * 100) / 100
}

/**
 * Interpola el precio desde la base de datos
 */
function interpolarPrecioDB(
    precios: Array<{ cantidad: number; precioBase: number; variante: string | null }>,
    cantidad: number,
    variante?: string
): number {
    const preciosFiltrados = variante
        ? precios.filter(p => p.variante === variante)
        : precios.filter(p => !p.variante)

    const cantidades = preciosFiltrados.map(p => p.cantidad).sort((a, b) => a - b)

    if (cantidades.length === 0) return 0
    if (cantidad <= cantidades[0]) return preciosFiltrados.find(p => p.cantidad === cantidades[0])?.precioBase || 0
    if (cantidad >= cantidades[cantidades.length - 1]) {
        return preciosFiltrados.find(p => p.cantidad === cantidades[cantidades.length - 1])?.precioBase || 0
    }

    for (let i = 0; i < cantidades.length - 1; i++) {
        if (cantidad >= cantidades[i] && cantidad <= cantidades[i + 1]) {
            const menor = cantidades[i]
            const mayor = cantidades[i + 1]
            const precioMenor = preciosFiltrados.find(p => p.cantidad === menor)?.precioBase || 0
            const precioMayor = preciosFiltrados.find(p => p.cantidad === mayor)?.precioBase || 0
            const proporcion = (cantidad - menor) / (mayor - menor)
            return precioMenor + (precioMayor - precioMenor) * proporcion
        }
    }

    return 0
}

/**
 * Calcula el precio y guarda la cotización
 */
export async function calcularPrecioYGuardar(
    productoKey: string,
    cantidad: number | string,
    areaM2?: number,
    variante?: string,
    leadScoring: string = "tibio"
): Promise<PrecioCalculadoDB | null> {
    try {
        const productoDB = await getProductByKeyFromDB(productoKey)

        if (!productoDB) {
            console.warn("[db] Producto no encontrado en DB:", productoKey)
            return null
        }

        let base = 0
        let cantidadFinal = cantidad

        if (productoDB.tipo === "por_m2") {
            const area = areaM2 || 1
            base = (productoDB.precioPorM2 || 0) * area
            cantidadFinal = `${area} m²`
        } else {
            const cantidadNum = typeof cantidad === "string" ? parseInt(cantidad) : cantidad

            let precioDB = productoDB.precios.find(p =>
                p.cantidad === cantidadNum &&
                (variante ? p.variante === variante : !p.variante)
            )

            if (!precioDB) {
                base = interpolarPrecioDB(productoDB.precios as Array<{ cantidad: number; precioBase: number; variante: string | null }>, cantidadNum, variante)
            } else {
                base = precioDB.precioBase
            }
        }

        const baseComercial = redondeoPsicologico(base)
        const iva = roundToTwo(baseComercial * IVA_PERCENT)
        const total = roundToTwo(baseComercial + iva)

        let cotizacionId: string | undefined
        try {
            const cotizacion = await prisma.cotizacion.create({
                data: {
                    productId: productoDB.id,
                    cantidad: typeof cantidad === 'number' ? cantidad : parseInt(cantidad as string) || null,
                    areaM2: areaM2 || null,
                    base,
                    iva,
                    total,
                    leadScoring
                }
            })
            cotizacionId = cotizacion.id
        } catch (dbError) {
            console.error("[db] Error al guardar cotización:", dbError)
        }

        return {
            base: roundToTwo(base),
            iva,
            total,
            producto: {
                key: productoDB.key,
                nombre: productoDB.nombre,
                descripcion: productoDB.descripcion || undefined,
                tipo: productoDB.tipo as "cantidad_fija" | "por_m2",
                unidad: productoDB.unidad as "uds" | "m²",
                cantidadesDisponibles: productoDB.precios.map(p => p.cantidad)
            },
            cantidad: cantidadFinal,
            productId: productoDB.id,
            cotizacionId
        }
    } catch (error) {
        console.error("[db] Error en calcularPrecioYGuardar:", error)
        return null
    }
}

/**
 * Guarda un lead en la base de datos
 */
export async function guardarLead(datos: {
    cotizacionId?: string | null
    archivoNombre?: string | null
    archivoPath?: string | null
    archivoSize?: number | null
    archivoType?: string | null
    mensaje?: string | null
    leadScoring: string
}): Promise<{ success: boolean; leadId?: string; error?: string }> {
    try {
        const lead = await prisma.lead.create({
            data: {
                cotizacionId: datos.cotizacionId || null,
                archivoNombre: datos.archivoNombre || null,
                archivoPath: datos.archivoPath || null,
                archivoSize: datos.archivoSize || null,
                archivoType: datos.archivoType || null,
                mensaje: datos.mensaje || null,
                leadScoring: datos.leadScoring
            }
        })

        return { success: true, leadId: lead.id }
    } catch (error) {
        console.error("[db] Error al guardar lead:", error)
        return { success: false, error: String(error) }
    }
}

/**
 * Marca un lead como notificado
 */
export async function marcarLeadNotificado(leadId: string): Promise<boolean> {
    try {
        await prisma.lead.update({
            where: { id: leadId },
            data: {
                notificado: true,
                notificadoAt: new Date()
            }
        })
        return true
    } catch (error) {
        console.error("[db] Error al marcar lead como notificado:", error)
        return false
    }
}

/**
 * Obtiene cotizaciones recientes
 */
export async function getCotizacionesRecientes(limite: number = 10) {
    try {
        return await prisma.cotizacion.findMany({
            take: limite,
            orderBy: { createdAt: 'desc' },
            include: {
                product: true
            }
        })
    } catch (error) {
        console.error("[db] Error al obtener cotizaciones:", error)
        return []
    }
}

/**
 * Obtiene leads recientes
 */
export async function getLeadsRecientes(limite: number = 10) {
    try {
        return await prisma.lead.findMany({
            take: limite,
            orderBy: { createdAt: 'desc' },
            include: {
                cotizacion: {
                    include: { product: true }
                }
            }
        })
    } catch (error) {
        console.error("[db] Error al obtener leads:", error)
        return []
    }
}
