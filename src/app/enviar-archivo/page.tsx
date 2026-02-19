"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileUploadForm } from "@/components/FileUploadForm"
import { ArrowLeft, Upload, Printer, FileText, Image, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function EnviarArchivoPage() {
    const handleFileUpload = (file: File, message?: string) => {
        console.log("Archivo recibido en /enviar-archivo:", {
            name: file.name,
            size: file.size,
            type: file.type,
            message: message,
            timestamp: new Date().toISOString()
        })
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="border-b">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center gap-3">
                        <Link href="/" className="hover:opacity-80 transition-opacity">
                            <div className="p-2 bg-primary rounded-lg">
                                <Printer className="h-6 w-6 text-primary-foreground" />
                            </div>
                        </Link>
                        <h1 className="text-xl font-bold">Visuarte Print Shop</h1>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <div className="max-w-3xl mx-auto space-y-6">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-sm">
                        <Link href="/" className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
                            <ArrowLeft className="h-4 w-4" />
                            Volver
                        </Link>
                    </div>

                    {/* Título */}
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold flex items-center gap-3">
                            <Upload className="h-8 w-8" />
                            Enviar Archivo
                        </h2>
                        <p className="text-muted-foreground">
                            Sube tu diseño y te enviaremos un presupuesto personalizado
                        </p>
                    </div>

                    {/* Formulario de subida */}
                    <div className="flex justify-center">
                        <FileUploadForm
                            onFileUpload={handleFileUpload}
                        />
                    </div>

                    {/* Información adicional */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <CheckCircle className="h-5 w-5 text-green-600" />
                                ¿Qué pasa después de subir mi archivo?
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                                <li>Recibiremos tu archivo y lo revisaremos</li>
                                <li>Nuestro equipo analysará las especificaciones técnicas</li>
                                <li>Te enviaremos un presupuesto personalizado por WhatsApp</li>
                                <li>Puedes aceptar el presupuesto o solicitar modificaciones</li>
                            </ol>
                        </CardContent>
                    </Card>

                    {/* Formatos aceptados */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Formatos aceptados</CardTitle>
                            <CardDescription>
                                Recomendamos los siguientes formatos para garantizar la mejor calidad de impresión
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 sm:grid-cols-3">
                                <div className="flex flex-col items-center p-4 bg-muted/50 rounded-lg">
                                    <FileText className="h-8 w-8 mb-2 text-red-500" />
                                    <span className="font-medium">PDF</span>
                                    <span className="text-xs text-muted-foreground">Preferido</span>
                                </div>
                                <div className="flex flex-col items-center p-4 bg-muted/50 rounded-lg">
                                    <Image className="h-8 w-8 mb-2 text-blue-500" />
                                    <span className="font-medium">JPG</span>
                                    <span className="text-xs text-muted-foreground">Alta resolución</span>
                                </div>
                                <div className="flex flex-col items-center p-4 bg-muted/50 rounded-lg">
                                    <span className="text-2xl font-bold text-orange-500 mb-1">AI</span>
                                    <span className="font-medium">Illustrator</span>
                                    <span className="text-xs text-muted-foreground">Editable</span>
                                </div>
                            </div>

                            <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                                <p className="text-sm text-amber-800">
                                    <strong>Consejo:</strong> Para el formato PDF, asegúrate de que las fuentes estén
                                    convertidas a curvas y que las imágenes tengan una resolución mínima de 300 dpi.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Enlaces útiles */}
                    <div className="flex gap-4">
                        <Link href="/cotizar" className="flex-1">
                            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                                <CardContent className="flex items-center gap-3 p-4">
                                    <div className="p-2 bg-primary/10 rounded-lg">
                                        <span className="text-xl">🧮</span>
                                    </div>
                                    <div>
                                        <span className="font-medium">Ver precios fijos</span>
                                        <p className="text-xs text-muted-foreground">
                                            Calcula tu presupuesto online
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t mt-auto">
                <div className="container mx-auto px-4 py-4">
                    <p className="text-center text-sm text-muted-foreground">
                        © 2026 Visuarte Print Shop - Enviar archivo
                    </p>
                </div>
            </footer>
        </div>
    )
}
