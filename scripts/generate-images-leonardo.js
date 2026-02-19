/**
 * 🎨 Script: Generar Imágenes de Productos con Leonardo.ai
 * 
 * Uso: node scripts/generate-images-leonardo.js
 * 
 * Requiere:
 * - LEONARDO_API_KEY en .env
 * - npm install axios
 */

import axios from 'axios';
import * as dotenv from 'dotenv';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));

// ============ CONFIGURACIÓN ============
const API_KEY = process.env.LEONARDO_API_KEY;
// Usar modelo por defecto de Leonardo
const MODEL_ID = undefined; // Déjar undefined para usar modelo por defecto
const OUTPUT_DIR = './public/images/products';

// Catalogo de productos con prompts
const PRODUCTS = [
    {
        key: 'tarjetas_clasicas',
        nombre: 'Tarjetas Clásicas',
        prompt: 'Professional product photography: stack of matte white business cards 85x55mm, arranged in staggered formation on light oak wood surface. Natural soft lighting from left angle creating delicate shadows. Paper has satin texture visible but no strong reflections. Selective focus: cards sharp, background blurred (bokeh). Style: Minimalist corporate, clean, professional. Dominant colors: ice white, beige wood, soft gray. No text, just product. 4:3 format, ultra high resolution.'
    },
    {
        key: 'tarjetas_laminadas',
        nombre: 'Tarjetas Laminadas',
        prompt: 'Professional product photography: business cards with matte and glossy lamination. Two sets: matte finish soft, glossy reflective. On white Carrara marble surface with subtle gray veins. Professional studio lighting, soft reflectors to avoid hotspots. Glossy lamination shows ambient light reflections. Style: Premium product, luxury, high-end corporate. Colors: pure white, marble white-gray, reflective accents. No text. 4:3 format.'
    },
    {
        key: 'tarjetas_exclusivas',
        nombre: 'Tarjetas Exclusivas',
        prompt: 'Product photography of premium business cards with special finishes. Showing embossed effect (relief), metallic gold edges, and eco craft paper texture. On black matte slate surface with side light creating texture shadows. One card has visible spot UV glossy detail. Controlled studio lighting to highlight relief and gold. Style: Exclusive luxury, artisanal, premium. Colors: matte black, metallic gold, natural cream. No text. 4:3 format.'
    },
    {
        key: 'brochure_21x10',
        nombre: 'Brochure 21x10.5',
        prompt: 'Professional photography of folded brochure elongated format (21x10.5cm closed). 350gr matte couché paper, white, showing clean central fold. On gray matte fabric surface with studio lighting. Brochure partially open showing white interior. Style: Corporate professional, clean. Colors: white, gray fabric, soft shadows. No content. 4:3 format.'
    },
    {
        key: 'flyers_a6',
        nombre: 'Flyers A6',
        prompt: 'Product photography of flyers A6 format (105x148mm) on light wood surface. 20 flyers distributed in aesthetically disordered pile as if falling. 135gr glossy couché paper, white. Natural window light from left side. Style: Advertising, dynamic, professional. Colors: white, beige-gold wood. No design. 4:3 format.'
    },
    {
        key: 'flyers_a5',
        nombre: 'Flyers A5',
        prompt: 'Professional photography of A5 flyers (148x210mm) on white marble surface. 5 flyers in artistic arrangement: one flat, others slightly tilted. 135gr matte couché paper, natural white. Soft studio lighting with large softbox. Style: Minimalist, clean, corporate. Colors: ice white, marble white-gray. No content. 4:3 format.'
    },
    {
        key: 'flyers_a4',
        nombre: 'Flyers A4',
        prompt: 'Product photography of A4 format flyer (210x297mm) on design desk surface. 135gr couché paper, white, showing weight and quality of material. Professional product lighting with two light sources. One corner intentionally folded to show grammage. Style: Editorial product, professional. Colors: white, gray shadows. No text. 4:3 format.'
    },
    {
        key: 'tripticos_a4',
        nombre: 'Trípticos A4',
        prompt: 'Photography of A4 format trifold brochure (3 panels) on white surface. 350gr matte paper, Z-folds perfect, no folding marks. Even lighting to avoid shadows on folds. Aerial view showing 3 panels evenly distributed. Style: Corporate, business presentation. Colors: pure white, minimal shadows. No content. 4:3 format.'
    },
    {
        key: 'tripticos_a3',
        nombre: 'Trípticos A3',
        prompt: 'Photography of A3 format trifolding brochure (large format) on meeting room table surface. Premium 350gr matte paper, white, with professional folds. Large size shows magnitude of product. Professional studio lighting, no reflections. Style: High-level corporate presentation. Colors: white, gray meeting table. No text. 4:3 or 16:9 format.'
    },
    {
        key: 'lona_frontlit',
        nombre: 'Lona Frontlit',
        prompt: 'Product photography of 450gr frontlit advertising banner mounted on aluminum frame for outdoor. Surface: semi-matte white PVC, showing underlying fabric texture. Lighting: direct sunlight showing surface and subtle reliefs. Environment: modern commercial building facade partially visible. Banner shows abstract geometric design (no text): blue and orange shapes. Style: Outdoor professional advertising, corporate. Colors: white banner, corporate blue, orange, gray building. No readable text. 4:3 format.'
    },
    {
        key: 'lona_backlit',
        nombre: 'Lona Backlit',
        prompt: 'Photography of backlit (retroilluminated) banner for lightbox. Translucent material allowing light passage, satin texture visible. Lighting: light from behind creating soft glow effect. Banner shows abstract graphic design in cold tones (blues, cyan, white). Environment: LED box light structure. Style: Premium lightbox, premium advertising. Colors: translucent white, cyan, dark blue. No text. 4:3 format.'
    },
    {
        key: 'lona_mesh',
        nombre: 'Lona Mesh',
        prompt: 'Photography of microperforated mesh banner for construction fencing. Mesh texture visible: uniform microperforation pattern. White surface with abstract design, background partially visible through holes. Environment: real construction fence, sun filtering through. Style: Construction advertising, practical. Colors: white, construction ochre tones. No text. 4:3 format.'
    },
    {
        key: 'vinilo_interior',
        nombre: 'Vinilo Interior',
        prompt: 'Product photography of transparent adhesive vinyl applied on window glass surface. Design: abstract geometric shapes in blue and white, applied without bubbles. Glass reflections visible, natural light coming through. Soft studio lighting showing transparency and adhesion. Style: Interior decoration, wall vinyl. Colors: transparent, blue, white, gray reflections. No text. 4:3 format.'
    },
    {
        key: 'vinilo_exterior',
        nombre: 'Vinilo Exterior',
        prompt: 'Product photography of long-lasting vinyl for exterior applied on metal surface (truck/car). White glossy vinyl with abstract corporate design. Shows durability: no bubbles, perfect adhesion. Outdoor sunny lighting, characteristic vehicle vinyl reflections. Style: Professional vehicle branding. Colors: white gloss, corporate blue, silver vehicle. No text. 4:3 format.'
    },
    {
        key: 'lona_pvc',
        nombre: 'Lona PVC',
        prompt: 'Product photography of resistant 500gr PVC banner for indoor and outdoor use. Material: laminated glossy PVC both sides, white. Professional banner texture visible, reinforced edges visible. Studio lighting showing weight and durability. Style: Technical-industrial product. Colors: white, studio grays. No print. 4:3 format.'
    },
    {
        key: 'forex',
        nombre: 'Forex',
        prompt: 'Product photography of 5mm Forex (foam PVC) panel. White color both sides, perfectly smooth surface. Clean cut with sharp edges (square edge). Two panels stacked showing thickness. Product photography lighting. Style: Advertising construction material. Colors: pure white, contrast shadows. 4:3 format.'
    },
    {
        key: 'metacrilato',
        nombre: 'Metacrilato',
        prompt: 'Product photography of 10mm clear acrylic (PMMA) sheet. Visible thickness, polished transparent edges. Characteristic acrylic reflections and transparencies. Studio lighting with edge highlights. Underlying object (logo/shape) partially visible through translucency. Style: Premium technical product. Colors: crystal, white reflections, shadows. 4:3 format.'
    },
    {
        key: 'carton_balsa',
        nombre: 'Cartón Balsa',
        prompt: 'Product photography of lightweight balsa cardboard for indoor displays. Natural beige surface, balsa wood texture visible. Thickness: 5mm, very light. Hot knife cut (slightly charred edges). Soft lighting for lightweight product. Style: Craft/premium material. Colors: natural beige, wood tones. 4:3 format.'
    },
    {
        key: 'rollup',
        nombre: 'Rollup',
        prompt: 'Professional photograph of Rollup system (deployable banner). Aluminum structure (silver), stable base, 85cm wide banner. Banner deployed showing matte lona surface with abstract design. Complete system front view. Style: Professional POP/POS material. Colors: aluminum, white banner, corporate accents. No text. 4:3 format.'
    },
    {
        key: 'panel_composite',
        nombre: 'Panel Composite',
        prompt: 'Product photography of 3mm Composite Panel (Aluminum Dibond). Structure: aluminum-PVC-aluminum, visible in side edge. White glossy surface (RAL 9003), perfectly smooth. Polished edge. Product photography lighting showing finishes. Style: Premium exterior signage. Colors: white, aluminum silver, grays. 4:3 format.'
    },
    {
        key: 'vinilo_perforado',
        nombre: 'Vinilo Perforado',
        prompt: 'Product photography of microperforated vinyl (one-way vision) applied on vehicle glass window. Perforation pattern visible at close range: evenly distributed tiny circles. Design visible from outside, complete transparency from inside. Applied on car side window. Outdoor sunny lighting. Style: Professional vehicle branding. Colors: white perforated, glass, vehicle color. No text. 4:3 format.'
    }
];

// ============ FUNCIONES API ============

/**
 * Genera una imagen usando Leonardo.ai
 */
async function generateImage(prompt, productKey) {
    console.log(`\n🎨 Generando imagen para: ${productKey}`);

    try {
        // Construir payload condicionalmente
        const payload = {
            prompt: prompt,
            width: 1024,
            height: 768, // 4:3 aspect ratio
            num_images: 1,
            guidance_scale: 7
        };

        // Solo incluir model_id si está definido
        if (MODEL_ID) {
            payload.model_id = MODEL_ID;
        }

        const response = await axios.post(
            'https://cloud.leonardo.ai/api/rest/v1/generations',
            payload,
            {
                headers: {
                    'Authorization': `Bearer ${API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        const generationId = response.data.generations[0].id;
        console.log(`   📝 Generation ID: ${generationId}`);

        return generationId;
    } catch (error) {
        console.error(`   ❌ Error generando imagen:`, error.response?.data || error.message);
        return null;
    }
}

/**
 * Espera a que la imagen esté lista y la descarga
 */
async function waitAndDownload(generationId, productKey, maxAttempts = 30) {
    console.log(`   ⏳ Esperando generación...`);

    for (let i = 0; i < maxAttempts; i++) {
        try {
            await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds

            const response = await axios.get(
                `https://cloud.leonardo.ai/api/rest/v1/generations/${generationId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${API_KEY}`
                    }
                }
            );

            const status = response.data.generations[0].status;

            if (status === 'COMPLETE') {
                const imageUrl = response.data.generations[0].generated_images[0].url;
                console.log(`   ✅ Imagen lista: ${imageUrl}`);
                return imageUrl;
            } else if (status === 'FAILED') {
                console.error(`   ❌ Generación fallida`);
                return null;
            }

            console.log(`   ⏳ Estado: ${status} (intento ${i + 1}/${maxAttempts})`);
        } catch (error) {
            console.error(`   ❌ Error verificando estado:`, error.message);
        }
    }

    console.error(`   ❌ Tiempo de espera agotado`);
    return null;
}

/**
 * Descarga la imagen y la guarda localmente
 */
async function downloadImage(imageUrl, productKey) {
    try {
        const response = await axios({
            url: imageUrl,
            method: 'GET',
            responseType: 'arraybuffer'
        });

        const filename = `${productKey}.png`;
        const filepath = join(OUTPUT_DIR, filename);

        // Ensure directory exists
        if (!existsSync(OUTPUT_DIR)) {
            mkdirSync(OUTPUT_DIR, { recursive: true });
        }

        writeFileSync(filepath, response.data);
        console.log(`   💾 Guardado: ${filepath}`);

        return filepath;
    } catch (error) {
        console.error(`   ❌ Error descargando imagen:`, error.message);
        return null;
    }
}

// ============ MAIN ============

async function main() {
    console.log('='.repeat(60));
    console.log('🎨 GENERADOR DE IMÁGENES - LEONARDO.AI');
    console.log('='.repeat(60));

    if (!API_KEY) {
        console.error('\n❌ Error: No se encontró LEONARDO_API_KEY en .env');
        console.log('   Añade tu API key al archivo .env:');
        console.log('   LEONARDO_API_KEY=tu_api_key_aqui');
        process.exit(1);
    }

    console.log(`\n✅ API Key configurada: ${API_KEY.substring(0, 10)}...`);
    console.log(`📁 Directorio de salida: ${OUTPUT_DIR}`);
    console.log(`📦 Productos a generar: ${PRODUCTS.length}\n`);

    const results = [];

    for (const product of PRODUCTS) {
        console.log(`\n${'='.repeat(50)}`);
        console.log(`Procesando: ${product.nombre} (${product.key})`);
        console.log('='.repeat(50));

        // Generar imagen
        const generationId = await generateImage(product.prompt, product.key);

        if (generationId) {
            // Esperar y descargar
            const imageUrl = await waitAndDownload(generationId, product.key);

            if (imageUrl) {
                const filepath = await downloadImage(imageUrl, product.key);
                results.push({
                    key: product.key,
                    nombre: product.nombre,
                    success: true,
                    filepath: filepath,
                    url: imageUrl
                });
            } else {
                results.push({
                    key: product.key,
                    nombre: product.nombre,
                    success: false,
                    error: 'Timeout esperando generación'
                });
            }
        } else {
            results.push({
                key: product.key,
                nombre: product.nombre,
                success: false,
                error: 'Error en generación'
            });
        }

        // Rate limiting: esperar entre generaciones
        console.log(`\n   ⏳ Esperando 10 segundos antes del siguiente...`);
        await new Promise(resolve => setTimeout(resolve, 10000));
    }

    // Resumen final
    console.log('\n' + '='.repeat(60));
    console.log('📊 RESUMEN');
    console.log('='.repeat(60));

    const successful = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;

    console.log(`✅ Exitosas: ${successful}/${PRODUCTS.length}`);
    console.log(`❌ Fallidas: ${failed}/${PRODUCTS.length}`);

    if (failed > 0) {
        console.log('\n❌ Productos fallidos:');
        results.filter(r => !r.success).forEach(r => {
            console.log(`   - ${r.nombre}: ${r.error}`);
        });
    }

    // Guardar resultados
    const resultsFile = join(__dirname, 'generation-results.json');
    writeFileSync(resultsFile, JSON.stringify(results, null, 2));
    console.log(`\n💾 Resultados guardados en: ${resultsFile}`);

    console.log('\n✨ Proceso completado!');
}

main().catch(console.error);
