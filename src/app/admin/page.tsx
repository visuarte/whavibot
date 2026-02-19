/**
 * Dashboard Admin - Visuarte Print Shop
 * 
 * Ruta protegida con NextAuth - requiere sesión activa
 * 
 * Características:
 * - Tabla de últimas 20 cotizaciones
 * - Tabla de últimos 10 leads
 * - Badge de scoring (verde=caliente, amarillo=tibio)
 * - Botón para marcar leads como notificados
 */

"use client"

// Forzar renderizado dinámico para que funcione con NextAuth
export const dynamic = 'force-dynamic'

import { useState, useEffect, useCallback } from "react"
import { useSession, signOut } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { LogOut, Loader2 } from "lucide-react"

// Tipo para cotizaciones
interface CotizacionAdmin {
    id: string
    productId: string
    cantidad: number | null
    areaM2: number | null
    base: number
    iva: number
    total: number
    leadScoring: string
    createdAt: string
    product: {
        nombre: string
    }
}

// Tipo para leads
interface LeadAdmin {
    id: string
    archivoNombre: string | null
    archivoPath: string | null
    mensaje: string | null
    leadScoring: string
    notificado: boolean
    createdAt: string
}

export default function AdminPage() {
    const sessionResult = useSession() || { data: null, status: "loading" }
    const session = sessionResult.data
    const status = sessionResult.status
    const [cotizaciones, setCotizaciones] = useState<CotizacionAdmin[]>([])
    const [leads, setLeads] = useState<LeadAdmin[]>([])
    const [loading, setLoading] = useState(true)

    // Función para obtener datos
    const fetchData = useCallback(async () => {
        setLoading(true)
        try {
            // Obtener cotizaciones
            const cotizRes = await fetch("/api/cotizaciones")
            const cotizData = await cotizRes.json()
            if (cotizData.cotizaciones) {
                setCotizaciones(cotizData.cotizaciones)
            }

            // Obtener leads
            const leadsRes = await fetch("/api/leads")
            const leadsData = await leadsRes.json()
            if (leadsData.leads) {
                setLeads(leadsData.leads)
            }
        } catch (err) {
            console.error("Error fetching data:", err)
        } finally {
            setLoading(false)
        }
    }, [])

    // Cargar datos al montar el componente
    useEffect(() => {
        if (status === "authenticated") {
            fetchData()
        }
    }, [status, fetchData])

    // Mostrar loading mientras verifica sesión
    if (status === "loading") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                    <p className="text-gray-600">Verificando sesión...</p>
                </div>
            </div>
        )
    }

    // Redireccionar a login si no autenticado (middleware debería manejar esto)
    if (status === "unauthenticated") {
        window.location.href = "/login"
        return null
    }

    // Marcar lead como notificado
    const handleMarcarNotificado = async (leadId: string) => {
        try {
            const res = await fetch("/api/admin/marcar-notificado", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ leadId })
            })

            if (res.ok) {
                setLeads(prev => prev.map(lead =>
                    lead.id === leadId
                        ? { ...lead, notificado: true }
                        : lead
                ))
            }
        } catch (err) {
            console.error("Error marking lead:", err)
        }
    }

    // Formatear fecha
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        })
    }

    // Formatear precio
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("es-ES", {
            style: "currency",
            currency: "EUR"
        }).format(price)
    }

    // Obtener color del badge según scoring
    const getScoringBadge = (scoring: string) => {
        switch (scoring) {
            case "caliente":
                return <Badge className="bg-green-500">🔥 Caliente</Badge>
            case "tibio":
                return <Badge className="bg-yellow-500">🌡️ Tibio</Badge>
            case "frio":
                return <Badge className="bg-blue-500">❄️ Frío</Badge>
            default:
                return <Badge>{scoring}</Badge>
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            📊 Dashboard Admin
                        </h1>
                        <p className="text-gray-600">
                            Visuarte Print Shop - Gestión de cotizaciones y leads
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600">
                            {session?.user?.name || session?.user?.email}
                        </span>
                        <Button
                            variant="outline"
                            onClick={() => signOut({ callbackUrl: "/" })}
                        >
                            <LogOut className="h-4 w-4 mr-2" />
                            Cerrar Sesión
                        </Button>
                    </div>
                </div>

                {loading && (
                    <div className="text-center py-8">
                        <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                        <p className="text-gray-600 mt-2">Cargando datos...</p>
                    </div>
                )}

                {/* Cotizaciones */}
                <Card>
                    <CardHeader>
                        <CardTitle>📝 Últimas 20 Cotizaciones</CardTitle>
                        <CardDescription>
                            Historial de cotizaciones realizadas
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Fecha</TableHead>
                                        <TableHead>Producto</TableHead>
                                        <TableHead>Cantidad</TableHead>
                                        <TableHead>Base</TableHead>
                                        <TableHead>IVA</TableHead>
                                        <TableHead>Total</TableHead>
                                        <TableHead>Scoring</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {cotizaciones.slice(0, 20).map((cot) => (
                                        <TableRow key={cot.id}>
                                            <TableCell className="whitespace-nowrap">
                                                {formatDate(cot.createdAt)}
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                {cot.product?.nombre || "Producto"}
                                            </TableCell>
                                            <TableCell>
                                                {cot.cantidad
                                                    ? `${cot.cantidad} uds`
                                                    : cot.areaM2
                                                        ? `${cot.areaM2} m²`
                                                        : "-"}
                                            </TableCell>
                                            <TableCell>{formatPrice(cot.base)}</TableCell>
                                            <TableCell>{formatPrice(cot.iva)}</TableCell>
                                            <TableCell className="font-bold">
                                                {formatPrice(cot.total)}
                                            </TableCell>
                                            <TableCell>{getScoringBadge(cot.leadScoring)}</TableCell>
                                        </TableRow>
                                    ))}
                                    {cotizaciones.length === 0 && !loading && (
                                        <TableRow>
                                            <TableCell colSpan={7} className="text-center text-gray-500">
                                                No hay cotizaciones todavía
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>

                {/* Leads */}
                <Card>
                    <CardHeader>
                        <CardTitle>📥 Últimos 10 Leads</CardTitle>
                        <CardDescription>
                            Archivos subidos para presupuestos personalizados
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Fecha</TableHead>
                                        <TableHead>Archivo</TableHead>
                                        <TableHead>Mensaje</TableHead>
                                        <TableHead>Scoring</TableHead>
                                        <TableHead>Notificado</TableHead>
                                        <TableHead>Acción</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {leads.slice(0, 10).map((lead) => (
                                        <TableRow key={lead.id}>
                                            <TableCell className="whitespace-nowrap">
                                                {formatDate(lead.createdAt)}
                                            </TableCell>
                                            <TableCell className="max-w-[200px]">
                                                {lead.archivoNombre ? (
                                                    <a
                                                        href={lead.archivoPath || "#"}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-600 hover:underline truncate block"
                                                    >
                                                        {lead.archivoNombre}
                                                    </a>
                                                ) : (
                                                    <span className="text-gray-400">Sin archivo</span>
                                                )}
                                            </TableCell>
                                            <TableCell className="max-w-[200px]">
                                                <span className="truncate block">
                                                    {lead.mensaje || "-"}
                                                </span>
                                            </TableCell>
                                            <TableCell>{getScoringBadge(lead.leadScoring)}</TableCell>
                                            <TableCell>
                                                {lead.notificado ? (
                                                    <Badge variant="outline" className="text-green-600 border-green-600">
                                                        ✅ Enviado
                                                    </Badge>
                                                ) : (
                                                    <Badge variant="outline" className="text-gray-500">
                                                        ⏳ Pendiente
                                                    </Badge>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {!lead.notificado && (
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => handleMarcarNotificado(lead.id)}
                                                    >
                                                        📱 Notificar
                                                    </Button>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {leads.length === 0 && !loading && (
                                        <TableRow>
                                            <TableCell colSpan={6} className="text-center text-gray-500">
                                                No hay leads todavía
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
