/**
 * Cliente singleton de Prisma para Visuarte Print Shop
 * 
 * Este módulo proporciona una instancia única de PrismaClient
 * que se reutiliza en toda la aplicación para evitar 
 * crear múltiples conexiones a la base de datos.
 * 
 * Para desarrollo local (SQLite):
 * - DATABASE_URL="file:prisma/dev.db"
 * 
 * Para producción (PostgreSQL):
 * - DATABASE_URL="postgresql://user:pass@host:5432/db?sslmode=require"
 * 
 * @example
 * import { prisma } from '@/lib/prisma'
 * 
 * // Obtener productos
 * const products = await prisma.product.findMany()
 */

import { PrismaClient } from "@prisma/client"

// Variable global para almacenar la instancia de Prisma en desarrollo
// Esto evita que se cree una nueva instancia en cada hot-reload
const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

// Crear cliente de Prisma
// En producción, se usa una nueva instancia
// En desarrollo, se reutiliza la instancia global
let prismaInstance: PrismaClient

if (process.env.NODE_ENV === "production") {
    prismaInstance = new PrismaClient()
} else {
    if (!globalForPrisma.prisma) {
        globalForPrisma.prisma = new PrismaClient({
            log: ["query", "error", "warn"],
        })
    }
    prismaInstance = globalForPrisma.prisma
}

export const prisma = prismaInstance

/**
 * Tipos derivados de PrismaClient para mejor tipado
 */
export type { Product, ProductPrice, Cotizacion, Lead } from "@prisma/client"
