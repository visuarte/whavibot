/**
 * API Route: /api/productos
 * 
 * Obtiene la lista de productos para la calculadora de precios.
 * 
 * Método: GET
 */

import { NextResponse } from "next/server"
import { getProductsFromDB } from "@/lib/db"

export async function GET() {
    try {
        const products = await getProductsFromDB()

        return NextResponse.json({
            products
        })
    } catch (error) {
        console.error("[api/productos] Error:", error)
        return NextResponse.json(
            { error: "Error al obtener productos" },
            { status: 500 }
        )
    }
}
