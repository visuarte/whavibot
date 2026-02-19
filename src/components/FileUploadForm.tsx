"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload, File, CheckCircle, AlertCircle } from "lucide-react"
import { sendWhatsAppNotification, NotificationTemplates } from "@/lib/sendWhatsAppNotification"

interface FileUploadFormProps {
    onFileUpload?: (file: File, message?: string) => void
}

interface FormData {
    file: FileList
    message: string
}

export function FileUploadForm({ onFileUpload }: FileUploadFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitSuccess, setSubmitSuccess] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>()

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true)
        setError(null)
        setSubmitSuccess(false)

        try {
            const file = data.file?.[0]

            if (!file) {
                setError("Por favor selecciona un archivo")
                setIsSubmitting(false)
                return
            }

            // Validar tipo de archivo
            const allowedTypes = ["application/pdf", "image/jpeg", "image/jpg", "application/illustrator"]
            const allowedExtensions = [".pdf", ".jpg", ".jpeg", ".ai"]

            const fileExtension = file.name.toLowerCase().slice(file.name.lastIndexOf("."))

            if (!allowedTypes.includes(file.type) && !allowedExtensions.includes(fileExtension)) {
                setError("Solo se permiten archivos PDF, JPG o AI")
                setIsSubmitting(false)
                return
            }

            // Simular procesamiento
            await new Promise((resolve) => setTimeout(resolve, 1500))

            // Log del lead como "caliente" porque está subiendo archivo
            console.log("lead_caliente")
            console.log("Archivo recibido:", {
                name: file.name,
                size: file.size,
                type: file.type,
                timestamp: new Date().toISOString()
            })

            // ===== ENVÍO DE NOTIFICACIÓN WHATSAPP (BACKGROUND) =====
            // Enviar notificación sin bloquear el flujo
            const mensajeWhatsApp = NotificationTemplates.leadCaliente()
            sendWhatsAppNotification({ message: mensajeWhatsApp })
            // =========================================================

            // Callback opcional
            if (onFileUpload) {
                onFileUpload(file, data.message)
            }

            setSubmitSuccess(true)
            reset()

        } catch (err) {
            setError("Ha ocurrido un error al procesar el archivo")
            console.error("Error:", err)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                        <Upload className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <CardTitle>Enviar archivo para presupuesto</CardTitle>
                        <CardDescription>
                            Sube tu diseño para una cotización personalizada
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="file">Archivo (PDF/JPG/AI)</Label>
                        <Input
                            id="file"
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.ai"
                            {...register("file", {
                                required: "Selecciona un archivo",
                            })}
                            className="cursor-pointer"
                        />
                        {errors.file && (
                            <p className="text-sm text-destructive">{errors.file.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="message">Mensaje adicional (opcional)</Label>
                        <Textarea
                            id="message"
                            placeholder="Cuéntanos más sobre tu proyecto..."
                            {...register("message")}
                            rows={3}
                        />
                    </div>

                    {error && (
                        <div className="flex items-center gap-2 p-3 bg-destructive/10 text-destructive rounded-lg">
                            <AlertCircle className="h-4 w-4" />
                            <span className="text-sm">{error}</span>
                        </div>
                    )}

                    {submitSuccess && (
                        <div className="flex items-center gap-2 p-3 bg-green-500/10 text-green-600 rounded-lg">
                            <CheckCircle className="h-4 w-4" />
                            <span className="text-sm">
                                ¡Archivo recibido! Te pasaremos cotización personalizada pronto.
                            </span>
                        </div>
                    )}
                </form>
            </CardContent>
            <CardFooter>
                <Button
                    className="w-full"
                    onClick={handleSubmit(onSubmit)}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <>
                            <span className="animate-spin mr-2">⏳</span>
                            Enviando...
                        </>
                    ) : (
                        <>
                            <Upload className="mr-2 h-4 w-4" />
                            Enviar archivo
                        </>
                    )}
                </Button>
            </CardFooter>
        </Card>
    )
}
