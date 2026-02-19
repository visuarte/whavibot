/**
 * Utilidad para enviar notificaciones de WhatsApp via CallMeBot API
 * 
 * Documentación: https://api.callmebot.com/whatsapp.php
 * 
 * Ahora usa Server Actions para mantener la API key segura en el servidor.
 * Importa sendWhatsAppNotification desde @/app/actions
 */

import { sendWhatsAppNotification as sendWhatsAppServerAction } from "@/app/actions"
import { NotificationTemplates } from "./notificationTemplates"

interface SendWhatsAppParams {
    message: string
}

/**
 * Envía una notificación de WhatsApp usando Server Action
 * 
 * @param params - Objeto con el mensaje a enviar
 * @returns Promise<void> - No bloquea el flujo principal
 * 
 * @example
 * // Uso básico
 * sendWhatsAppNotification({ message: "¡Hola desde Visuarte!" });
 * 
 * @example
 * // Con información de lead
 * sendWhatsAppNotification({ 
 *   message: "Nuevo lead tibio: cotizó Flyers A5 500 uds → 217.80€" 
 * });
 */
export async function sendWhatsAppNotification({ message }: SendWhatsAppParams): Promise<void> {
    // Usar server action - mantiene la API key segura en el servidor
    await sendWhatsAppServerAction({ message })
}

// Re-exportar NotificationTemplates desde actions
export { NotificationTemplates }
