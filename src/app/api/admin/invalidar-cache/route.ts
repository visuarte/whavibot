/**
 * API Route: /api/admin/invalidar-cache
 * 
 * Invalida el caché de productos en memoria.
 * Útil cuando se actualizan productos en la base de datos.
 * 
 * Método: POST
 * Requiere: Autenticación NextAuth
 * 
 * Body: {
 *   target: "products" | "all" (opcional, default: "products")
 * }
 * 
 * Respuesta:
 * {
 *   success: boolean,
 *   message: string,
 *   invalidated: string
 * }
 */

import { NextRequest, NextResponse } from "next/server"
import { productCache, memoryCache } from "@/lib/cache"
import { z } from "zod"

const invalidateCacheSchema = z.object({
    target: z.enum(["products", "all"]).optional().default("products"),
})

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        // Validar
        const validation = invalidateCacheSchema.safeParse(body)
        if (!validation.success) {
            return NextResponse.json(
                { error: "Datos inválidos", details: validation.error.issues },
                { status: 400 }
            )
        }

        const { target } = validation.data

        if (target === "products") {
            productCache.invalidate()
            console.log("[CacheInvalidation] Caché de productos invalidado")
            return NextResponse.json({
                success: true,
                message: "Caché de productos invalidado",
                invalidated: "products"
            })
        } else if (target === "all") {
            memoryCache.clear()
            console.log("[CacheInvalidation] Todo el caché invalidado")
            return NextResponse.json({
                success: true,
                message: "Todo el caché ha sido invalidado",
                invalidated: "all"
            })
        }

        return NextResponse.json(
            { error: "Target no válido" },
            { status: 400 }
        )

    } catch (error) {
        console.error("[api/admin/invalidar-cache] Error:", error)
        return NextResponse.json(
            { error: "Error interno del servidor" },
            { status: 500 }
        )
    }
}
