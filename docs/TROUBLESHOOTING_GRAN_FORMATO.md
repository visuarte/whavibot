# Troubleshooting: Configurador de Gran Formato

## Problema: El configurador no aparece

### Síntoma
Selecciono un producto pero no veo la tarjeta del configurador de dimensiones.

### Causas Posibles

#### 1. Producto incorrecto
```
❌ Seleccionaste un producto de tipo "cantidad_fija" o "por_m2"
✅ Debes seleccionar un producto con tipo "gran_formato"
```

**Solución**: Revisa que el producto sea de la categoría "Gran Formato Flexible" o "Gran Formato Rígido"

#### 2. Base de datos no migrada
```
❌ Los campos tipo = 'gran_formato' no existen en la DB
✅ Ejecutar migraciones primero
```

**Solución**:
```bash
# Opción 1: Prisma
npx prisma db push

# Opción 2: SQL directo
psql $DATABASE_URL < prisma/migrations/add_material_type.sql
psql $DATABASE_URL < scripts/add-gran-formato-products.sql
```

#### 3. Caché de productos vieja
```
❌ La app está mostrando productos cacheados de antes
✅ Limpiar caché del cliente
```

**Solución**:
- Presiona `Ctrl+Shift+Delete` (o `Cmd+Shift+Delete` en Mac)
- Selecciona "Cookies y datos de sitios"
- Haz clic "Limpiar"
- Recarga la página

#### 4. Componente no importado correctamente
```
❌ Error de import en cotizar/page.tsx
✅ Verificar import
```

**Solución**: Verifica en `src/app/cotizar/page.tsx`:
```typescript
import { ConfiguradorGranFormato, type ConfiguracionGranFormato } 
  from "@/components/ConfiguradorGranFormato"
```

### Depuración

Abre la consola del navegador (`F12`) y ejecuta:

```javascript
// 1. Verifica el estado del producto
console.log(document.querySelector('[data-test="product-type"]')?.textContent)

// 2. Busca errores
document.querySelector('.error-message')?.textContent

// 3. Recarga componentes
location.reload(true)
```

---

## Problema: Cálculo de precio incorrecto

### Síntoma
El precio mostrado no coincide con lo esperado.

### Causas Posibles

#### 1. Confusión con cm vs m
```
❌ Entrada: 2 m × 1.5 m
❌ Cálculo: 2 × 1.5 ÷ 10000 = 0.0003 m² (INCORRECTO)

✅ Entrada correcta: 200 cm × 150 cm
✅ Cálculo: 200 × 150 ÷ 10000 = 3 m² (CORRECTO)
```

**Solución**: Asegúrate de ingresar medidas en **CENTÍMETROS**, no metros.

#### 2. Deberías ingresar en cm

| Tamaño | Centímetros | NO hacer |
|--------|-------------|----------|
| 1 metro | 100 cm | ❌ 1 |
| 2 metros | 200 cm | ❌ 2 |
| 50 cm | 50 cm | ✅ |

#### 3. Fórmula de validación

```
m² = (ancho_cm × alto_cm) / 10000

Precio_base = m² × €/m²

Total = Precio_base × 1.21
```

**Ejemplo para validar**:
- Entrada: 100 cm × 100 cm
- m² = (100 × 100) / 10000 = 1 m² ✓
- Base = 1 × 7 = 7€ ✓
- Total = 7 × 1.21 = 8.47€ ✓

#### 4. IVA no se está aplicando
```
❌ Veo precio base 21€ como total
✅ Total debe ser 21 × 1.21 = 25.41€
```

**Solución**: 
El IVA se calcula en servidor. Si ves que no se aplica:
1. Verifica servidor está respondiendo correctamente
2. Abre DevTools (`F12`)
3. Ve a "Network"
4. Busca la petición `/api/cotizar` o `calcularPrecioServer`
5. Verifica que retorna `base`, `iva` y `total`

#### 5. Redondeo psicológico

```
La app puede aplicar "redondeo psicológico":
- 21.00€ se redondea a 21.99€
- 84.50€ se redondea a 89.99€

Esto es intencional para precios comerciales.
Si es un problema, verifica en src/lib/precios.ts:
función redondeoPsicologico()
```

### Debug: Calcular manualmente

Abre console en navegador (`F12`):

```javascript
// Tus valores
const ancho = 200;
const alto = 150;
const precioM2 = 7.00;

// Calcular
const m2 = (ancho * alto) / 10000;
const base = m2 * precioM2;
const iva = base * 0.21;
const total = base + iva;

console.log(`m²: ${m2}`);
console.log(`Base: ${base}€`);
console.log(`IVA: ${iva}€`);
console.log(`Total: ${total}€`);
```

---

## Problema: Presupuesto se congela

### Síntoma
Hago clic en "Calcular Precio" pero no pasa nada.

### Causas Posibles

#### 1. Falta validación en formulario
```
❌ No hay ancho/alto configurados
✅ Completa todos los campos
```

**Solución**: 
- Verifica que ambos campos (ancho y alto) tengan valores
- El botón debe estar habilitado (no gris)

#### 2. Servidor no responde
```
❌ Error de conexión
✅ Verifica la API
```

**Depuración**:
```bash
# Terminal
curl http://localhost:3000/api/cotizar -X POST \
  -H "Content-Type: application/json" \
  -d '{"producto": "lona_flexible", "cantidad": 3}'

# Verificar response: success true/false
```

#### 3. Error en calcularPrecioServer

Abre DevTools > Console:

```javascript
// Verifica si hay errores
fetch('/api/cotizar', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    productoKey: 'lona_flexible',
    cantidad: 3
  })
})
.then(r => r.json())
.then(d => console.log(d))
.catch(e => console.error('Error:', e))
```

#### 4. Base de datos offline

```bash
# Verifica conexión BD
npx prisma db execute --stdin < /dev/null

# O en el code:
npx prisma studio  # Abre interfaz gráfica
```

### Debug: Logs en cliente

Agrega esto a `src/app/cotizar/page.tsx`:

```typescript
const handleCalcular = async () => {
    console.log("[DEBUG] Inicio cálculo")
    console.log("[DEBUG] Producto:", selectedProductKey)
    console.log("[DEBUG] Configuración:", configuracionGranFormato)
    
    try {
        // ... resto del código ...
        console.log("[DEBUG] Enviando al servidor...")
        const result = await calcularPrecioServer(...)
        console.log("[DEBUG] Respuesta:", result)
    } catch (error) {
        console.error("[ERROR] Falló:", error)
    }
}
```

---

## Problema: Los presets no funcionan

### Síntoma
Hago clic en "DIN A3" pero nada cambia.

### Causas Posibles

#### 1. JavaScript deshabilitado
```
❌ JavaScript está deshabilitado en el navegador
✅ Habilitar JavaScript
```

Verifica en navegador > Settings > Privacy > JavaScript

#### 2. Componente no renderizó
```bash
# En DevTools Console, ejecuta:
document.querySelector('[data-test="preset-button"]')
# Si retorna null, el componente no está renderizado
```

#### 3. Event listener no está attached

```javascript
// En console:
const btn = document.querySelector('button:contains("DIN A3")')
if (btn) {
  btn.click()
  console.log("Click enviado")
} else {
  console.log("Botón no encontrado")
}
```

---

## Problema: Números decimales no funcionan

### Síntoma
Intento ingresar 99.5 cm pero el campo rechaza o no calcula bien.

### Solución

El input aceptaNumbers decimales. Verifica:

```html
<!-- Debe permitir decimales -->
<Input
  type="number"
  step="0.5"     <!-- Permite 0.5 cm incrementos -->
  value={anchoCm}
/>
```

Si tienes problemas con decimales:
1. Intenta con números enteros primero (100 en lugar de 99.5)
2. Usa `.` no `,` para decimales
3. Si el navegador es antiguo, upgrade

---

## Problema: Las dimensiones se resetean

### Síntoma
Configuro ancho/alto, cambio de pestaña, y cuando regreso se borraron.

### Causa
El estado React se pierde si la página se recarga.

### Soluciones

#### Opción 1: Usar localStorage (cliente)

```typescript
useEffect(() => {
  const saved = localStorage.getItem('granFormatoConfig')
  if (saved) setConfiguracionGranFormato(JSON.parse(saved))
}, [])

useEffect(() => {
  localStorage.setItem('granFormatoConfig', JSON.stringify(configuracionGranFormato))
}, [configuracionGranFormato])
```

#### Opción 2: Usar URL params

```typescript
// Guardar en URL
const url = new URL(window.location)
url.searchParams.set('ancho', String(configuracionGranFormato.anchoCm))
window.history.replaceState({}, '', url)

// Leer desde URL
const ancho = new URLSearchParams(window.location.search).get('ancho')
```

---

## Problema: Precios del producto no existen

### Síntoma
```
Error: Product not found: lona_flexible
```

### Causa
El producto no existe o no tiene `precioPorM2` definido.

### Solución

Verifica en la BD:

```sql
-- Ver producto
SELECT * FROM product WHERE key = 'lona_flexible';

-- Debe mostrar:
-- id, key, nombre, tipo='gran_formato', precioPorM2=7.00

-- Si no existe, insertar:
INSERT INTO product (id, key, nombre, tipo, unidad, precioPorM2, category, materialType)
VALUES (
  uuid_generate_v4(),
  'lona_flexible',
  'Lona Flexible',
  'gran_formato',
  'm²',
  7.00,
  'gran_formato_flexible',
  'flexible'
);
```

---

## Herramientas de Debug

### 1. DevTools del Navegador
```
F12 o Ctrl+Shift+I
```

### 2. Logs del Servidor
```bash
# Ver logs de Vercel
vercel logs
```

### 3. Inspect API
```bash
# Test de API directa
curl -X POST http://localhost:3000/api/cotizar \
  -H "Content-Type: application/json" \
  -d '{"productKey":"lona_flexible","cantidad":3}'
```

### 4. Prisma Studio
```bash
npx prisma studio
# Abre http://localhost:5555
```

---

## Checklist de Verificación

Antes de reportar un bug:

- [ ] ¿Ejecutaste las migraciones? (`npx prisma db push`)
- [ ] ¿Borraste caché del navegador? (`Ctrl+Shift+Delete`)
- [ ] ¿Probaste en otro navegador?
- [ ] ¿Los productos existen en la BD? (`SELECT * FROM product WHERE tipo='gran_formato'`)
- [ ] ¿JavaScript está habilitado?
- [ ] ¿El servidor está corriendo? (`npm run dev`)
- [ ] ¿Las medidas están en cm, no en m?

---

## Reporte de Bug

Si nada funciona, reporta con:

```
1. Qué hiciste exactamente
2. Qué esperabas que sucediera
3. Qué sucedió en realidad
4. Navegador y versión
5. Consola de errores (F12 > Console)
6. Pantalla de la BD (Prisma Studio)
```
