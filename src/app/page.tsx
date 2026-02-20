"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageSquare, Calculator, Upload, Printer, CreditCard, ArrowRight, FileText, Zap, Award } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b sticky top-0 z-50 bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3 animate-in fade-in slide-in-from-top duration-500">
            <div className="p-2 bg-primary rounded-lg">
              <Printer className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold">Visuarte Print Shop</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Saludo con animación */}
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 animate-in fade-in slide-in-from-top-4 duration-700">
            <CardHeader className="text-center py-8">
              <div className="mx-auto mb-4 p-4 bg-primary/20 rounded-full w-fit animate-in bounce-in duration-700">
                <MessageSquare className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-3xl md:text-4xl font-bold">
                ¡Bienvenido a Visuarte!
              </CardTitle>
              <CardDescription className="text-base mt-2">
                Tu solución de impresión digital profesional
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Menú de opciones mejorado */}
          <div className="grid gap-6 md:grid-cols-2">
            <Link href="/cotizar" className="block group">
              <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-primary/50 h-full animate-in fade-in slide-in-from-left-4 duration-700">
                <CardContent className="flex flex-col gap-4 p-6 h-full">
                  <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors w-fit">
                    <Calculator className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg group-hover:text-primary transition-colors">Calcular y cotizar</h3>
                    <p className="text-sm text-muted-foreground">
                      Explora nuestros packs con precios claros e IVA incluido
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-primary group-hover:gap-3 transition-all">
                    <span className="text-sm font-medium">Ir a cotizar</span>
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/enviar-archivo" className="block group">
              <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-primary/50 h-full animate-in fade-in slide-in-from-right-4 duration-700">
                <CardContent className="flex flex-col gap-4 p-6 h-full">
                  <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors w-fit">
                    <Upload className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg group-hover:text-primary transition-colors">Presupuesto personalizado</h3>
                    <p className="text-sm text-muted-foreground">
                      Sube tu archivo y recibe un presupuesto a medida
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-primary group-hover:gap-3 transition-all">
                    <span className="text-sm font-medium">Enviar archivo</span>
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* Productos populares */}
          <Card className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                Productos más populares
              </CardTitle>
              <CardDescription>
                Nuestros favoritos con mejor relación calidad-precio
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  { nombre: "Tarjetas de Visita", precio: "Desde 55.50€", icon: "🎯" },
                  { nombre: "Flyers A5", precio: "Desde 45.75€", icon: "📄" },
                  { nombre: "Trípticos", precio: "Desde 75.72€", icon: "📋" },
                  { nombre: "Dípticos", precio: "Desde 70.72€", icon: "📑" },
                  { nombre: "Vinilos", precio: "Desde 55€/m²", icon: "🎨" },
                  { nombre: "Sobres", precio: "Desde 264€", icon: "✉️" }
                ].map((producto, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between gap-3 p-4 bg-muted/50 hover:bg-muted rounded-lg transition-colors hover:shadow-md duration-300 group cursor-pointer"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <span className="text-2xl">{producto.icon}</span>
                      <div>
                        <span className="font-semibold text-sm block">{producto.nombre}</span>
                        <span className="text-xs text-muted-foreground">{producto.precio}</span>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <Link href="/cotizar">
                  <Button className="gap-2">
                    Ver todos los productos
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Información adicional */}
          <div className="grid gap-4 md:grid-cols-3 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Card className="border-0 bg-gradient-to-br from-primary/5 to-primary/10">
              <CardContent className="flex flex-col items-center text-center gap-3 pt-6">
                <div className="p-3 bg-primary/20 rounded-lg">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">Calidad profesional</h4>
                  <p className="text-xs text-muted-foreground">Acabados premium garantizados</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-0 bg-gradient-to-br from-primary/5 to-primary/10">
              <CardContent className="flex flex-col items-center text-center gap-3 pt-6">
                <div className="p-3 bg-primary/20 rounded-lg">
                  <CreditCard className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">Precios transparentes</h4>
                  <p className="text-xs text-muted-foreground">IVA incluido siempre</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-primary/5 to-primary/10">
              <CardContent className="flex flex-col items-center text-center gap-3 pt-6">
                <div className="p-3 bg-primary/20 rounded-lg">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">Fácil de usar</h4>
                  <p className="text-xs text-muted-foreground">Cotiza en segundos</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-12 bg-muted/50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid gap-4 md:grid-cols-2 mb-6">
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Printer className="h-4 w-4" />
                  Visuarte Print Shop
                </h4>
                <p className="text-sm text-muted-foreground">
                  Tu solución de impresión digital profesional con precios transparentes
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Acciones rápidas</h4>
                <div className="flex gap-3">
                  <Link href="/cotizar" className="text-sm text-primary hover:underline">
                    Cotizar
                  </Link>
                  <Link href="/enviar-archivo" className="text-sm text-primary hover:underline">
                    Enviar archivo
                  </Link>
                </div>
              </div>
            </div>
            <div className="border-t pt-4">
              <p className="text-center text-xs text-muted-foreground">
                © 2026 Visuarte Print Shop - Todos los derechos reservados
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
