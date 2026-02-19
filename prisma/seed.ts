/**
 * Script de Seed para Visuarte Print Shop
 * 
 * Inserta todos los productos y precios reales en la base de datos.
 * 
 * Uso:
 * npx prisma db seed
 * 
 * o manualmente:
 * npx tsx prisma/seed.ts
 */

import "dotenv/config"
import { PrismaClient } from "@prisma/client"

// Debug: verificar que las variables se cargan
console.log("DEBUG - DATABASE_URL:", process.env.DATABASE_URL)

// Inicializar Prisma Client (SQLite no necesita adapter)
const prisma = new PrismaClient()

/**
 * Datos de productos y precios del catálogo de Visuarte Print Shop
 * Todos los precios son BASE (sin IVA)
 */
const productsData = [
    // ========== TARJETAS DE VISITA ==========
    {
        key: "tarjetas_clasicas",
        nombre: "Tarjetas de Visita Clásicas",
        descripcion: "85x55 mm - Sin Laminar",
        tipo: "cantidad_fija",
        precios: [
            { cantidad: 250, precioBase: 55.50 },
            { cantidad: 500, precioBase: 70.76 },
            { cantidad: 1000, precioBase: 90.05 },
            { cantidad: 2500, precioBase: 165.45 }
        ]
    },
    {
        key: "tarjetas_laminadas",
        nombre: "Tarjetas Laminadas",
        descripcion: "85x55 mm - Mate o Brillo",
        tipo: "cantidad_fija",
        precios: [
            { cantidad: 250, precioBase: 75.10 },
            { cantidad: 500, precioBase: 90.56 },
            { cantidad: 1000, precioBase: 125.34 },
            { cantidad: 2500, precioBase: 169.90 }
        ]
    },
    {
        key: "tarjetas_exclusivas",
        nombre: "Tarjetas Acabados Exclusivos",
        descripcion: "85x55 mm - Acabados especiales",
        tipo: "cantidad_fija",
        precios: [
            { cantidad: 250, precioBase: 85.90 },
            { cantidad: 500, precioBase: 135.24 },
            { cantidad: 1000, precioBase: 175.70 },
            { cantidad: 2500, precioBase: 205.34 }
        ]
    },

    // ========== BROCHURES ==========
    {
        key: "brochure_21x10",
        nombre: "Brochure 21x10.5",
        descripcion: "Alargado, 350gr, 1 o 2 caras",
        tipo: "cantidad_fija",
        precios: [
            { cantidad: 100, precioBase: 45.60 },
            { cantidad: 200, precioBase: 65.90 },
            { cantidad: 300, precioBase: 75.80 },
            { cantidad: 500, precioBase: 95.30 }
        ]
    },

    // ========== FLYERS ==========
    {
        key: "flyers_a6",
        nombre: "Flyers A6",
        descripcion: "105x148mm, 135gr 2 caras",
        tipo: "cantidad_fija",
        precios: [
            { cantidad: 100, precioBase: 35.55 },
            { cantidad: 300, precioBase: 55.65 },
            { cantidad: 500, precioBase: 75.90 },
            { cantidad: 1000, precioBase: 98.80 },
            { cantidad: 1500, precioBase: 115.05 },
            { cantidad: 2500, precioBase: 145.45 }
        ]
    },
    {
        key: "flyers_a5",
        nombre: "Flyers A5",
        descripcion: "148x210mm, 135gr 2 caras",
        tipo: "cantidad_fija",
        precios: [
            { cantidad: 100, precioBase: 45.75 },
            { cantidad: 250, precioBase: 65.85 },
            { cantidad: 500, precioBase: 85.30 },
            { cantidad: 750, precioBase: 110.05 },
            { cantidad: 1000, precioBase: 125.40 },
            { cantidad: 1500, precioBase: 165.40 },
            { cantidad: 2500, precioBase: 185.25 }
        ]
    },
    {
        key: "flyers_a4",
        nombre: "Flyers A4",
        descripcion: "210x297mm, 135gr 2 caras",
        tipo: "cantidad_fija",
        precios: [
            { cantidad: 100, precioBase: 69.75 },
            { cantidad: 250, precioBase: 88.85 },
            { cantidad: 500, precioBase: 145.30 },
            { cantidad: 1000, precioBase: 185.40 }
        ]
    },

    // ========== TRÍPTICOS ==========
    {
        key: "tripticos_a4",
        nombre: "Trípticos A4 Abierto",
        descripcion: "Formato A4 abierto",
        tipo: "cantidad_fija",
        precios: [
            { cantidad: 100, precioBase: 75.72 },
            { cantidad: 250, precioBase: 85.15 },
            { cantidad: 500, precioBase: 108.91 },
            { cantidad: 1000, precioBase: 198.84 },
            { cantidad: 2500, precioBase: 245.17 },
            { cantidad: 5000, precioBase: 400.50 },
            { cantidad: 7500, precioBase: 445.90 },
            { cantidad: 10000, precioBase: 620.60 }
        ]
    },
    {
        key: "tripticos_a3",
        nombre: "Trípticos A3 Abierto",
        descripcion: "Formato A3 abierto",
        tipo: "cantidad_fija",
        precios: [
            { cantidad: 100, precioBase: 99.90 },
            { cantidad: 250, precioBase: 205.15 },
            { cantidad: 500, precioBase: 228.91 },
            { cantidad: 1000, precioBase: 258.84 },
            { cantidad: 2500, precioBase: 290.17 },
            { cantidad: 5000, precioBase: 620.50 },
            { cantidad: 7500, precioBase: 695.90 },
            { cantidad: 10000, precioBase: 820.60 }
        ]
    },

    // ========== DÍPTICOS ==========
    {
        key: "dipticos_a5",
        nombre: "Dípticos A5 Abierto",
        descripcion: "Formato A5 abierto",
        tipo: "cantidad_fija",
        precios: [
            { cantidad: 100, precioBase: 74.72 },
            { cantidad: 250, precioBase: 88.15 },
            { cantidad: 500, precioBase: 105.71 },
            { cantidad: 1000, precioBase: 118.84 },
            { cantidad: 2500, precioBase: 160.17 },
            { cantidad: 5000, precioBase: 220.50 },
            { cantidad: 7500, precioBase: 265.90 },
            { cantidad: 10000, precioBase: 340.60 }
        ]
    },
    {
        key: "dipticos_a4",
        nombre: "Dípticos A4 Abierto",
        descripcion: "Formato A4 abierto",
        tipo: "cantidad_fija",
        precios: [
            { cantidad: 100, precioBase: 70.72 },
            { cantidad: 250, precioBase: 85.15 },
            { cantidad: 500, precioBase: 98.91 },
            { cantidad: 1000, precioBase: 108.84 },
            { cantidad: 2500, precioBase: 150.17 },
            { cantidad: 5000, precioBase: 200.50 },
            { cantidad: 7500, precioBase: 245.90 },
            { cantidad: 10000, precioBase: 320.60 }
        ]
    },
    {
        key: "dipticos_a3",
        nombre: "Dípticos A3 Abierto",
        descripcion: "Formato A3 abierto",
        tipo: "cantidad_fija",
        precios: [
            { cantidad: 100, precioBase: 90.72 },
            { cantidad: 250, precioBase: 105.15 },
            { cantidad: 500, precioBase: 128.91 },
            { cantidad: 1000, precioBase: 158.84 },
            { cantidad: 2500, precioBase: 190.17 },
            { cantidad: 5000, precioBase: 320.50 },
            { cantidad: 7500, precioBase: 395.90 },
            { cantidad: 10000, precioBase: 420.60 }
        ]
    },

    // ========== VINILOS (por m²) ==========
    {
        key: "vinilos_corte",
        nombre: "Vinilos de Corte",
        descripcion: "Con transportador, hasta 60x40cm, 2 colores",
        tipo: "por_m2",
        precioPorM2: 55.00,
        precios: [] // No aplica para productos por m2
    },

    // ========== SOBRES CON VARIANTES ==========
    {
        key: "sobres_bolsa_1tinta",
        nombre: "Sobres Bolsa 26x36 cm - 1 Tinta",
        descripcion: "Sobres bolsa estándar - 1 Tinta",
        tipo: "cantidad_fija",
        precios: [
            { cantidad: 500, precioBase: 264.00 },
            { cantidad: 1000, precioBase: 450.00 },
            { cantidad: 2500, precioBase: 900.00 }
        ]
    },
    {
        key: "sobres_bolsa_2tintas",
        nombre: "Sobres Bolsa 26x36 cm - 2 Tintas",
        descripcion: "Sobres bolsa estándar - 2 Tintas",
        tipo: "cantidad_fija",
        precios: [
            { cantidad: 500, precioBase: 310.00 },
            { cantidad: 1000, precioBase: 520.00 },
            { cantidad: 2500, precioBase: 1050.00 }
        ]
    },
    {
        key: "sobres_bolsa_4tintas",
        nombre: "Sobres Bolsa 26x36 cm - 4 Tintas",
        descripcion: "Sobres bolsa estándar - 4 Tintas",
        tipo: "cantidad_fija",
        precios: [
            { cantidad: 500, precioBase: 440.00 },
            { cantidad: 1000, precioBase: 615.00 },
            { cantidad: 2500, precioBase: 1200.00 }
        ]
    },

    // ========== LONAS PVC (NUEVO) ==========
    {
        key: "lona-pvc-440-frontlit",
        nombre: "Lona PVC 440g Frontlit",
        descripcion: "Lona publicitaria resistente para exterior e interior",
        categoria: "Lonas PVC",
        tipo: "cantidad_fija",
        popular: true,
        ordenVisual: 1,
        precios: [
            { cantidad: 1, precioBase: 19.00, anchoCm: 100, altoCm: 100 },
            { cantidad: 1, precioBase: 29.00, anchoCm: 200, altoCm: 100 },
            { cantidad: 1, precioBase: 39.00, anchoCm: 200, altoCm: 150 },
            { cantidad: 1, precioBase: 45.00, anchoCm: 300, altoCm: 100 },
            { cantidad: 1, precioBase: 69.00, anchoCm: 300, altoCm: 200 }
        ]
    },
    {
        key: "lona-pvc-510-blockout",
        nombre: "Lona PVC 510g Blockout",
        descripcion: "Lona opaca ideal para impresión a doble cara",
        categoria: "Lonas PVC",
        tipo: "cantidad_fija",
        popular: true,
        ordenVisual: 2,
        precios: [
            { cantidad: 1, precioBase: 24.00, anchoCm: 100, altoCm: 100 },
            { cantidad: 1, precioBase: 39.00, anchoCm: 200, altoCm: 100 },
            { cantidad: 1, precioBase: 55.00, anchoCm: 200, altoCm: 150 },
            { cantidad: 1, precioBase: 89.00, anchoCm: 300, altoCm: 200 }
        ]
    },
    {
        key: "lona-pvc-mesh",
        nombre: "Lona PVC Mesh Microperforada",
        descripcion: "Ideal para fachadas y zonas con viento",
        categoria: "Lonas PVC",
        tipo: "cantidad_fija",
        popular: false,
        ordenVisual: 3,
        precios: [
            { cantidad: 1, precioBase: 22.00, anchoCm: 100, altoCm: 100 },
            { cantidad: 1, precioBase: 34.00, anchoCm: 200, altoCm: 100 },
            { cantidad: 1, precioBase: 49.00, anchoCm: 200, altoCm: 150 },
            { cantidad: 1, precioBase: 79.00, anchoCm: 300, altoCm: 200 }
        ]
    },
    {
        key: "lona-pvc-ojales",
        nombre: "Lona PVC con Oiales",
        descripcion: "Lona con oiales cada 50cm para facilitar instalación",
        categoria: "Lonas PVC",
        tipo: "cantidad_fija",
        popular: false,
        ordenVisual: 4,
        precios: [
            { cantidad: 1, precioBase: 25.00, anchoCm: 100, altoCm: 100, tipoAcabado: "Oiales" },
            { cantidad: 1, precioBase: 35.00, anchoCm: 200, altoCm: 100, tipoAcabado: "Oiales" },
            { cantidad: 1, precioBase: 45.00, anchoCm: 200, altoCm: 150, tipoAcabado: "Oiales" },
            { cantidad: 1, precioBase: 75.00, anchoCm: 300, altoCm: 200, tipoAcabado: "Oiales" }
        ]
    },
    {
        key: "lona-pvc-economica",
        nombre: "Lona PVC Económica",
        descripcion: "Ideal para campañas temporales",
        categoria: "Lonas PVC",
        tipo: "cantidad_fija",
        popular: true,
        ordenVisual: 0,
        precios: [
            { cantidad: 1, precioBase: 15.00, anchoCm: 100, altoCm: 100 },
            { cantidad: 1, precioBase: 25.00, anchoCm: 200, altoCm: 100 },
            { cantidad: 1, precioBase: 35.00, anchoCm: 200, altoCm: 150 },
            { cantidad: 1, precioBase: 59.00, anchoCm: 300, altoCm: 200 }
        ]
    }
]

/**
 * Función principal de seed
 */
async function main() {
    console.log("🌱 Iniciando seed de Visuarte Print Shop...")
    console.log("==========================================")

    // Limpiar datos existentes (opcional - comenta si quieres preservar datos)
    console.log("🗑️  Limpiando datos existentes...")
    await prisma.lead.deleteMany()
    await prisma.cotizacion.deleteMany()
    await prisma.productPrice.deleteMany()
    await prisma.product.deleteMany()

    // Insertar productos y precios
    console.log("📦 Insertando productos y precios...")

    for (const productData of productsData) {
        // Crear el producto
        const product = await prisma.product.create({
            data: {
                key: productData.key,
                nombre: productData.nombre,
                descripcion: productData.descripcion,
                categoria: (productData as any).categoria || null,
                tipo: productData.tipo,
                precioPorM2: productData.precioPorM2 || null,
                unidad: productData.tipo === "por_m2" ? "m²" : "uds",
                activo: (productData as any).activo !== false,
                popular: (productData as any).popular || false,
                ordenVisual: (productData as any).ordenVisual || 0
            }
        })

        console.log(`   ✅ Producto: ${product.nombre}`)

        // Insertar precios por cantidad
        if (productData.precios && productData.precios.length > 0) {
            for (const precio of productData.precios) {
                const precioAny = precio as any
                await prisma.productPrice.create({
                    data: {
                        productId: product.id,
                        cantidad: precioAny.cantidad,
                        precioBase: precioAny.precioBase,
                        variante: precioAny.variante || null,
                        anchoCm: precioAny.anchoCm || null,
                        altoCm: precioAny.altoCm || null,
                        tipoAcabado: precioAny.tipoAcabado || null
                    } as any
                })
            }
            console.log(`      📊 ${productData.precios.length} precios insertados`)
        } else {
            console.log(`      📊 Precio por m²: ${productData.precioPorM2}€/m²`)
        }
    }

    console.log("==========================================")
    console.log("✅ Seed completado exitosamente!")
    console.log(`   Total de productos: ${productsData.length}`)

    // Mostrar resumen
    const totalProducts = await prisma.product.count()
    const totalPrices = await prisma.productPrice.count()
    console.log(`   Productos en DB: ${totalProducts}`)
    console.log(`   Precios en DB: ${totalPrices}`)
}

/**
 * Manejo de errores
 */
main()
    .catch((e) => {
        console.error("❌ Error durante el seed:", e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
