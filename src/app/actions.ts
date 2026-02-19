"use server"

/**
 * Server Action para enviar notificaciones de WhatsApp
 * 
 * Mantiene la API key de CallMeBot segura en el servidor
 */

interface SendWhatsAppParams {
    message: string
}

/**
 * Envía una notificación de WhatsApp desde el servidor
 * 
 * @param params - Objeto con el mensaje a enviar
 * @returns Promise<void>
 */
export async function sendWhatsAppNotification({ message }: SendWhatsAppParams): Promise<void> {
    try {
        console.log("[WhatsApp Server Action] 📤 Enviando mensaje:", message)

        // Obtener variables de entorno del servidor
        const phoneNumber = process.env.WHATSAPP_PHONE
        const apiKey = process.env.CALLMEBOT_APIKEY

        if (!phoneNumber || !apiKey) {
            console.error("[WhatsApp Server Action] Variables de entorno no configuradas")
            return
        }

        // Codificar el mensaje para URL
        const encodedMessage = encodeURIComponent(message)

        // Construir URL de la API
        const url = `https://api.callmebot.com/whatsapp.php?phone=${phoneNumber}&text=${encodedMessage}&apikey=${apiKey}`

        // Realizar la petición GET
        const response = await fetch(url, {
            method: "GET",
        })

        const responseText = await response.text()

        // Verificar la respuesta
        const isSuccess = responseText.toLowerCase().includes("queued") ||
            responseText.toLowerCase().includes("ok") ||
            response.ok

        if (isSuccess) {
            console.log("[WhatsApp Server Action] ✓ Mensaje enviado correctamente")
        } else {
            console.log("[WhatsApp Server Action] ℹ️ Respuesta API:", responseText)
        }

    } catch (error) {
        console.error("[WhatsApp Server Action] ✗ Error:", error instanceof Error ? error.message : "Error desconocido")
    }
}


