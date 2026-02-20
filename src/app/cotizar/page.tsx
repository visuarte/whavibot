"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Calculator, Printer, CheckCircle, Info, Loader2, ImageIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import {
    PRODUCTS,
    getProductList,
    tieneVariantes,
    getVariantes,
    type PrecioCalculado,
    type ProductCatalog,
    IVA_PERCENT
} from "@/lib/precios"
import { calcularPrecioServer } from "@/app/actions"

export default function CotizarPage() {
    const [selectedProductKey, setSelectedProductKey] = useState<string>("")
    const [selectedCantidad, setSelectedCantidad] = useState<string>("")
    const [areaM2, setAreaM2] = useState<string>("1")
    const [selectedVariante, setSelectedVariante] = useState<string>("")
    const [resultado, setResultado] = useState<PrecioCalculado | null>(null)
    const [calculoRealizado, setCalculoRealizado] = useState(false)
    const [loading, setLoading] = useState(true)
    const [productList, setProductList] = useState<ProductCatalog[]>([])
    const [productsMap, setProductsMap] = useState<Record<string, ProductCatalog>>({})

    // Cargar productos desde DB al montar
    useEffect(() => {
        async function loadProducts() {
            try {
                // Llamar a API para obtener productos (server-side)
                const res = await fetch('/api/productos')
                const data = await res.json()
                const products = data.products || []

                // Transformar para el frontend
                const list: ProductCatalog[] = products.map((p: any) => ({
                    key: p.key,
                    nombre: p.nombre,
                    descripcion: p.descripcion || '',
                    imagen: p.imagen || '',
                    tipo: p.tipo as "cantidad_fija" | "por_m2",
                    unidad: p.unidad as "uds" | "m²",
                    precios: p.prices?.reduce((acc: Record<number, number>, px: any) => {
                        acc[px.cantidad] = px.precioBase
                        return acc
                    }, {} as Record<number, number>) || {},
                    cantidadesDisponibles: p.prices?.map((px: any) => px.cantidad).sort((a: number, b: number) => a - b) || [],
                    variantes: [...new Set(p.prices?.map((px: any) => px.variante).filter(Boolean))] as string[],
                    precioPorM2: p.precioPorM2,
                    category: p.category || 'sin_categoria'
                }))
                setProductList(list)
                const map: Record<string, ProductCatalog> = {}
                list.forEach((p: ProductCatalog) => { map[p.key] = p })
                setProductsMap(map)
            } catch (error) {
                console.error("Error cargando productos:", error)
                // Usar fallback
                setProductList(Object.values(PRODUCTS))
                setProductsMap(PRODUCTS)
            } finally {
                setLoading(false)
            }
        }
        loadProducts()
    }, [])

    const productoSeleccionado = selectedProductKey ? productsMap[selectedProductKey] : null
    const tieneVars = productoSeleccionado ? tieneVariantes(productoSeleccionado) : false
    const variantes = productoSeleccionado ? getVariantes(productoSeleccionado) : []

    // Agrupar productos por categoría
    const productsByCategory = productList.reduce((acc, product) => {
        const cat = product.category || 'sin_categoria'
        if (!acc[cat]) {
            acc[cat] = []
        }
        acc[cat].push(product)
        return acc
    }, {} as Record<string, ProductCatalog[]>)

    // Ordenar categorías
    const categoryOrder = ['pequeño_formato', 'gran_formato_flexible', 'gran_formato_rigido', 'senaletica', 'sin_categoria']
    const sortedCategories = Object.keys(productsByCategory).sort((a, b) => {
        const idxA = categoryOrder.indexOf(a)
        const idxB = categoryOrder.indexOf(b)
        if (idxA === -1 && idxB === -1) return a.localeCompare(b)
        if (idxA === -1) return 1
        if (idxB === -1) return -1
        return idxA - idxB
    })

    // Nombres amigables para categorías
    const categoryNames: Record<string, string> = {
        'pequeño_formato': 'Pequeño Formato',
        'gran_formato_flexible': 'Gran Formato Flexible',
        'gran_formato_rigido': 'Gran Formato Rígido',
        'senaletica': 'Senyalética',
        'sin_categoria': 'Otros'
    }

    const handleProductChange = (key: string) => {
        setSelectedProductKey(key)
        setSelectedCantidad("")
        setResultado(null)
        setCalculoRealizado(false)
        setSelectedVariante("")
    }

    const handleCalcular = async () => {
        if (!selectedProductKey) return

        try {
            const producto = productsMap[selectedProductKey]
            const varianteIndex = tieneVars && selectedVariante ? variantes.indexOf(selectedVariante) : undefined

            let cantidad: number | string = selectedCantidad

            if (producto.tipo === "por_m2") {
                cantidad = parseFloat(areaM2) || 1
            } else {
                cantidad = parseInt(selectedCantidad) || 0
            }

            // Usar Server Action para calcular precio (ejecuta en servidor, no bundlea Prisma)
            const result = await calcularPrecioServer(
                selectedProductKey,
                cantidad,
                producto.tipo === "por_m2" ? parseFloat(areaM2) || 1 : undefined,
                varianteIndex !== undefined && varianteIndex >= 0 ? varianteIndex : undefined
            )

            if (result.success && result.data) {
                setResultado(result.data)
                setCalculoRealizado(true)
            } else {
                console.error("Error al calcular:", result.error)
            }

        } catch (error) {
            console.error("Error al calcular:", error)
        }
    }

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("es-ES", {
            style: "currency",
            currency: "EUR"
        }).format(value)
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background">
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
                    <div className="flex items-center gap-2 text-sm">
                        <Link href="/" className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
                            <ArrowLeft className="h-4 w-4" />
                            Volver
                        </Link>
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold flex items-center gap-3">
                            <Calculator className="h-8 w-8" />
                            Calculadora de Precios
                        </h2>
                        <p className="text-muted-foreground">
                            Selecciona un producto y la cantidad para calcular tu presupuesto
                        </p>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Configura tu presupuesto</CardTitle>
                            <CardDescription>
                                Todos los precios son base (sin IVA). El IVA se añadirá al final.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="producto">Producto</Label>
                                <Select value={selectedProductKey} onValueChange={handleProductChange}>
                                    <SelectTrigger id="producto">
                                        <SelectValue placeholder="Selecciona un producto" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {sortedCategories.map((category) => (
                                            <SelectGroup key={category}>
                                                <SelectLabel className="font-bold text-primary bg-muted/50 px-2 py-1">
                                                    {categoryNames[category] || category}
                                                </SelectLabel>
                                                {productsByCategory[category].map((product) => (
                                                    <SelectItem key={product.key} value={product.key} className="flex items-center gap-2">
                                                        {product.imagen && (
                                                            <Image
                                                                src={product.imagen}
                                                                alt={product.nombre}
                                                                width={24}
                                                                height={24}
                                                                className="w-6 h-6 object-cover rounded"
                                                                unoptimized
                                                            />
                                                        )}
                                                        <span>{product.nombre}</span>
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {tieneVars && (
                                <div className="space-y-2">
                                    <Label htmlFor="variante">Variante</Label>
                                    <Select value={selectedVariante} onValueChange={setSelectedVariante}>
                                        <SelectTrigger id="variante">
                                            <SelectValue placeholder="Selecciona una variante" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {variantes.map((variante, index) => (
                                                <SelectItem key={index} value={variante}>
                                                    {variante}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}

                            {productoSeleccionado?.tipo === "por_m2" && (
                                <div className="space-y-2">
                                    <Label htmlFor="area">Área (m²)</Label>
                                    <Input
                                        id="area"
                                        type="number"
                                        min="0.1"
                                        step="0.1"
                                        value={areaM2}
                                        onChange={(e) => setAreaM2(e.target.value)}
                                        placeholder="Introduce los metros cuadrados"
                                    />
                                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                                        <Info className="h-4 w-4" />
                                        Precio por m²: {formatCurrency(productoSeleccionado.precioPorM2 || 0)}
                                    </p>
                                </div>
                            )}

                            {productoSeleccionado?.tipo === "cantidad_fija" && (
                                <div className="space-y-2">
                                    <Label htmlFor="cantidad">Cantidad ({productoSeleccionado.unidad})</Label>
                                    <Select value={selectedCantidad} onValueChange={setSelectedCantidad}>
                                        <SelectTrigger id="cantidad">
                                            <SelectValue placeholder="Selecciona la cantidad" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {productoSeleccionado.cantidadesDisponibles.map((cant) => (
                                                <SelectItem key={cant} value={cant.toString()}>
                                                    {cant.toLocaleString("es-ES")} {productoSeleccionado.unidad}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}

                            <div className="bg-muted/50 rounded-lg p-4">
                                <div className="flex items-center gap-2 text-sm">
                                    <Info className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-muted-foreground">
                                        IVA: <strong>{(IVA_PERCENT * 100).toFixed(0)}%</strong> - Los precios mostrados son base sin IVA
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button
                                className="w-full"
                                size="lg"
                                onClick={handleCalcular}
                                disabled={!selectedProductKey || (productoSeleccionado?.tipo === "cantidad_fija" && !selectedCantidad)}
                            >
                                <Calculator className="mr-2 h-4 w-4" />
                                Calcular Precio
                            </Button>
                        </CardFooter>
                    </Card>

                    {resultado && calculoRealizado && (
                        <Card className="border-2 border-primary/50 bg-primary/5 animate-in fade-in slide-in-from-bottom-4 duration-300">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <CheckCircle className="h-5 w-5 text-green-600" />
                                    Presupuesto Calculado
                                </CardTitle>
                                <CardDescription>
                                    {resultado.producto.nombre}
                                    {selectedVariante && ` - ${selectedVariante}`}
                                    {" - "}{typeof resultado.cantidad === "number"
                                        ? resultado.cantidad.toLocaleString("es-ES")
                                        : resultado.cantidad} {productoSeleccionado?.unidad}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="grid gap-3">
                                        <div className="flex justify-between items-center py-2 border-b">
                                            <span className="text-muted-foreground">Base (sin IVA)</span>
                                            <span className="font-medium">{formatCurrency(resultado.base)}</span>
                                        </div>
                                        <div className="flex justify-between items-center py-2 border-b">
                                            <span className="text-muted-foreground">IVA (21%)</span>
                                            <span className="font-medium">{formatCurrency(resultado.iva)}</span>
                                        </div>
                                        <div className="flex justify-between items-center py-3 bg-primary/10 rounded-lg px-4 -mx-4">
                                            <span className="font-bold text-lg">Total</span>
                                            <span className="font-bold text-2xl text-primary">{formatCurrency(resultado.total)}</span>
                                        </div>
                                    </div>
                                    <p className="text-sm text-muted-foreground text-center">
                                        Este precio es orientativo. Para pedidos grandes o proyectos personalizados, contacta con nosotros.
                                    </p>
                                </div>
                            </CardContent>
                            <CardFooter className="flex gap-3">
                                <Link href="/enviar-archivo" className="flex-1">
                                    <Button variant="outline" className="w-full">
                                        Solicitar presupuesto personalizado
                                    </Button>
                                </Link>
                                <Link href="/" className="flex-1">
                                    <Button className="w-full">
                                        Volver al inicio
                                    </Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    )}

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Productos disponibles</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-2 sm:grid-cols-2">
                                {productList.slice(0, 8).map((product) => (
                                    <div
                                        key={product.key}
                                        className="flex items-center gap-3 text-sm p-2 rounded hover:bg-muted/50 cursor-pointer transition-colors"
                                        onClick={() => handleProductChange(product.key)}
                                    >
                                        {product.imagen ? (
                                            <Image
                                                src={product.imagen}
                                                alt={product.nombre}
                                                width={48}
                                                height={48}
                                                className="rounded object-cover w-12 h-12"
                                            />
                                        ) : (
                                            <div className="w-12 h-12 bg-muted rounded flex items-center justify-center">
                                                <ImageIcon className="h-5 w-5 text-muted-foreground" />
                                            </div>
                                        )}
                                        <div>
                                            <span className="font-medium">{product.nombre}</span>
                                            {product.descripcion && (
                                                <span className="text-muted-foreground text-xs block">
                                                    {product.descripcion}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>

            <footer className="border-t mt-auto">
                <div className="container mx-auto px-4 py-4">
                    <p className="text-center text-sm text-muted-foreground">
                        © 2026 Visuarte Print Shop - Calculadora de precios
                    </p>
                </div>
            </footer>
        </div>
    )
}
