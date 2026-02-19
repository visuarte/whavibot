# 📸 Plan: Generación de Imágenes de Productos con MiniMax M2.5

## 🎯 Objetivo
Generar 21 imágenes profesionales de alta calidad para el catálogo de Visuarte Print Shop usando **MiniMax M2.5** (o compatible) con prompts optimizados para cada producto.

---

## 📦 Catálogo de Productos (21 items)

| # | Key | Producto | Categoría | Tipo |
|---|-----|----------|-----------|------|
| 1 | tarjetas_clasicas | Tarjetas de Visita Clásicas | Pequeño Formato | 85x55mm, sin laminar |
| 2 | tarjetas_laminadas | Tarjetas Laminadas | Pequeño Formato | 85x55mm, mate/brillo |
| 3 | tarjetas_exclusivas | Tarjetas Acabados Exclusivos | Pequeño Formato | 85x55mm, especiales |
| 4 | brochure_21x10 | Brochure 21x10.5 | Pequeño Formato | Alargado, 350gr |
| 5 | flyers_a6 | Flyers A6 | Pequeño Formato | 105x148mm, 135gr |
| 6 | flyers_a5 | Flyers A5 | Pequeño Formato | 148x210mm, 135gr |
| 7 | flyers_a4 | Flyers A4 | Pequeño Formato | 210x297mm, 135gr |
| 8 | tripticos_a4 | Trípticos A4 Abierto | Pequeño Formato | Formato A4 |
| 9 | tripticos_a3 | Trípticos A3 Abierto | Pequeño Formato | Formato A3 |
| 10 | lona_frontlit | Lona Frontlit | Gran Formato | 450gr, exterior |
| 11 | lona_backlit | Lona Backlit | Gran Formato | Iluminación posterior |
| 12 | lona_mesh | Lona Mesh | Gran Formato | Microperforada |
| 13 | vinilo_interior | Vinilo Interior | Gran Formato | Adhesivo pared |
| 14 | vinilo_exterior | Vinilo Exterior | Gran Formato | Resistente UV |
| 15 | lona_pvc | Lona PVC | Gran Formato | Resistente int/ext |
| 16 | forex | Forex | Gran Formato | Panel rígido 5mm |
| 17 | metacrilato | Metacrilato | Gran Formato | Plástico transparente |
| 18 | carton_balsa | Cartón Balsa | Gran Formato | Ligero, indoor |
| 19 | rollup | Rollup | Gran Formato | Display portátil |
| 20 | panel_composite | Panel Composite | Gran Formato | Aluminum dibond |
| 21 | vinilo_perforado | Vinilo Perforado | Gran Formato | Mirilla vehículos |

---

## 🎨 Guía de Estilo Visual Unificado

### Paleta de Colores Corporativa
- **Primario:** Blanco (#FFFFFF)
- **Secundario:** Azul corporativo (#1E3A5F)
- **Acentos:** Naranja (#FF6B35), Dorado (#C9A227)

### Ambientación
- **Fondo:** Gradiente suave gris-blanco o superficie de madera clara
- **Iluminación:** Luz natural suave, 45° desde izquierda
- **Estilo:** Minimalista, clean, profesional
- **Resolución:** 4:3 o 1:1, mínimo 2048x1536px

### Elementos en Común
- Superficies neutras (madera clara, mármol blanco, tela gris)
- Sombras suaves sutiles
- Sin texto en las imágenes (solo producto)
- Ángulo: 3/4 o frontal para pequeño formato

---

## 🚀 Prompts Optimizados para MiniMax M2.5

### ===== PEQUEÑO FORMATO =====

#### 1. Tarjetas Clásicas (tarjetas_clasicas)

```
PROMPT PRINCIPAL:

"Fotografía de producto profesional: conjunto de tarjetas de visita blancas mate de 85x55mm, 
dispuestas en formación escalonada sobre superficie de madera de roble claro. 
Iluminación natural suave desde ángulo izquierdo creando sombras delicadas.
El papel tiene textura satinada visible pero sin reflejos fuertes.
Enfoque selectivo: tarjetas nítidas, fondo desenfocado (bokeh).
Estilo: Minimalista corporativo,干净, profesional.
Colores dominantes: blanco hielo, madera beige, gris suave.
Sin texto, solo el producto. Formato 4:3, resolución ultra alta."

VARIANTES:
- "una sola tarjeta plana vue desde arriba (vista aérea)"
- "tres tarjetas apiladas ligeramente desplazadas"
- "tarjetas de pie contra una superficie vertical"
```

#### 2. Tarjetas Laminadas (tarjetas_laminadas)

```
PROMPT PRINCIPAL:

"Fotografía profesional de tarjetas de visita con laminado mate y brillo. 
Dos conjuntos: uno con acabado mate suave, otro con laminado brillante reflectante.
Sobre superficie de mármol blanco Carrara con vetas grises sutiles.
Luz de estudio profesional, reflectores suaves para evitar hotspots.
El laminado brillante muestra reflejos de luz ambiental.
Estilo: Producto premium, lujo, corporativo de alta gama.
Colores: blanco puro, mármol blanco-gris, acentos reflectantes.
Sin texto. Formato 4:3."

VARIANTES:
- "laminado mate con efecto soft-touch visible"
- "laminado brillo con reflejos dramáticos"
- "comparación lado a lado mate vs brillo"
```

#### 3. Tarjetas Exclusivas (tarjetas_exclusivas)

```
PROMPT PRINCIPAL:

"Fotografía de tarjetas de visita premium con acabados especiales. 
Muestran efecto gofrado (relieve), bordes dorados metálicos, y textura de papel craft ecológico.
Sobre superficie de pizarra negra-mate con luz lateral creando textura de sombras.
Una tarjeta tiene detalle de spot UV brillante visible.
Iluminación de estudio controlada para resaltar relieve y dorados.
Estilo: Lujo exclusivo, artesanales, premium.
Colores: negro mate, dorado metálico, crema natural.
Sin texto. Formato 4:3."

VARIANTES:
- "detalle macro del borde dorado"
- "tarjeta con relieve gofrado visible en ángulo"
- "textura de papel craft close-up"
```

#### 4. Brochure 21x10.5 (brochure_21x10)

```
PROMPT PRINCIPAL:

"Fotografía profesional de brochure doblado formato alargado (21x10.5cm cerrado).
Papel couché mate de 350gr, color blanco, mostrando pliegue central limpio.
Sobre superficie de tela gris-mate con iluminación de estudio.
El brochure está parcialmente abierto mostrando interior en blanco.
Estilo: Corporativo profesional, clean.
Colores: blanco, gris tela, sombras suaves.
Sin texto. Formato 4:3."

VARIANTES:
- "brochure cerrado vue frontal"
- "brochure abierto mostrando las dos caras"
- "dos brochures apilados vue lateral"
```

#### 5. Flyers A6 (flyers_a6)

```
PROMPT PRINCIPAL:

"Fotografía de flyers formato A6 (105x148mm) sobre superficie de madera clara.
20 flyers distribuidos en pile desordenado pero estético, como si se dejaran caer.
Papel couché 135gr brillo, color blanco.
Iluminación natural de ventana lateral izquierda.
Estilo: Publicitario, dinámico, profesional.
Colores: blanco, madera beige-oro.
Sin diseño. Formato 4:3."

VARIANTES:
- "un solo flyer vue superior"
- "pile ordenado de 10 flyers"
- "flyers en mano (esquina visible)"
```

#### 6. Flyers A5 (flyers_a5)

```
PROMPT PRINCIPAL:

"Fotografía profesional de flyers A5 (148x210mm) sobre superficie de mármol blanco.
5 flyers en disposición artística: uno plano, otros ligeramente inclinados.
Papel couché 135gr mate, blanco natural.
Luz de estudio suave con softbox grande.
Estilo: Minimalista, limpio, corporativo.
Colores: blanco hielo, mármol blanco-gris.
Sin contenido. Formato 4:3."

VARIANTES:
- "flyer individuales vue frontal"
- "serie de 3 tamaños A6, A5, A4 juntos"
- "flyer sostenido contra luz (translucidez)"
```

#### 7. Flyers A4 (flyers_a4)

```
PROMPT PRINCIPAL:

"Fotografía de flyer formato A4 (210x297mm) sobre superficie de escritorio de diseño.
Papel couché 135gr, blanco, mostrando peso y calidad del material.
Iluminación profesional de producto con dos fuentes de luz.
Una esquina doblada intencionalmente para mostrar gramaje.
Estilo: Producto editorial, profesional.
Colores: blanco, sombras grises.
Sin texto. Formato 4:3."

VARIANTES:
- "flyer vue superior completo"
- "comparación de gramajes (135gr vs 300gr)"
- "flyer en contexto de escritorio"
```

#### 8. Trípticos A4 (tripticos_a4)

```
PROMPT PRINCIPAL:

"Fotografía de tríptico formato A4 abierto (3 cuerpos) sobre superficie blanca.
Papel 350gr mate, pliegues en Z perfectos, sin marcas de doblado.
Iluminación evenly spread para evitar sombras en pliegues.
Vista aérea mostrando los 3 paneles равнomerly distribuidos.
Estilo: Corporativo, presentación empresarial.
Colores: blanco puro, sombras mínimas.
Sin contenido. Formato 4:3."

VARIANTES:
- "tríptico cerrado vue frontal"
- "tríptico abierto en ángulo 3/4"
- "tríptico mostrando un panel hacia cámara"
```

#### 9. Trípticos A3 (tripticos_a3)

```
PROMPT PRINCIPAL:

"Fotografía de tríptico formato A3 abierto (formato grande) sobre superficie de mesa de reuniones.
Papel premium 350gr, blanco mate, con pliegues profesionales.
El tamaño grande muestra la magnitud del producto.
Iluminación de estudio profesional, sin reflejos.
Estilo: Presentación corporativa de alto nivel.
Colores: blanco, gris superficie de reunión.
Sin texto. Formato 4:3 o 16:9."

VARIANTES:
- "tríptico A3 cerrado"
- "tríptico A3 contra pared (como墙纸)"
- "comparación A3 vs A4"
```

---

### ===== GRAN FORMATO =====

#### 10. Lona Frontlit (lona_frontlit)

```
PROMPT PRINCIPAL:

"Fotografía de lona publicitaria frontlit de 450gr montada en marco de aluminio para exterior.
Superficie: PVC blanco con acabado semi-mate, muestra textura de tejido subyacente.
Iluminación: Luz solar directa mostrando la superficie y sus relieves sutiles.
Entorno: Fachada de edificio comercial moderno, parcialmente visible.
La lona muestra diseño abstracto (no texto): formas geométricas azules y naranjas.
Estilo: Publicidad exterior profesional, corporativo.
Colores: blanco lona, azul corporativo, naranja仲, edificio gris.
Sin texto legible. Formato 4:3."

VARIANTES:
- "detalle de los ollets (ojales) de sujeción"
- "lona vue de cerca mostrando textura"
- "lona montada vista completa fachada"
```

#### 11. Lona Backlit (lona_backlit)

```
PROMPT PRINCIPAL:

"Fotografía de lona backlit (retroiluminada) para cartel luminoso.
Material translúcido permitiendo paso de luz, textura satinada visible.
Iluminación: Luz desde detrás creando efecto de glow suave.
La lona muestra diseño gráfico abstracto en tonos fríos (azules, Cian, blanco).
Entorno: Estructura de светодиодный box lite.
Estilo: Cartel luminoso premium, publicidad premium.
Colores: blanco translúcido, cyan, azul oscuro.
Sin texto. Formato 4:3."

VARIANTES:
- "efecto de luz encendida vs apagada"
- "detalle de la estructura de soporte"
- "vue desde ángulo mostrando translucidez"
```

#### 12. Lona Mesh (lona_mesh)

```
PROMPT PRINCIPAL:

"Fotografía de lona mesh (microperforada) para vallado de строительство.
Textura de mesh visible: patrón de microperforaciones uniforme.
Superficie blanca con diseño abstracto, parcialmente visible el fondo a través de los agujeros.
Entorno: Vallado de obra real, sol filtrándose.
Estilo: Publicidad de строительство, práctica.
Colores: blanco, tonos de construcción ocres.
Sin texto. Formato 4:3."

VARIANTES:
- "close-up de la microperforación"
- "mesh en viento (efecto wave)"
- "comparación mesh vs lona sólida"
```

#### 13. Vinilo Interior (vinilo_interior)

```
PROMPT PRINCIPAL:

"Fotografía de vinilo adhesivo transparente aplicado sobre superficie de cristal de ventana.
Diseño: formas geométricas abstractas en azul y blanco, aplicado sin burbujas.
Reflejos del cristal visibles, luz natural entrando.
Iluminación de estudio soft mostrando transparencia y adherencia.
Estilo: Decoración interior, vinilo pared.
Colores: transparente, azul, blanco, reflejos grises.
Sin texto. Formato 4:3."

VARIANTES:
- "detalle de esquina mostrando pegado"
- "aplicación sobre pared de ladrillo"
- "aplicación sobre muebles (madera)"
```

#### 14. Vinilo Exterior (vinilo_exterior)

```
PROMPT PRINCIPAL:

"Fotografía de vinilo de larga duración para exterior aplicado sobre superficie metálica (camión/carrocería).
Vinilo blanco brillante con diseño corporativo abstracto.
Muestra durabilidad: sin burbujas, aderencia perfecta.
Iluminación exterior soleada, reflejos característicos de vinilo de auto.
Estilo: Rotulación vehicular profesional.
Colores: blanco brillo, azul corporativo, plata vehículo.
Sin texto. Formato 4:3."

VARIANTES:
- "detalle de curvas del vehículo"
- "aplicación sobre cristal (ventana)"
- "comparación brillante vs mate"
```

#### 15. Lona PVC (lona_pvc)

```
PROMPT PRINCIPAL:

"Fotografía de lona PVC resistente 500gr para uso interior y exterior.
Material: PVC laminado brillante ambos lados, white.
Textura profesional de lona industrial, bordes reforzados visibles.
Iluminación de estudio mostrando peso y durabilidad.
Estilo: Producto técnico-industrial.
Colores: blanco, grises de estudio.
Sin impresión. Formato 4:3."

VARIANTES:
- "detalle de esquinas reforzadas"
- "lona enrollada mostrando el rollo"
- "lona tensada en marco display"
```

#### 16. Forex (forex)

```
PROMPT PRINCIPAL:

"Fotografía de panel Forex (foam PVC) de 5mm de grosor.
Color blanco por ambos lados, superficie perfectly lisa.
Corte limpio con cantos vivos (square edge).
Dos paneles apilados mostrando el espesor.
Iluminación de producto técnico.
Estilo: Material de construcción publicitario.
Colores: blanco puro, sombras contraste.
Formato 4:3."

VARIANTES:
- "panel colgado vue lateral mostrando薄espesor"
- "panel con diseño aplicado (ejemplo)"
- "múltiples espesores (3mm, 5mm, 10mm)"
```

#### 17. Metacrilato (metacrilato)

```
PROMPT PRINCIPAL:

"Fotografía de plancha de metacrilato (PMMA) cristal transparente de 10mm.
Espesor visible, bordes pulidos transparente.
Reflejos y transparencias característico del acrílico.
Iluminación de estudio con highlights en bordes.
Objeto subyacente (logo/forma) parcialmente visible por translucidez.
Estilo: Producto técnico premium.
Colores: cristal, reflejos blancos, sombras.
Formato 4:3."

VARIANTES:
- "metacrilato blanco opal (lechoso)"
- "metacrilato de colores (azul, rojo)"
- "pieza tallada/curvada"
```

#### 18. Cartón Balsa (carton_balsa)

```
PROMPT PRINCIPAL:

"Fotografía de cartón balsa (lightweight) para indoor displays.
Superficie beige natural, textura de madera de balsa visible.
Espesor: 5mm, muy ligero.
Corte con cuchillo caliente (bordes slightly charred).
Iluminación soft para producto liviano.
Estilo: Material de manualidades/premium.
Colores: beige natural, tonos madera.
Formato 4:3."

VARIANTES:
- "panel de balsa con imprimación blanca"
- "estructura de balsa ensamblada"
- "comparación con cartón corrugado"
```

#### 19. Rollup (rollup)

```
PROMPT PRINCIPAL:

"Fotografía de sistema Rollup (banner desplegable) profesionales.
Estructura de aluminio (plata), base稳固, banner de 85cm de ancho.
El banner está desplegado mostrando superficie de lona mate con diseño abstracto.
Sistema completo vue frontal.
Estilo: Material POP/POS profesional.
Colores: aluminio, blanco banner, acentos corporativos.
Sin texto. Formato 4:3."

VARIANTES:
- "rollup retracted (dentro del carcasa)"
- "detalle del mecanismo de cierre"
- "rollup en uso en stand de feria"
```

#### 20. Panel Composite (panel_composite)

```
PROMPT PRINCIPAL:

"Fotografía de panel Composite (Aluminum Dibond) de 3mm.
Estructura: aluminum-PVC-aluminio, visible en canto lateral.
Superficie blanca brillante (RAL 9003), perfectly lisa.
Corte con canteado pulido.
Iluminación de producto técnico mostrando acabados.
Estilo: Señalética premium exterior.
Colores: blanco, plata aluminio, grises.
Formato 4:3."

VARIANTES:
- "detalle del canto (sandwich visible)"
- "panel curvado (cold forming)"
- "panel con agujeros de montaje"
```

#### 21. Vinilo Perforado (vinilo_perforado)

```
PROMPT PRINCIPAL:

"Fotografía de vinilo microperforado (one-way vision) aplicado sobre cristal de vehículo.
Patrón de perforación visible al近距离: círculos minúsculos evenly distributed.
Diseño visible desde fuera, desde dentro transparencia completa.
Aplicado en ventana lateral de coche.
Iluminación: exteriorsoleado.
Estilo: Rotulación vehicular profesional.
Colores: blanco perforado, cristal, color vehículo.
Sin texto. Formato 4:3."

VARIANTES:
- "detalle close-up de perforaciones"
- "vue desde dentro del vehículo (transparente)"
- "aplicación en cristal de tienda"
```

---

## 📋 Flujo de Trabajo Recomendado

### Paso 1: Generación (usando MiniMax M2.5 o alternativa)

```
1. Acceder a MiniMax M2.5 (si está disponible)
   - O usar alternativa: Leonardo.ai, Midjourney, DALL-E 3

2. Seleccionar modelo de generación de imagen:
   - MiniMax Image Generation
   - O: Leonardo Phoenix / Diffusion
   - O: DALL-E 3 (ChatGPT)

3. Pegar el prompt del producto

4. Ajustar parámetros:
   - Aspect Ratio: 4:3 (1.33:1) o 1:1
   - Quality: Ultra/High
   - Style: Photorealistic

5. Generar 3-5 variaciones

6. Descargar las mejores
```

### Paso 2: Optimización (Canva - No Code)

```
1. Importar imagen a Canva (canva.com - gratis)

2. Agregar elementos de marca:
   - Logo Visuarte (esquina inferior derecha)
   - Badge: "Producto: [NOMBRE]" (opcional)

3. Ajustar:
   - Recortar si es necesario
   - Niveles de brillo/contraste
   - Exportar como PNG (optimizado web)
```

### Paso 3: Hospedaje (Cloudinary - Gratis)

```
1. Crear cuenta en cloudinary.com (free tier)

2. Subir imágenes:
   - Arrastrar PNGs a Cloudinary Dashboard
   
3. Copiar URLs:
   - https://res.cloudinary.com/[tu-cloud-name]/image/upload/v1/[nombre].png
   
4. Guardar URLs para siguiente paso
```

### Paso 4: Integración a Base de Datos

```
1. Agregar campo imagenUrl a tabla products:

ALTER TABLE "Product" ADD COLUMN "imagenUrl" TEXT;

2. Actualizar cada producto:

UPDATE "Product" SET "imagenUrl" = 'https://res.cloudinary.com/.../tarjetas_clasicas.png' 
WHERE key = 'tarjetas_clasicas';

(Repetir para los 21 productos)
```

### Paso 5: Actualizar Frontend

```
1. Actualizar ProductCard.tsx para mostrar imagen:

// En src/components/ProductCard.tsx
<img 
  src={product.imagenUrl || '/placeholder.png'} 
  alt={product.nombre}
  className="w-full h-48 object-cover rounded-t-lg"
/>

2. Actualizar catalogo en página principal

3. Build y deploy
```

---

## ⏱️ Timeline Estimado

| Fase | Tiempo | Actividad |
|------|--------|-----------|
| **Generación** | 2-3 horas | Generar imágenes con prompts |
| **Selección** | 30 min | Elegir mejores варианты |
| **Optimización Canva** | 1 hora | Agregar marca |
| **Cloudinary** | 30 min | Subir y obtener URLs |
| **Base de datos** | 20 min | Actualizar registros |
| **Frontend** | 30 min | Mostrar imágenes |
| **Deploy** | 10 min | Subir a Vercel |

**Total: ~5 horas (100% No-Code)**

---

## 💡 Tips para Mejores Resultados

### 1. Sé Específico con Materiales
```diff
- "tarjetas de visita"
+ "tarjetas de visita de 85x55mm en papel couché mate de 350gr"
```

### 2. Incluye Contexto Visual
```diff
- "tarjetas blancas"
+ "tarjetas blancas sobre superficie de madera de roble claro con luz natural"
```

### 3. Especifica Iluminación
```diff
- "buena iluminación"
+ "luz de estudio profesional con softbox a 45° izquierda, sin sombras duras"
```

### 4. Define Estilo
```diff
- "profesional"
+ "estilo minimalista corporativo, limpio, como catálogo de diseño gráfico"
```

### 5. Itera si es Necesario
- Si el resultado no te gusta → ajusta UN detalle del prompt
- Mantén lo que funcionó, cambia solo lo que no

---

## 🔗 Recursos

| Recurso | URL | Notas |
|---------|-----|-------|
| **MiniMax M2.5** | https://platform.minimaxi.com | Generador de imagen |
| **Leonardo.ai** | https://leonardo.ai | Alternativa gratis |
| **Canva** | https://canva.com | Editor visual |
| **Cloudinary** | https://cloudinary.com | Hosting imágenes (free) |
| **Neon (DB)** | https://neon.tech | Actualizar URLs |

---

## ✅ Checklist de Productos

- [ ] 1. tarjetas_clasicas
- [ ] 2. tarjetas_laminadas
- [ ] 3. tarjetas_exclusivas
- [ ] 4. brochure_21x10
- [ ] 5. flyers_a6
- [ ] 6. flyers_a5
- [ ] 7. flyers_a4
- [ ] 8. tripticos_a4
- [ ] 9. tripticos_a3
- [ ] 10. lona_frontlit
- [ ] 11. lona_backlit
- [ ] 12. lona_mesh
- [ ] 13. vinilo_interior
- [ ] 14. vinilo_exterior
- [ ] 15. lona_pvc
- [ ] 16. forex
- [ ] 17. metacrilato
- [ ] 18. carton_balsa
- [ ] 19. rollup
- [ ] 20. panel_composite
- [ ] 21. vinilo_perforado

---

*Documento generado para Visuarte Print Shop - Whavibot*
*Versión: 1.0 | Fecha: 2026-02-19*
