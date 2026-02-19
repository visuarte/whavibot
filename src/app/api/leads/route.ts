/**
 * API Route: /api/leads
 * 
 * Maneja:
 * - POST: Guardar un lead (archivo subido para presupuesto)
 * - GET: Obtener leads recientes para admin
 * 
 * Para POST con FormData, el archivo se sube a Vercel Blob.
 */

import { NextRequest, NextResponse } from "next/server"
import { guardarLead, marcarLeadNotificado, getLeadsRecientes } from "@/lib/db"
import { sendWhatsAppNotification, NotificationTemplates } from "@/lib/sendWhatsAppNotification"
import { put } from "@vercel/blob"
import { checkRateLimit, getClientIp } from "@/lib/rateLimiter"
import { z } from "zod"

// Schema de validación Zod para JSON
const leadSchema = z.object({
    cotizacionId: z.string().optional(),
    archivo: z.object({
        nombre: z.string(),
        path: z.string().optional(),
        size: z.number().optional(),
        type: z.string().optional(),
    }).optional(),
    mensaje: z.string().max(500).optional(),
    leadScoring: z.enum(["tibio", "caliente", "frio"]).optional(),
})

// GET: Obtener leads recientes - también con rate limit
export async function GET(request: NextRequest) {
    try {
        // Rate limiting
        const clientIp = getClientIp(request)
        await checkRateLimit(clientIp)

        const leads = await getLeadsRecientes(10)

        return NextResponse.json({
            leads
        })
    } catch (error) {
        console.error("[api/leads] Error GET:", error)
        return NextResponse.json(
            { error: "Error al obtener leads" },
            { status: 500 }
        )
    }
}

// POST: Guardar nuevo lead
export async function POST(request: NextRequest) {
    try {
        // Rate limiting
        const clientIp = getClientIp(request)
        await checkRateLimit(clientIp)

        const contentType = request.headers.get("content-type") || ""

        let cotizacionId: string | null = null
        let archivoNombre: string | null = null
        let archivoPath: string | null = null
        let mensaje: string | null = null
        let leadScoring = "caliente"

        // Verificar si es FormData (subida de archivo real)
        if (contentType.includes("multipart/form-data")) {
            const formData = await request.formData()

            // Extraer datos del formData
            const archivo = formData.get("archivo") as File | null
            cotizacionId = formData.get("cotizacionId") as string | null
            mensaje = formData.get("mensaje") as string | null
            leadScoring = (formData.get("leadScoring") as string) || "caliente"

            if (!archivo) {
                return NextResponse.json(
                    { error: "Falta el archivo" },
                    { status: 400 }
                )
            }

            archivoNombre = archivo.name

            // Subir archivo a Vercel Blob
            try {
                const arrayBuffer = await archivo.arrayBuffer()
                const buffer = Buffer.from(arrayBuffer)

                const blob = await put(`leads/${Date.now()}-${archivo.name}`, buffer, {
                    access: 'public',
                    contentType: archivo.type
                })

                archivoPath = blob.url
                console.log("[api/leads] Archivo subido a Vercel Blob:", archivoPath)
            } catch (blobError) {
                console.error("[api/leads] Error al subir a Vercel Blob:", blobError)
                archivoPath = null
            }
        } else {
            // JSON tradicional
            const body = await request.json()

            const { cotizacionId: cId, archivo, mensaje: msg, leadScoring: ls } = body

            cotizacionId = cId || null
            mensaje = msg || null
            leadScoring = ls || "caliente"

            if (archivo) {
                archivoNombre = archivo.nombre || null
                archivoPath = archivo.path || null
            }
        }

        // Validar datos requeridos
        if (!archivoNombre) {
            return NextResponse.json(
                { error: "Falta el archivo (nombre requerido)" },
                { status: 400 }
            )
        }

        // Guardar lead en DB
        const resultado = await guardarLead({
            cotizacionId,
            archivoNombre,
            archivoPath,
            mensaje,
            leadScoring
        })

        if (!resultado.success) {
            return NextResponse.json(
                { error: "Error al guardar lead: " + resultado.error },
                { status: 500 }
            )
        }

        // Enviar notificación WhatsApp para lead caliente
        if (leadScoring === "caliente") {
            const mensajeWhatsApp = NotificationTemplates.leadCaliente()
            sendWhatsAppNotification({ message: mensajeWhatsApp })

            // Marcar como notificado
            await marcarLeadNotificado(resultado.leadId!)
        }

        return NextResponse.json({
            success: true,
            data: {
                leadId: resultado.leadId,
                leadScoring,
                notificado: leadScoring === "caliente",
                archivoUrl: archivoPath
            }
        })

    } catch (error) {
        console.error("[api/leads] Error POST:", error)
        return NextResponse.json(
            { error: "Error interno del servidor" },
            { status: 500 }
        )
    }
}
