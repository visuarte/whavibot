import { handlers } from "@/lib/auth"

/**
 * Route handler para NextAuth.js v5
 * 
 * Maneja todas las rutas de autenticación:
 * - POST /api/auth/signin
 * - POST /api/auth/signout
 * - GET /api/auth/session
 * - POST /api/auth/callback/credentials
 */
export const { GET, POST } = handlers
