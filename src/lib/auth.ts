import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

/**
 * Tipos extendidos para NextAuth
 */
declare module "next-auth" {
    interface User {
        role?: string
    }
    interface Session {
        user: {
            id?: string
            name?: string | null
            email?: string | null
            image?: string | null
            role?: string
        }
    }
}

/**
 * Configuración de NextAuth.js v5 para Visuarte Print Shop
 * 
 * Usa Credentials provider con password simple
 * En producción, considera usar Google OAuth o Clerk
 */

// Credenciales hardcodeadas del admin (en producción, usar DB)
const ADMIN_CREDENTIALS = {
    email: "visuarte.creativos@gmail.com",
    password: "malboro2026", // En producción, usar hash bcrypt
    name: "Administrador Visuarte"
}

export const { handlers, auth, signIn, signOut } = NextAuth({
    // Secret para firmar los tokens JWT - REQUERIDO para producción
    secret: process.env.NEXTAUTH_SECRET,
    // Trust host es necesario para Vercel y otros proxies
    trustHost: true,
    pages: {
        signIn: "/login", // Página de login personalizada
    },
    providers: [
        Credentials({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null
                }

                const { email, password } = credentials

                // Verificar credenciales
                if (
                    email === ADMIN_CREDENTIALS.email &&
                    password === ADMIN_CREDENTIALS.password
                ) {
                    // Retornar usuario válido
                    return {
                        id: "1",
                        email: ADMIN_CREDENTIALS.email,
                        name: ADMIN_CREDENTIALS.name,
                        role: "admin"
                    }
                }

                return null
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role
            }
            return token
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.role = token.role as string | undefined
            }
            return session
        },
    },
    session: {
        strategy: "jwt",
        maxAge: 24 * 60 * 60, // 24 horas
    },
})
