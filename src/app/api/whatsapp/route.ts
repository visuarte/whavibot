import { NextResponse } from "next/server"

/**
 * Endpoint API para enviar notificaciones de WhatsApp
 * 
 * POST /api/whatsapp
 * Body: { message: string }
 */
export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { message } = body

        if (!message) {
            return NextResponse.json(
                { error: "Se requiere un mensaje" },
                { status: 400 }
            )
        }

        // Obtener variables de entorno del servidor
        const phoneNumber = process.env.WHATSAPP_PHONE
        const apiKey = process.env.CALLMEBOT_APIKEY

        if (!phoneNumber || !apiKey) {
            console.error("[WhatsApp API] Variables de entorno no configuradas")
            return NextResponse.json(
                { error: "Configuración de WhatsApp incompleta" },
                { status: 500 }
            )
        }

        // Codificar el mensaje para URL
        const encodedMessage = encodeURIComponent(message)

        // Construir URL de la API
        const url = `https://api.callmebot.com/whatsapp.php?phone=${phoneNumber}&text=${encodedMessage}&apikey=${apiKey}`

        console.log("[WhatsApp API] Enviando mensaje:", message)

        // Realizar la petición GET
        const response = await fetch(url, {
            method: "GET",
        })

        const responseText = await response.text()

        // Verificar la respuesta - puede contener "queued" o "ok"
        const isSuccess = responseText.toLowerCase().includes("queued") ||
            responseText.toLowerCase().includes("ok") ||
            response.ok

        if (isSuccess) {
            console.log("[WhatsApp API] ✓ Mensaje enviado correctamente")
            return NextResponse.json({ success: true, message: "Notificación enviada" })
        } else {
            console.log("[WhatsApp API] ℹ️ Respuesta API:", responseText)
            return NextResponse.json(
                { success: false, error: "Error al enviar mensaje" },
                { status: 500 }
            )
        }

    } catch (error) {
        console.error("[WhatsApp API] ✗ Error:", error)
        return NextResponse.json(
            { error: "Error interno del servidor" },
            { status: 500 }
        )
    }
}
