/**
 * Database utilities using Prisma for Neon PostgreSQL
 * Optimizado para Vercel Serverless
 */

import { PrismaClient } from '@prisma/client'

// Prisma singleton para evitar múltiples conexiones en desarrollo
const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

/**
 * Obtiene todos los productos de la base de datos
 */
export async function getProductsFromDB() {
    const products = await prisma.product.findMany({
        orderBy: [
            { category: 'asc' },
            { nombre: 'asc' }
        ],
        include: {
            prices: {
                orderBy: { cantidad: 'asc' }
            }
        }
    })

    return products
}

/**
 * Obtiene un producto por su key
 */
export async function getProductByKeyDB(key: string) {
    const product = await prisma.product.findUnique({
        where: { key },
        include: {
            prices: {
                orderBy: { cantidad: 'asc' }
            }
        }
    })

    return product
}

/**
 * Obtiene todas las cotizaciones
 */
export async function getCotizaciones() {
    return await prisma.cotizacion.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
            product: {
                select: { nombre: true, key: true }
            }
        }
    })
}

/**
 * Obtiene todos los leads
 */
export async function getLeads() {
    return await prisma.lead.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
            cotizacion: {
                include: {
                    product: {
                        select: { nombre: true, key: true }
                    }
                }
            }
        }
    })
}

/**
 * Crea una nueva cotización
 */
export async function createCotizacion(data: {
    productId: string
    cantidad?: number | null
    areaM2?: number | null
    base: number
    iva: number
    total: number
    leadScoring: string
    optionId?: string | null
}) {
    return await prisma.cotizacion.create({
        data: {
            productId: data.productId,
            cantidad: data.cantidad,
            areaM2: data.areaM2,
            base: data.base,
            iva: data.iva,
            total: data.total,
            leadScoring: data.leadScoring,
            optionId: data.optionId
        }
    })
}

/**
 * Crea un nuevo lead
 */
export async function createLead(data: {
    cotizacionId?: string | null
    archivoNombre?: string | null
    archivoPath?: string | null
    mensaje?: string | null
    leadScoring: string
}) {
    return await prisma.lead.create({
        data: {
            cotizacionId: data.cotizacionId,
            archivoNombre: data.archivoNombre,
            archivoPath: data.archivoPath,
            mensaje: data.mensaje,
            leadScoring: data.leadScoring
        }
    })
}

/**
 * Marca un lead como notificado
 */
export async function markLeadAsNotified(id: string) {
    return await prisma.lead.update({
        where: { id },
        data: {
            notificado: true,
            notificadoAt: new Date()
        }
    })
}

/**
 * Obtiene productos del catálogo (para cotizar)
 */
export async function getProductCatalog() {
    const products = await prisma.product.findMany({
        orderBy: [
            { nombre: 'asc' }
        ],
        include: {
            prices: {
                orderBy: { cantidad: 'asc' }
            }
        }
    })
    return products
}

/**
 * Calcula el precio y guarda la cotización + lead
 */
export async function calcularPrecioYGuardar(
    productoKey: string,
    cantidad: number,
    areaM2?: number,
    variante?: string,
    leadScoring: string = 'tibio'
) {
    // 1. Obtener producto
    const producto = await prisma.product.findUnique({
        where: { key: productoKey },
        include: { prices: { orderBy: { cantidad: 'asc' } } }
    })

    if (!producto) {
        throw new Error(`Producto no encontrado: ${productoKey}`)
    }

    // 2. Calcular precio
    let precioBase = 0

    if (producto.tipo === 'cantidad_fija' && producto.prices && producto.prices.length > 0) {
        // Buscar precio por cantidad
        const precioObj = producto.prices.find(p => p.cantidad === cantidad)
        if (precioObj) {
            precioBase = parseFloat(precioObj.precioBase.toString())
        } else {
            // Usar el precio más cercano superior
            const preciosOrdenados = [...producto.prices].sort((a, b) => a.cantidad - b.cantidad)
            const precioMayor = preciosOrdenados.find(p => p.cantidad >= cantidad)
            precioBase = precioMayor ? parseFloat(precioMayor.precioBase.toString()) : parseFloat(preciosOrdenados[0].precioBase.toString())
        }
    } else if (producto.tipo === 'por_m2' && producto.precioPorM2) {
        // Precio por metro cuadrado
        const area = areaM2 || 1
        precioBase = parseFloat(producto.precioPorM2.toString()) * area
    }

    // 3. Calcular IVA (21%) y total
    const iva = precioBase * 0.21
    const total = precioBase + iva

    // 4. Guardar cotización
    const cotizacion = await prisma.cotizacion.create({
        data: {
            productId: producto.id,
            cantidad: producto.tipo === 'cantidad_fija' ? cantidad : null,
            areaM2: producto.tipo === 'por_m2' ? (areaM2 || 1) : null,
            base: precioBase,
            iva: iva,
            total: total,
            leadScoring: leadScoring,
            optionId: variante || null
        }
    })

    // 5. Guardar lead
    const lead = await prisma.lead.create({
        data: {
            cotizacionId: cotizacion.id,
            leadScoring: leadScoring
        }
    })

    return {
        cotizacionId: cotizacion.id,
        producto: {
            nombre: producto.nombre,
            key: producto.key
        },
        cantidad,
        areaM2,
        variante,
        base: precioBase,
        iva,
        total,
        leadScoring,
        leadId: lead.id
    }
}

/**
 * Aliases for backward compatibility
 */
export const getCotizacionesRecientes = async (limit: number = 20) => {
    return await prisma.cotizacion.findMany({
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
            product: {
                select: { nombre: true, key: true }
            }
        }
    })
}

export const getLeadsRecientes = async (limit: number = 10) => {
    return await prisma.lead.findMany({
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
            cotizacion: {
                include: {
                    product: {
                        select: { nombre: true, key: true }
                    }
                }
            }
        }
    })
}

export const guardarLead = async (data: {
    cotizacionId?: string | null
    archivoNombre?: string | null
    archivoPath?: string | null
    mensaje?: string | null
    leadScoring: string
}) => {
    try {
        const lead = await prisma.lead.create({
            data: {
                cotizacionId: data.cotizacionId || null,
                archivoNombre: data.archivoNombre || null,
                archivoPath: data.archivoPath || null,
                mensaje: data.mensaje || null,
                leadScoring: data.leadScoring
            }
        })
        return { success: true, leadId: lead.id }
    } catch (error) {
        console.error("Error guardando lead:", error)
        return { success: false, error: String(error) }
    }
}

export const marcarLeadNotificado = async (leadId: string) => {
    return await prisma.lead.update({
        where: { id: leadId },
        data: {
            notificado: true,
            notificadoAt: new Date()
        }
    })
}
