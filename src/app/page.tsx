"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageSquare, Calculator, Upload, Printer, CreditCard, ArrowRight, FileText } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg">
              <Printer className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold">Visuarte Print Shop</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Saludo */}
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-4 bg-primary/20 rounded-full w-fit">
                <MessageSquare className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl md:text-3xl">
                ¡Hola! Bienvenido a Visuarte Print Shop
              </CardTitle>
              <CardDescription className="text-base">
                Tu tienda online de impresión digital
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Menú de opciones */}
          <div className="grid gap-4 md:grid-cols-2">
            <Link href="/cotizar" className="block">
              <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-primary/50 group h-full">
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <Calculator className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">Ver packs y cotizar</h3>
                    <p className="text-sm text-muted-foreground">
                      Precios fijos con IVA incluido
                    </p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </CardContent>
              </Card>
            </Link>

            <Link href="/enviar-archivo" className="block">
              <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-primary/50 group h-full">
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <Upload className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">Enviar archivo</h3>
                    <p className="text-sm text-muted-foreground">
                      Presupuesto personalizado
                    </p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* Productos populares */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Productos más populares</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  { nombre: "Tarjetas de Visita", precio: "Desde 55.50€" },
                  { nombre: "Flyers A5", precio: "Desde 45.75€" },
                  { nombre: "Trípticos", precio: "Desde 75.72€" },
                  { nombre: "Dípticos", precio: "Desde 70.72€" },
                  { nombre: "Vinilos", precio: "Desde 55€/m²" },
                  { nombre: "Sobres", precio: "Desde 264€" }
                ].map((producto, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="font-medium">{producto.nombre}</span>
                    <span className="text-sm text-muted-foreground">{producto.precio}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Link href="/cotizar">
                  <Button variant="outline">
                    Ver todos los productos
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Información adicional */}
          <Card className="bg-muted/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap justify-center">
                <div className="flex items-center gap-2">
                  <Printer className="h-4 w-4" />
                  <span>Calidad profesional</span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  <span>Precios con IVA</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span>Envío de archivos</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-auto">
        <div className="container mx-auto px-4 py-4">
          <p className="text-center text-sm text-muted-foreground">
            © 2026 Visuarte Print Shop
          </p>
        </div>
      </footer>
    </div>
  )
}
