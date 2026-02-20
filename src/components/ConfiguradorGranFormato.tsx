"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Info, Maximize2 } from "lucide-react"
import type { ProductCatalog } from "@/lib/types"

interface ConfiguradorGranFormatoProps {
    producto: ProductCatalog
    precioPorM2: number
    onConfiguracionChange: (config: ConfiguracionGranFormato) => void
}

export interface ConfiguracionGranFormato {
    anchoCm: number
    altoCm: number
    m2: number
    precioBase: number
}

export function ConfiguradorGranFormato({
    producto,
    precioPorM2,
    onConfiguracionChange
}: ConfiguradorGranFormatoProps) {
    const [anchoCm, setAnchoCm] = useState<string>(
        String(producto.anchoRecomendadoCm || 100)
    )
    const [altoCm, setAltoCm] = useState<string>(
        String(producto.altoRecomendadoCm || 100)
    )

    // Dimensiones límite
    const anchoMin = producto.anchoMinCm || 10
    const anchoMax = producto.anchoMaxCm || 300
    const altoMin = producto.altoMinCm || 10
    const altoMax = producto.altoMaxCm || 300

    // Calcular m² y precio
    const anchoNum = Math.min(Math.max(parseFloat(anchoCm) || 0, anchoMin), anchoMax)
    const altoNum = Math.min(Math.max(parseFloat(altoCm) || 0, altoMin), altoMax)
    const m2 = (anchoNum * altoNum) / 10000 // Convertir cm² a m²
    const precioBase = Math.round(m2 * precioPorM2 * 100) / 100

    // Notificar cambios
    useEffect(() => {
        onConfiguracionChange({
            anchoCm: anchoNum,
            altoCm: altoNum,
            m2,
            precioBase
        })
    }, [anchoNum, altoNum, m2, precioPorM2])

    const handlePreset = (ancho: number, alto: number) => {
        setAnchoCm(String(ancho))
        setAltoCm(String(alto))
    }

    // Presets comunes
    const presetsComunes = [
        { nombre: "DIN A3", ancho: 42, alto: 29.7 },
        { nombre: "DIN A2", ancho: 59.4, alto: 42 },
        { nombre: "DIN A1", ancho: 84.1, alto: 59.4 },
        { nombre: "DIN A0", ancho: 118.9, alto: 84.1 },
    ]

    return (
        <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Maximize2 className="h-5 w-5" />
                    Configurador de Dimensiones
                </CardTitle>
                <CardDescription>
                    {producto.materialType === 'flexible' ? '📋 Material Flexible' : '🪨 Material Rígido'} - Calcula el precio por metros cuadrados
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
                {/* Inputs de dimensiones */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label className="text-sm font-semibold mb-2 block">
                            Ancho (cm)
                        </Label>
                        <div className="relative">
                            <Input
                                type="number"
                                min={anchoMin}
                                max={anchoMax}
                                step="0.5"
                                value={anchoCm}
                                onChange={(e) => setAnchoCm(e.target.value)}
                                className="text-lg font-semibold pr-8"
                                placeholder="Ancho"
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                                cm
                            </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Rango: {anchoMin} - {anchoMax} cm
                        </p>
                    </div>

                    <div>
                        <Label className="text-sm font-semibold mb-2 block">
                            Alto (cm)
                        </Label>
                        <div className="relative">
                            <Input
                                type="number"
                                min={altoMin}
                                max={altoMax}
                                step="0.5"
                                value={altoCm}
                                onChange={(e) => setAltoCm(e.target.value)}
                                className="text-lg font-semibold pr-8"
                                placeholder="Alto"
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                                cm
                            </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Rango: {altoMin} - {altoMax} cm
                        </p>
                    </div>
                </div>

                {/* Presets */}
                <div>
                    <Label className="text-sm font-semibold mb-2 block">
                        Tamaños estándar
                    </Label>
                    <div className="grid grid-cols-2 gap-2">
                        {presetsComunes.map((preset) => (
                            <Button
                                key={preset.nombre}
                                variant="outline"
                                size="sm"
                                onClick={() => handlePreset(preset.ancho, preset.alto)}
                                className="text-xs"
                            >
                                {preset.nombre}
                                <br />
                                <span className="text-[10px] opacity-75">
                                    {preset.ancho} × {preset.alto} cm
                                </span>
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Resumen de cálculo */}
                <div className="bg-background rounded-lg p-4 space-y-3 border border-border">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Dimensiones:</span>
                        <span className="font-semibold">
                            {anchoNum.toFixed(1)} cm × {altoNum.toFixed(1)} cm
                        </span>
                    </div>

                    <div className="border-t border-border pt-3 flex justify-between items-center">
                        <span className="text-muted-foreground">Área total:</span>
                        <span className="font-bold text-lg">
                            {m2.toFixed(2)} m²
                        </span>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Precio por m²:</span>
                        <span className="font-semibold">
                            {precioPorM2.toFixed(2)}€
                        </span>
                    </div>

                    <div className="border-t border-border pt-3 flex justify-between items-center">
                        <span className="font-semibold">Precio base (sin IVA):</span>
                        <span className="text-primary font-bold text-lg">
                            {precioBase.toFixed(2)}€
                        </span>
                    </div>
                </div>

                {/* Info */}
                <div className="flex gap-2 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
                    <Info className="h-4 w-4 mt-0.5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                    <p className="text-xs text-blue-700 dark:text-blue-300">
                        El precio mostrado es sin IVA. El IVA (21%) se agregará en el paso final.
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}
