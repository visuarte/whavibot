/**
 * API Route: /api/cotizaciones
 * 
 * Obtiene las cotizaciones recientes para el dashboard admin.
 * 
 * Método: GET
 */

import { NextResponse } from "next/server"
import { getCotizacionesRecientes } from "@/lib/db"

export async function GET() {
    try {
        const cotizaciones = await getCotizacionesRecientes(20)

        return NextResponse.json({
            cotizaciones
        })
    } catch (error) {
        console.error("[api/cotizaciones] Error:", error)
        return NextResponse.json(
            { error: "Error al obtener cotizaciones" },
            { status: 500 }
        )
    }
}
