// Seed script - ultra simple version
import postgres from 'postgres'
import * as dotenv from 'dotenv'

dotenv.config({ path: ".env" })

const sql = postgres(process.env.DATABASE_URL!, { ssl: 'require' })

async function seed() {
    console.log('🌱 Seeding...')

    // Clear
    await sql`DELETE FROM product_price`
    await sql`DELETE FROM product`
    console.log('Cleared')

    // Products list
    const products = [
        { key: 'tarjetas_clasicas', nombre: 'Tarjetas Clásicas', desc: 'Papel 350gr', tipo: 'cantidad_fija', cat: 'pequeño_formato' },
        { key: 'tarjetas_laminadas', nombre: 'Tarjetas Laminadas', desc: 'Con laminado', tipo: 'cantidad_fija', cat: 'pequeño_formato' },
        { key: 'tarjetas_exclusivas', nombre: 'Tarjetas Exclusivas', desc: 'Papel premium', tipo: 'cantidad_fija', cat: 'pequeño_formato' },
        { key: 'brochure_a4', nombre: 'Brochure A4', desc: 'Catálogos', tipo: 'cantidad_fija', cat: 'pequeño_formato' },
        { key: 'flyers_a5', nombre: 'Flyers A5', desc: 'Flyers', tipo: 'cantidad_fija', cat: 'pequeño_formato' },
        { key: 'flyers_a4', nombre: 'Flyers A4', desc: 'Flyers grande', tipo: 'cantidad_fija', cat: 'pequeño_formato' },
        { key: 'tripticos', nombre: 'Trípticos', desc: 'Trípticos', tipo: 'cantidad_fija', cat: 'pequeño_formato' },
        { key: 'dipticos', nombre: 'Dípticos', desc: 'Dípticos', tipo: 'cantidad_fija', cat: 'pequeño_formato' },
        { key: 'lona_frontlit', nombre: 'Lona Frontlit', desc: 'Lona exterior', tipo: 'por_m2', cat: 'gran_formato_flexible', precio: 7.00 },
        { key: 'lona_microperforada', nombre: 'Lona Microperforada', desc: 'Lona viento', tipo: 'por_m2', cat: 'gran_formato_flexible', precio: 7.00 },
        { key: 'vinilo_monomerico', nombre: 'Vinilo Monomérico', desc: 'Vinilo adhesivo', tipo: 'por_m2', cat: 'gran_formato_flexible', precio: 8.00 },
        { key: 'vinilo_transparente', nombre: 'Vinilo Transparente', desc: 'Vinilo cristal', tipo: 'por_m2', cat: 'gran_formato_flexible', precio: 10.00 },
        { key: 'lona_publicitaria', nombre: 'Lona Publicitaria', desc: 'Lona campañas', tipo: 'cantidad_fija', cat: 'gran_formato_flexible' },
        { key: 'pvc_forex', nombre: 'PVC Forex', desc: 'Placa PVC', tipo: 'por_m2', cat: 'gran_formato_rigido', precio: 9.00 },
        { key: 'metacrilato', nombre: 'Metacrilato', desc: 'Metacrilato', tipo: 'por_m2', cat: 'gran_formato_rigido', precio: 18.00 },
        { key: 'carton_compacto', nombre: 'Cartón Compacto', desc: 'Cartón rígido', tipo: 'por_m2', cat: 'gran_formato_rigido', precio: 4.50 },
        { key: 'dibond', nombre: 'Dibond', desc: 'Aluminio composite', tipo: 'por_m2', cat: 'gran_formato_rigido', precio: 22.00 },
        { key: 'tela_opaca', nombre: 'Tela Opaca', desc: 'Tela eventos', tipo: 'por_m2', cat: 'gran_formato_flexible', precio: 10.00 },
        { key: 'tela_luminosos', nombre: 'Tela Luminosos', desc: 'Backlight', tipo: 'por_m2', cat: 'gran_formato_flexible', precio: 19.00 },
        { key: 'photocall', nombre: 'Photocall', desc: 'Fondos foto', tipo: 'cantidad_fija', cat: 'gran_formato_flexible' },
        { key: 'carteleria', nombre: 'Cartelería', desc: 'Carteles', tipo: 'por_m2', cat: 'gran_formato_rigido', precio: 12.00 },
        { key: 'vinilos_suelo', nombre: 'Vinilos Suelo', desc: 'Antideslizante', tipo: 'por_m2', cat: 'gran_formato_flexible', precio: 15.00 },
        { key: 'bandera_gota', nombre: 'Bandera Gota', desc: 'Flag gota', tipo: 'cantidad_fija', cat: 'senaletica' },
        { key: 'banner_ala', nombre: 'Banner Ala', desc: 'Flag ala', tipo: 'cantidad_fija', cat: 'senaletica' },
    ]

    for (const p of products) {
        const result = await sql`
            INSERT INTO product (key, nombre, descripcion, tipo, unidad, category, material, "precioPorM2")
            VALUES (${p.key}, ${p.nombre}, ${p.desc}, ${p.tipo}, ${p.tipo === 'por_m2' ? 'm²' : 'uds'}, ${p.cat}, 'Material', ${p.precio || null})
            RETURNING id
        `
        const pid = result[0].id

        // Add prices for cantidad_fija
        if (p.tipo === 'cantidad_fija') {
            const precios = p.key === 'tarjetas_clasicas' ? [[250, 55.50], [500, 70.76], [1000, 90.05], [2500, 165.45]] :
                p.key === 'tarjetas_laminadas' ? [[250, 65], [500, 85], [1000, 115], [2500, 195]] :
                    p.key === 'tarjetas_exclusivas' ? [[250, 89], [500, 125], [1000, 189]] :
                        p.key === 'brochure_a4' ? [[100, 95], [250, 145], [500, 195], [1000, 295]] :
                            p.key === 'flyers_a5' ? [[100, 45], [250, 65], [500, 89], [1000, 135], [5000, 395]] :
                                p.key === 'flyers_a4' ? [[100, 65], [250, 95], [500, 135], [1000, 195]] :
                                    p.key === 'tripticos' ? [[100, 75], [250, 115], [500, 165], [1000, 245]] :
                                        p.key === 'dipticos' ? [[100, 65], [250, 95], [500, 145], [1000, 215]] :
                                            p.key === 'lona_publicitaria' ? [[1, 29.90], [2, 55], [5, 125]] :
                                                p.key === 'photocall' ? [[1, 136]] :
                                                    p.key === 'bandera_gota' ? [[1, 144], [2, 265]] :
                                                        p.key === 'banner_ala' ? [[1, 108], [2, 195]] : [[100, 50]]

            for (const [cant, prec] of precios) {
                await sql`INSERT INTO product_price ("productId", cantidad, "precioBase") VALUES (${pid}, ${cant}, ${prec})`
            }
        }

        console.log(`✓ ${p.nombre}`)
    }

    const count = await sql`SELECT COUNT(*) FROM product`
    console.log(`✅ Total: ${count[0].count} productos`)
}

seed().then(() => sql.end()).catch(e => { console.error(e); process.exit(1) })
