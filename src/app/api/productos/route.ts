/**
 * API Route: /api/productos
 * 
 * Obtiene la lista de productos para la calculadora de precios.
 * Incluye información de precios por cantidad, variantes y categorización.
 * 
 * Método: GET
 * Parámetros: ninguno
 * 
 * Respuesta exitosa (200):
 * {
 *   products: Array<{
 *     id: string,
 *     key: string,
 *     nombre: string,
 *     descripcion: string,
 *     imagen?: string,
 *     tipo: "cantidad_fija" | "por_m2",
 *     unidad: "uds" | "m²",
 *     category: string,
 *     precioPorM2?: number,
 *     prices: Array<{
 *       cantidad: number,
 *       precioBase: number,
 *       variante?: string
 *     }>
 *   }>
 * }
 * 
 * Códigos de error:
 * - 500: Error al obtener productos de la base de datos
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
