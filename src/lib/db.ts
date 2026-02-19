// Database utilities using postgres library for Neon
import postgres from 'postgres'
import * as dotenv from 'dotenv'

// Cargar variables de entorno
dotenv.config({ path: ".env" })

// Create a singleton connection
function getSql() {
    return postgres(process.env.DATABASE_URL!, { ssl: 'require' })
}

let _sql: ReturnType<typeof getSql> | null = null

function sql() {
    if (!_sql) {
        _sql = getSql()
    }
    return _sql
}

/**
 * Obtiene todos los productos de la base de datos
 */
export async function getProductsFromDB() {
    const result = await sql()`
        SELECT id, key, nombre, descripcion, tipo, "precioPorM2", unidad, category, material, "sizeOptions", "createdAt", "updatedAt"
        FROM product
        ORDER BY category, nombre
    `

    // Get prices for each product
    const products = await Promise.all(
        result.map(async (p: any) => {
            const prices = await sql()`
                SELECT id, "productId", cantidad, "precioBase"
                FROM product_price
                WHERE "productId" = ${p.id}
                ORDER BY cantidad ASC
            `
            return { ...p, prices }
        })
    )

    return products
}

/**
 * Obtiene un producto por su key
 */
export async function getProductByKeyDB(key: string) {
    const result = await sql()`
        SELECT id, key, nombre, descripcion, tipo, "precioPorM2", unidad, category, material, "sizeOptions", "createdAt", "updatedAt"
        FROM product
        WHERE key = ${key}
    `

    if (result.length === 0) return null

    const product = result[0]

    const prices = await sql()`
        SELECT id, "productId", cantidad, "precioBase"
        FROM product_price
        WHERE "productId" = ${product.id}
        ORDER BY cantidad ASC
    `

    return { ...product, prices }
}

/**
 * Obtiene todas las cotizaciones
 */
export async function getCotizaciones() {
    return await sql()`
        SELECT c.*, p.nombre as "productName", p.key as "productKey"
        FROM cotizacion c
        LEFT JOIN product p ON c."productId" = p.id
        ORDER BY c."createdAt" DESC
    `
}

/**
 * Obtiene todos los leads
 */
export async function getLeads() {
    return await sql()`
        SELECT l.*, c.base, c.iva, c.total, c."leadScoring" as "cotizacionScoring", 
               p.nombre as "productName", p.key as "productKey"
        FROM lead l
        LEFT JOIN cotizacion c ON l."cotizacionId" = c.id
        LEFT JOIN product p ON c."productId" = p.id
        ORDER BY l."createdAt" DESC
    `
}

/**
 * Crea una nueva cotización
 */
export async function createCotizacion(data: {
    productId: string
    cantidad?: number
    areaM2?: number
    base: number
    iva: number
    total: number
    leadScoring: string
    optionId?: string
}) {
    const result = await sql()`
        INSERT INTO cotizacion ("productId", cantidad, "areaM2", base, iva, total, "leadScoring", "optionId")
        VALUES (${data.productId}, ${data.cantidad || null}, ${data.areaM2 || null}, ${data.base}, ${data.iva}, ${data.total}, ${data.leadScoring}, ${data.optionId || null})
        RETURNING *
    `
    return result[0]
}

/**
 * Crea un nuevo lead
 */
export async function createLead(data: {
    cotizacionId?: string
    archivoNombre?: string
    archivoPath?: string
    mensaje?: string
    leadScoring: string
}) {
    const result = await sql()`
        INSERT INTO lead ("cotizacionId", "archivoNombre", "archivoPath", mensaje, "leadScoring")
        VALUES (${data.cotizacionId || null}, ${data.archivoNombre || null}, ${data.archivoPath || null}, ${data.mensaje || null}, ${data.leadScoring})
        RETURNING *
    `
    return result[0]
}

/**
 * Marca un lead como notificado
 */
export async function markLeadAsNotified(id: string) {
    const result = await sql()`
        UPDATE lead 
        SET notificado = true, "notificadoAt" = NOW()
        WHERE id = ${id}
        RETURNING *
    `
    return result[0]
}

/**
 * Aliases for backward compatibility
 */
export const getCotizacionesRecientes = async (limit: number = 20) => {
    const result = await sql()`
        SELECT c.*, p.nombre as "productName", p.key as "productKey"
        FROM cotizacion c
        LEFT JOIN product p ON c."productId" = p.id
        ORDER BY c."createdAt" DESC
        LIMIT ${limit}
    `
    return result
}

export const getLeadsRecientes = async (limit: number = 10) => {
    return await sql()`
        SELECT l.*, c.base, c.iva, c.total, c."leadScoring" as "cotizacionScoring", 
               p.nombre as "productName", p.key as "productKey"
        FROM lead l
        LEFT JOIN cotizacion c ON l."cotizacionId" = c.id
        LEFT JOIN product p ON c."productId" = p.id
        ORDER BY l."createdAt" DESC
        LIMIT ${limit}
    `
}

export const guardarLead = async (data: {
    cotizacionId?: string | null
    archivoNombre?: string | null
    archivoPath?: string | null
    archivoSize?: number | null
    archivoType?: string | null
    mensaje?: string | null
    leadScoring: string
}) => {
    try {
        const result = await sql()`
            INSERT INTO lead ("cotizacionId", "archivoNombre", "archivoPath", "archivoSize", "archivoType", mensaje, "leadScoring")
            VALUES (${data.cotizacionId || null}, ${data.archivoNombre || null}, ${data.archivoPath || null}, ${data.archivoSize || null}, ${data.archivoType || null}, ${data.mensaje || null}, ${data.leadScoring})
            RETURNING *
        `
        return { success: true, leadId: result[0]?.id }
    } catch (error) {
        console.error("Error guardando lead:", error)
        return { success: false, error: String(error) }
    }
}

export const marcarLeadNotificado = async (leadId: string) => {
    await sql()`
        UPDATE lead SET notificado = true, "notificadoAt" = NOW() WHERE id = ${leadId}
    `
}
