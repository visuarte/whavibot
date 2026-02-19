/**
 * API Route: /api/cotizar
 * 
 * Guarda una cotización en la base de datos y opcionalmente envía notificación WhatsApp.
 * 
 * Método: POST
 * Body: {
 *   productoKey: string,
 *   cantidad: number,
 *   areaM2?: number,
 *   variante?: string,
 *   leadScoring?: "tibio" | "caliente"
 * }
 */

import { NextRequest, NextResponse } from "next/server"
import { calcularPrecioYGuardar } from "@/lib/db"
import { sendWhatsAppNotification, NotificationTemplates } from "@/lib/sendWhatsAppNotification"
import { checkRateLimit, getClientIp } from "@/lib/rateLimiter"
import { z } from "zod"

// Schema de validación Zod
const cotizacionSchema = z.object({
    productoKey: z.string().min(1, "Producto requerido"),
    cantidad: z.union([z.number().positive(), z.string().transform(Number)]),
    areaM2: z.number().positive().optional(),
    variante: z.string().optional(),
    leadScoring: z.enum(["tibio", "caliente", "frio"]).optional(),
})

export async function POST(request: NextRequest) {
    try {
        // Rate limiting
        const clientIp = getClientIp(request)
        await checkRateLimit(clientIp)

        const body = await request.json()

        // Validar con Zod
        const validation = cotizacionSchema.safeParse(body)
        if (!validation.success) {
            return NextResponse.json(
                { error: "Datos inválidos", details: validation.error.issues },
                { status: 400 }
            )
        }

        const { productoKey, cantidad, areaM2, variante, leadScoring = "tibio" } = validation.data

        // Calcular precio y guardar en DB
        const resultado = await calcularPrecioYGuardar(
            productoKey,
            cantidad,
            areaM2,
            variante,
            leadScoring
        )

        if (!resultado) {
            return NextResponse.json(
                { error: "Error al calcular precio o guardar cotización" },
                { status: 500 }
            )
        }

        // Enviar notificación WhatsApp (no bloqueante)
        const mensaje = leadScoring === "caliente"
            ? `🔥 LEAD CALIENTE!\n\n📦 ${resultado.producto.nombre}\n📊 Cantidad: ${resultado.cantidad}\n💰 Total: ${resultado.total.toFixed(2)}€`
            : NotificationTemplates.leadTibio(
                resultado.producto.nombre,
                resultado.cantidad,
                resultado.total.toFixed(2)
            )

        // Enviar notificación sin esperar (fire and forget)
        sendWhatsAppNotification({ message: mensaje })

        return NextResponse.json({
            success: true,
            data: {
                cotizacionId: resultado.cotizacionId,
                producto: resultado.producto.nombre,
                cantidad: resultado.cantidad,
                base: resultado.base,
                iva: resultado.iva,
                total: resultado.total,
                leadScoring
            }
        })

    } catch (error) {
        console.error("[api/cotizar] Error:", error)
        return NextResponse.json(
            { error: "Error interno del servidor" },
            { status: 500 }
        )
    }
}
