import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

/**
 * Middleware de protección para Next.js
 * 
 * Protege rutas sensibles:
 * - /admin → requiere sesión autenticada
 * - /api/admin/* → requiere sesión autenticada
 * 
 * Rutas públicas:
 * - /api/auth/* → autenticación
 * - /api/cotizar → cotizaciones públicas
 * - /api/leads → leads públicos (para submit)
 * - /api/whatsapp → notificaciones públicas
 */
export default auth((req) => {
    const isLoggedIn = !!req.auth
    const isOnAdmin = req.nextUrl.pathname.startsWith("/admin")
    const isOnAdminApi = req.nextUrl.pathname.startsWith("/api/admin")

    // Redirigir a login si intenta acceder a /admin sin sesión
    if (isOnAdmin && !isLoggedIn) {
        const loginUrl = new URL("/login", req.nextUrl.origin)
        loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname)
        return NextResponse.redirect(loginUrl)
    }

    // Bloquear API admin si no está autenticado
    if (isOnAdminApi && !isLoggedIn) {
        return NextResponse.json(
            { error: "No autorizado" },
            { status: 401 }
        )
    }

    return NextResponse.next()
})

// Configurar qué rutas verifica el middleware
export const config = {
    matcher: [
        "/admin/:path*",
        "/api/admin/:path*",
    ],
}
