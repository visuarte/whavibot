import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Starting seed...')

    // Limpiar DB
    await prisma.lead.deleteMany()
    await prisma.cotizacion.deleteMany()
    await prisma.productOption.deleteMany()
    await prisma.productPrice.deleteMany()
    await prisma.product.deleteMany()

    // ============ PEQUEÑO FORMATO ============

    // Tarjetas Clásicas
    await prisma.product.create({
        data: {
            key: "tarjetas_clasicas",
            nombre: "Tarjetas de Visita Clásicas (85x55 mm, Sin Laminar)",
            descripcion: "Papel estándar sin laminar",
            tipo: "cantidad_fija",
            unidad: "uds",
            categoria: "pequeño_formato",
            material: "Papel 350 gr",
            prices: {
                create: [
                    { cantidad: 250, precioBase: 55.50 },
                    { cantidad: 500, precioBase: 70.76 },
                    { cantidad: 1000, precioBase: 90.05 },
                    { cantidad: 2500, precioBase: 165.45 },
                ],
            },
        },
    })

    // Tarjetas Laminadas
    await prisma.product.create({
        data: {
            key: "tarjetas_laminadas",
            nombre: "Tarjetas de Visita Laminadas (85x55 mm)",
            descripcion: "Papel couché con laminado brillante",
            tipo: "cantidad_fija",
            unidad: "uds",
            categoria: "pequeño_formato",
            material: "Papel 350 gr + Laminado",
            prices: {
                create: [
                    { cantidad: 250, precioBase: 65.00 },
                    { cantidad: 500, precioBase: 85.00 },
                    { cantidad: 1000, precioBase: 115.00 },
                    { cantidad: 2500, precioBase: 195.00 },
                ],
            },
        },
    })

    // Tarjetas Exclusivas
    await prisma.product.create({
        data: {
            key: "tarjetas_exclusivas",
            nombre: "Tarjetas de Visita Exclusivas (85x55 mm)",
            descripcion: "Papel offset premium con acabados especiales",
            tipo: "cantidad_fija",
            unidad: "uds",
            categoria: "pequeño_formato",
            material: "Papel Premium 400 gr",
            prices: {
                create: [
                    { cantidad: 250, precioBase: 89.00 },
                    { cantidad: 500, precioBase: 125.00 },
                    { cantidad: 1000, precioBase: 189.00 },
                ],
            },
        },
    })

    // Brochure A4
    await prisma.product.create({
        data: {
            key: "brochure_a4",
            nombre: "Brochure / Catálogo A4",
            descripcion: "Pliegues: 2 (tríptico) o 3",
            tipo: "cantidad_fija",
            unidad: "uds",
            categoria: "pequeño_formato",
            material: "Papel 135 gr couché",
            prices: {
                create: [
                    { cantidad: 100, precioBase: 95.00 },
                    { cantidad: 250, precioBase: 145.00 },
                    { cantidad: 500, precioBase: 195.00 },
                    { cantidad: 1000, precioBase: 295.00 },
                ],
            },
        },
    })

    // Flyers A5
    await prisma.product.create({
        data: {
            key: "flyers_a5",
            nombre: "Flyers A5 (14.8x21 cm)",
            descripcion: "Flyers publicitarios",
            tipo: "cantidad_fija",
            unidad: "uds",
            categoria: "pequeño_formato",
            material: "Papel 135 gr couché",
            prices: {
                create: [
                    { cantidad: 100, precioBase: 45.00 },
                    { cantidad: 250, precioBase: 65.00 },
                    { cantidad: 500, precioBase: 89.00 },
                    { cantidad: 1000, precioBase: 135.00 },
                    { cantidad: 5000, precioBase: 395.00 },
                ],
            },
        },
    })

    // Flyers A4
    await prisma.product.create({
        data: {
            key: "flyers_a4",
            nombre: "Flyers A4 (21x29.7 cm)",
            descripcion: "Flyers publicitarios formato grande",
            tipo: "cantidad_fija",
            unidad: "uds",
            categoria: "pequeño_formato",
            material: "Papel 135 gr couché",
            prices: {
                create: [
                    { cantidad: 100, precioBase: 65.00 },
                    { cantidad: 250, precioBase: 95.00 },
                    { cantidad: 500, precioBase: 135.00 },
                    { cantidad: 1000, precioBase: 195.00 },
                ],
            },
        },
    })

    // Trípticos
    await prisma.product.create({
        data: {
            key: "tripticos",
            nombre: "Trípticos (A4 pliegues)",
            descripcion: "Trípticos publicitarios",
            tipo: "cantidad_fija",
            unidad: "uds",
            categoria: "pequeño_formato",
            material: "Papel 135 gr couché",
            prices: {
                create: [
                    { cantidad: 100, precioBase: 75.00 },
                    { cantidad: 250, precioBase: 115.00 },
                    { cantidad: 500, precioBase: 165.00 },
                    { cantidad: 1000, precioBase: 245.00 },
                ],
            },
        },
    })

    // Dípticos
    await prisma.product.create({
        data: {
            key: "dipticos",
            nombre: "Dípticos (A4 pliegues)",
            descripcion: "Dípticos publicitarios",
            tipo: "cantidad_fija",
            unidad: "uds",
            categoria: "pequeño_formato",
            material: "Papel 135 gr couché",
            prices: {
                create: [
                    { cantidad: 100, precioBase: 65.00 },
                    { cantidad: 250, precioBase: 95.00 },
                    { cantidad: 500, precioBase: 145.00 },
                    { cantidad: 1000, precioBase: 215.00 },
                ],
            },
        },
    })

    // ============ GRAN FORMATO FLEXIBLE ============

    // Lona Frontlit
    await prisma.product.create({
        data: {
            key: "lona_frontlit",
            nombre: "Lona Frontlit",
            descripcion: "Lona publicitaria para exteriores, resistente UV e intemperie",
            tipo: "por_m2",
            precioPorM2: 7.00,
            unidad: "m²",
            categoria: "gran_formato_flexible",
            material: "PVC Frontlit 400 µ",
        },
    })

    // Lona Microperforada
    await prisma.product.create({
        data: {
            key: "lona_microperforada",
            nombre: "Lona Microperforada",
            descripcion: "Lona con agujeros para viento, ideal para fachadas",
            tipo: "por_m2",
            precioPorM2: 7.00,
            unidad: "m²",
            categoria: "gran_formato_flexible",
            material: "Microperforado PVC",
        },
    })

    // Vinilo Monomérico
    await prisma.product.create({
        data: {
            key: "vinilo_monomerico",
            nombre: "Vinilo Monomérico",
            descripcion: "Vinilo adhesivo para interiores y exteriores cortos",
            tipo: "por_m2",
            precioPorM2: 8.00,
            unidad: "m²",
            categoria: "gran_formato_flexible",
            material: "Vinilo Monomérico",
        },
    })

    // Vinilo Transparente
    await prisma.product.create({
        data: {
            key: "vinilo_transparente",
            nombre: "Vinilo Transparente",
            descripcion: "Vinilo cristal transparente",
            tipo: "por_m2",
            precioPorM2: 10.00,
            unidad: "m²",
            categoria: "gran_formato_flexible",
            material: "Vinilo Transparente",
        },
    })

    // Lona Publicitaria
    await prisma.product.create({
        data: {
            key: "lona_publicitaria",
            nombre: "Lona Publicitaria",
            descripcion: "Lona de gran formato para campañas",
            tipo: "cantidad_fija",
            unidad: "uds",
            categoria: "gran_formato_flexible",
            material: "PVC 450 gr",
            prices: {
                create: [
                    { cantidad: 1, precioBase: 29.90 },
                    { cantidad: 2, precioBase: 55.00 },
                    { cantidad: 5, precioBase: 125.00 },
                ],
            },
        },
    })

    // ============ GRAN FORMATO RÍGIDO ============

    // PVC Forex
    await prisma.product.create({
        data: {
            key: "pvc_forex",
            nombre: "PVC Forex",
            descripcion: "Placa de PVC expandido ligero",
            tipo: "por_m2",
            precioPorM2: 9.00,
            unidad: "m²",
            categoria: "gran_formato_rigido",
            material: "PVC Forex 5mm",
        },
    })

    // Metacrilato
    await prisma.product.create({
        data: {
            key: "metacrilato",
            nombre: "Metacrilato",
            descripcion: "Placas de metacrilato transparente o blanco",
            tipo: "por_m2",
            precioPorM2: 18.00,
            unidad: "m²",
            categoria: "gran_formato_rigido",
            material: "Metacrilato 3mm",
        },
    })

    // Cartón Compacto
    await prisma.product.create({
        data: {
            key: "carton_compacto",
            nombre: "Cartón Compacto",
            descripcion: "Cartón rigido para displays",
            tipo: "por_m2",
            precioPorM2: 4.50,
            unidad: "m²",
            categoria: "gran_formato_rigido",
            material: "Cartón Compacto 1.5mm",
        },
    })

    // Dibond
    await prisma.product.create({
        data: {
            key: "dibond",
            nombre: "Dibond (Aluminio Composite)",
            descripcion: "Placa de aluminio sandwich",
            tipo: "por_m2",
            precioPorM2: 22.00,
            unidad: "m²",
            categoria: "gran_formato_rigido",
            material: "Dibond 3mm",
        },
    })

    // ============ PRODUCTOS ESPECIALES ============

    // Tela Opaca
    await prisma.product.create({
        data: {
            key: "tela_opaca",
            nombre: "Tela Opaca",
            descripcion: "Tela para eventos y ferias",
            tipo: "por_m2",
            precioPorM2: 10.00,
            unidad: "m²",
            categoria: "gran_formato_flexible",
            material: "Tela Polyester 180gr",
        },
    })

    // Tela Luminosos
    await prisma.product.create({
        data: {
            key: "tela_luminosos",
            nombre: "Tela para Luminosos",
            descripcion: "Tela translúcida para backlight",
            tipo: "por_m2",
            precioPorM2: 19.00,
            unidad: "m²",
            categoria: "gran_formato_flexible",
            material: "Tela Backlight 220gr",
        },
    })

    // Photocall
    await prisma.product.create({
        data: {
            key: "photocall",
            nombre: "Photocall",
            descripcion: "Fondos para fotografía eventos",
            tipo: "cantidad_fija",
            unidad: "uds",
            categoria: "gran_formato_flexible",
            material: "Tela Lycra",
            prices: {
                create: [
                    { cantidad: 1, precioBase: 136.00 },
                ],
            },
        },
    })

    // Cartelería
    await prisma.product.create({
        data: {
            key: "carteleria",
            nombre: "Cartelería",
            descripcion: "Carteles publicitarios rígidos",
            tipo: "por_m2",
            precioPorM2: 12.00,
            unidad: "m²",
            categoria: "gran_formato_rigido",
            material: "PVC Semi-rígido",
        },
    })

    // Vinilos Suelo
    await prisma.product.create({
        data: {
            key: "vinilos_suelo",
            nombre: "Vinilos Suelo",
            descripcion: "Vinilos antideslizantes para suelo",
            tipo: "por_m2",
            precioPorM2: 15.00,
            unidad: "m²",
            categoria: "gran_formato_flexible",
            material: "Vinilo Suelo Antideslizante",
        },
    })

    // ============ BANDERAS Y SEÑALÉTICA ============

    // Bandera Gota
    await prisma.product.create({
        data: {
            key: "bandera_gota",
            nombre: "Bandera Gota",
            descripcion: "Flag publicitario forma gota",
            tipo: "cantidad_fija",
            unidad: "uds",
            categoria: "senaletica",
            material: "Tela Polyester",
            prices: {
                create: [
                    { cantidad: 1, precioBase: 144.00 },
                    { cantidad: 2, precioBase: 265.00 },
                ],
            },
        },
    })

    // Banner Ala
    await prisma.product.create({
        data: {
            key: "banner_ala",
            nombre: "Banner Ala",
            descripcion: "Flag publicitario forma ala",
            tipo: "cantidad_fija",
            unidad: "uds",
            categoria: "senaletica",
            material: "Tela Polyester",
            prices: {
                create: [
                    { cantidad: 1, precioBase: 108.00 },
                    { cantidad: 2, precioBase: 195.00 },
                ],
            },
        },
    })

    console.log('✅ Seed completado!')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
