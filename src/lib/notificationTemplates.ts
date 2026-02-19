/**
 * Tipos de notificación predefinidos para el flujo del bot
 * Este archivo no tiene "use server" para poder exportar objetos
 */

export const NotificationTemplates = {
    /**
     * Notificación cuando un lead sube un archivo para presupuesto personalizado
     */
    leadCaliente: (): string => {
        const fecha = new Date().toLocaleString("es-ES", {
            timeZone: "Europe/Madrid",
            dateStyle: "full",
            timeStyle: "short",
        })
        return `🔥 ¡NUEVO LEAD CALIENTE! \n\n📎 Archivo recibido\n🕐 Fecha: ${fecha}\n\n💡 Acción: Revisa el dashboard para ver los detalles y contactar al cliente.`
    },

    /**
     * Notificación cuando un lead cotiza un pack de precios
     */
    leadTibio: (producto: string, cantidad: number | string, total: string): string => {
        return `❄️ NUEVO LEAD TIBIO \n\n📦 Producto: ${producto}\n📊 Cantidad: ${cantidad} uds\n💰 Total: ${total}€\n\n💡 Acción: Considera hacer seguimiento pasivo.`
    },
}
