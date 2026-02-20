/**
 * Script para agregar productos de gran formato a la BD
 * npx ts-node scripts/seed-gran-formato.ts
 */

import { PrismaClient } from "@prisma/client"
import { Decimal } from "@prisma/client/runtime/library"

const prisma = new PrismaClient()

async function main() {
    console.log("🎨 Agregando productos de gran formato...")

    // Lona Flexible
    const lonaFlexible = await prisma.product.upsert({
        where: { key: "lona_flexible_pvc" },
        update: {},
        create: {
            key: "lona_flexible_pvc",
            nombre: "Lona Flexible PVC",
            descripcion: "Lona publicitaria flexible de PVC - Configura ancho y alto en centímetros",
            imagen: "",
            tipo: "gran_formato",
            precioPorM2: new Decimal("7.50"),
            unidad: "m²",
            category: "gran_formato_flexible",
            materialType: "flexible",
            anchoMinCm: 10,
            anchoMaxCm: 500,
            altoMinCm: 10,
            altoMaxCm: 500,
            anchoRecomendadoCm: 300,
            altoRecomendadoCm: 200,
            material: "PVC 440g/m² ignífugo"
        }
    })

    console.log("✅ Lona Flexible creada:", lonaFlexible.nombre)

    // Foam Rígido
    const foamRigido = await prisma.product.upsert({
        where: { key: "foam_board_5mm" },
        update: {},
        create: {
            key: "foam_board_5mm",
            nombre: "Foam Board 5mm Rígido",
            descripcion: "Panel de espuma rígida de 5mm - Configura ancho y alto en centímetros",
            imagen: "",
            tipo: "gran_formato",
            precioPorM2: new Decimal("8.99"),
            unidad: "m²",
            category: "gran_formato_rigido",
            materialType: "rigido",
            anchoMinCm: 20,
            anchoMaxCm: 400,
            altoMinCm: 20,
            altoMaxCm: 400,
            anchoRecomendadoCm: 120,
            altoRecomendadoCm: 80,
            material: "Espuma de poliestireno 5mm"
        }
    })

    console.log("✅ Foam Board creado:", foamRigido.nombre)

    // Dibond Rígido
    const dibond = await prisma.product.upsert({
        where: { key: "dibond_3mm" },
        update: {},
        create: {
            key: "dibond_3mm",
            nombre: "Dibond 3mm Rígido Premium",
            descripcion: "Panel de aluminio compuesto Dibond 3mm - Configura ancho y alto en centímetros",
            imagen: "",
            tipo: "gran_formato",
            precioPorM2: new Decimal("15.50"),
            unidad: "m²",
            category: "gran_formato_rigido",
            materialType: "rigido",
            anchoMinCm: 30,
            anchoMaxCm: 350,
            altoMinCm: 30,
            altoMaxCm: 350,
            anchoRecomendadoCm: 120,
            altoRecomendadoCm: 80,
            material: "Aluminio compuesto 3mm (blanco)"
        }
    })

    console.log("✅ Dibond Premium creado:", dibond.nombre)

    console.log("\n✨ Productos de gran formato agregados correctamente!")
    console.log("\n📊 Resumen:")
    console.log(`  - Lona Flexible: €${lonaFlexible.precioPorM2}/m²`)
    console.log(`  - Foam Board: €${foamRigido.precioPorM2}/m²`)
    console.log(`  - Dibond: €${dibond.precioPorM2}/m²`)
}

main()
    .catch((e) => {
        console.error("❌ Error:", e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
