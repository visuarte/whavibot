"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Package, Check } from "lucide-react"

export interface ProductOption {
    quantity: number
    basePrice: number
}

export interface Product {
    id: string
    name: string
    description: string
    options: ProductOption[]
}

const IVA_RATE = 0.21

function calculateTotalWithIVA(basePrice: number): number {
    return basePrice * (1 + IVA_RATE)
}

function formatPrice(price: number): string {
    return price.toFixed(2).replace(".", ",")
}

interface ProductCardProps {
    product: Product
    onSelect?: (product: Product, option: ProductOption) => void
}

export function ProductCard({ product, onSelect }: ProductCardProps) {
    return (
        <Card className="w-full max-w-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                        <Package className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <CardTitle className="text-xl">{product.name}</CardTitle>
                        <CardDescription>{product.description}</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {product.options.map((option, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                        >
                            <div className="flex items-center gap-2">
                                <span className="font-medium">{option.quantity} uds</span>
                            </div>
                            <div className="text-right">
                                <div className="text-sm text-muted-foreground">
                                    {formatPrice(option.basePrice)}€ base
                                </div>
                                <div className="font-bold text-primary">
                                    {formatPrice(calculateTotalWithIVA(option.basePrice))}€ (IVA incl.)
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Impuesto IVA 21% incluido</span>
                </div>
            </CardContent>
            {onSelect && (
                <CardFooter>
                    <Button
                        className="w-full"
                        onClick={() => onSelect(product, product.options[0])}
                    >
                        Seleccionar
                    </Button>
                </CardFooter>
            )}
        </Card>
    )
}

export { calculateTotalWithIVA, formatPrice }
