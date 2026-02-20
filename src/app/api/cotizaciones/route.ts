/**
 * API Route: /api/cotizaciones
 * 
 * Obtiene las cotizaciones recientes para el dashboard admin.
 * Retorna información completa de cotizaciones con datos de productos.
 * 
 * Método: GET
 * Parámetros de query: ninguno (retorna últimas cotizaciones)
 * 
 * Respuesta exitosa (200):
 * {
 *   cotizaciones: Array<{
 *     id: string,
 *     productoKey: string,
 *     producto?: { nombre: string, categoria: string },
 *     cantidad: number,
 *     areaM2?: number,
 *     variante?: string,
 *     precioBase: number,
 *     iva: number,
 *     total: number,
 *     leadScoring: "tibio" | "caliente" | "frio",
 *     createdAt: string (ISO date)
 *   }>
 * }
 * 
 * Códigos de error:
 * - 500: Error al obtener cotizaciones de la base de datos
 */

import { NextResponse } from "next/server"
import { getCotizaciones } from "@/lib/db"

export async function GET() {
    try {
        const cotizaciones = await getCotizaciones()

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
