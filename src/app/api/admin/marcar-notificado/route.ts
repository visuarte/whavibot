/**
 * API Route: /api/admin/marcar-notificado
 * 
 * Marca un lead como notificado via WhatsApp.
 * 
 * Método: POST
 * Body: { leadId: string }
 */

import { NextRequest, NextResponse } from "next/server"
import { marcarLeadNotificado } from "@/lib/db"

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { leadId } = body

        if (!leadId) {
            return NextResponse.json(
                { error: "Falta el ID del lead" },
                { status: 400 }
            )
        }

        const success = await marcarLeadNotificado(leadId)

        if (!success) {
            return NextResponse.json(
                { error: "Error al marcar lead como notificado" },
                { status: 500 }
            )
        }

        return NextResponse.json({
            success: true,
            message: "Lead marcado como notificado"
        })

    } catch (error) {
        console.error("[api/admin/marcar-notificado] Error:", error)
        return NextResponse.json(
            { error: "Error interno del servidor" },
            { status: 500 }
        )
    }
}
