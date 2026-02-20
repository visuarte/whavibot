'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { TrendingUp, DollarSign, Package, Users } from 'lucide-react'

interface CotizacionData {
    id: string
    total: number
    leadScoring: string
    createdAt: string
    product?: { nombre: string }
}

interface DashboardStatsProps {
    cotizaciones: CotizacionData[]
}

export function DashboardStats({ cotizaciones }: DashboardStatsProps) {
    // Calcular estadísticas
    const stats = {
        totalCotizaciones: cotizaciones.length,
        totalVentas: cotizaciones.reduce((sum, c) => sum + c.total, 0),
        promedio: cotizaciones.length > 0 ? cotizaciones.reduce((sum, c) => sum + c.total, 0) / cotizaciones.length : 0,
        calientes: cotizaciones.filter(c => c.leadScoring === 'caliente').length
    }

    // Preparar datos para gráfico de tendencia diaria
    const dailyData = cotizaciones.reduce((acc, cot) => {
        const fecha = new Date(cot.createdAt).toLocaleDateString('es-ES', { month: '2-digit', day: '2-digit' })
        const existing = acc.find(d => d.fecha === fecha)
        if (existing) {
            existing.total += cot.total
            existing.cantidad += 1
        } else {
            acc.push({ fecha, total: cot.total, cantidad: 1 })
        }
        return acc
    }, [] as Array<{ fecha: string; total: number; cantidad: number }>).slice(-7) // Últimos 7 días

    // Preparar datos para gráfico de scoring
    const scoringData = [
        { nombre: 'Caliente', valor: cotizaciones.filter(c => c.leadScoring === 'caliente').length, color: '#ef4444' },
        { nombre: 'Tibio', valor: cotizaciones.filter(c => c.leadScoring === 'tibio').length, color: '#eab308' },
        { nombre: 'Frío', valor: cotizaciones.filter(c => c.leadScoring === 'frio').length, color: '#3b82f6' }
    ]

    return (
        <div className="space-y-6">
            {/* Cards de resumen */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Cotizaciones</CardTitle>
                        <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalCotizaciones}</div>
                        <p className="text-xs text-muted-foreground">Todas las cotizaciones</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Ventas</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {stats.totalVentas.toLocaleString('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })}
                        </div>
                        <p className="text-xs text-muted-foreground">Valor total generado</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Promedio por Cotización</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {stats.promedio.toLocaleString('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })}
                        </div>
                        <p className="text-xs text-muted-foreground">Ticket promedio</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Leads Calientes</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.calientes}</div>
                        <p className="text-xs text-muted-foreground">Leads de alto valor</p>
                    </CardContent>
                </Card>
            </div>

            {/* Gráficos */}
            <div className="grid gap-4 md:grid-cols-2">
                {/* Gráfico de tendencia */}
                <Card>
                    <CardHeader>
                        <CardTitle>Tendencia de Ventas</CardTitle>
                        <CardDescription>Últimos 7 días</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer
                            config={{
                                total: {
                                    label: 'Ventas (€)',
                                    color: 'hsl(var(--chart-1))',
                                },
                                cantidad: {
                                    label: 'Cantidad',
                                    color: 'hsl(var(--chart-2))',
                                },
                            }}
                            className="h-[300px]"
                        >
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={dailyData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="fecha" />
                                    <YAxis />
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="total"
                                        stroke="var(--color-total)"
                                        name="Ventas (€)"
                                        dot={{ fill: 'var(--color-total)' }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                </Card>

                {/* Gráfico de scoring */}
                <Card>
                    <CardHeader>
                        <CardTitle>Distribución de Leads</CardTitle>
                        <CardDescription>Por temperatura de interés</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer
                            config={{
                                valor: {
                                    label: 'Cantidad de Leads',
                                    color: 'hsl(var(--chart-1))',
                                },
                            }}
                            className="h-[300px]"
                        >
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={scoringData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="nombre" />
                                    <YAxis />
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                    <Bar
                                        dataKey="valor"
                                        fill="var(--color-valor)"
                                        radius={[8, 8, 0, 0]}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
