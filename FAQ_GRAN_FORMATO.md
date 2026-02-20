# Preguntas Frecuentes - Configurador de Gran Formato

## General

### ¿Cómo agrego un nuevo producto de gran formato?

**Opción 1 - Script automático:**
```bash
npx ts-node scripts/seed-gran-formato.ts
```

**Opción 2 - SQL directo:**
```sql
INSERT INTO product (key, nombre, tipo, materialType, precioPorM2, ...)
VALUES ('lona_custom', 'Lona Custom', 'gran_formato', 'flexible', 7.50, ...);
```

**Opción 3 - Desde admin UI (si existe):**
1. Ir a Admin → Productos
2. Nuevo → Gran Formato
3. Llenar campos

Ver `SQL_GRAN_FORMATO.sql` para ejemplos completos.

### ¿Por qué aparecen dos categorías en el dropdown?

Es por diseño: **Flexible** y **Rígido** son categorías separadas para:
- Mejor organizacion
- Diferentes límites de tamaño
- Diferentes precios por m²

```
Gran Formato Flexible
├── Lona PVC
├── Lona Poliéster
└── Tela Algodón

Gran Formato Rígido
├── Foam Board
├── Dibond
└── Acrílico
```

### ¿Puedo mezclar productos flexibles y rígidos en una cotización?

No. El sistema está diseñado para cotizar un producto a la vez. Para múltiples productos:
1. Hacer cotización 1
2. Hacer cotización 2
3. Combinarlas manualmente

Mejora futura: Agregar carrito.

---

## Cálculos

### ¿Cómo se calcula el área en m²?

```
Área (cm²) = Ancho (cm) × Alto (cm)
Área (m²) = Área (cm²) / 10,000

Ejemplo: 300 cm × 200 cm = 60,000 cm² = 6 m²
```

### ¿Por qué aparecen decimales en el área?

Porque algunos productos tienen dimensiones con decimales:
- Presets DIN: 29.7 cm, 42 cm, etc.
- Entrada manual: 150.5 cm, etc.

El sistema redondea a 2 decimales en la cotización.

### ¿Incluye IVA el precio final?

**Sí**. El cálculo es:
```
Base (sin IVA) = Área (m²) × Precio/m²
IVA (21%) = Base × 0.21
TOTAL = Base + IVA
```

Los precios mostrados en el configurador son **sin IVA** (base), pero la cotización final **sí incluye IVA**.

### ¿Hay descuentos por volumen?

No por defecto, pero se puede agregar. Contactar al soporte.

---

## Validación

### ¿Cuáles son los límites de dimensiones?

**Flexible (típico):**
- Ancho: 10-500 cm
- Alto: 10-500 cm

**Rígido (típico):**
- Ancho: 20-400 cm
- Alto: 20-400 cm

Se definen por producto en la BD:
```
anchoMinCm, anchoMaxCm
altoMinCm, altoMaxCm
```

### ¿Qué pasa si intento exceder los límites?

El sistema:
1. Muestra advertencia
2. Limita automáticamente al máximo
3. Recalcula el precio

**Ejemplo:**
```
Usuario ingresa: 600 cm de ancho (límite 500)
Sistema ajusta a: 500 cm
Se recalcula el precio
```

### ¿Puedo ingresar 0 cm?

No. El sistema valida:
- Mínimo: valor > 0
- Máximo: valor <= límite

Intenta mostrar error: "Dimensión mínima no alcanzada".

---

## Presets

### ¿Cómo funcionan los presets DIN?

Los presets son botones rápidos para tamaños estándar:

```
DIN A3: 29.7 × 42 cm     = 0.125 m²
DIN A2: 42 × 59.4 cm     = 0.250 m²
DIN A1: 59.4 × 84.1 cm   = 0.500 m²
DIN A0: 84.1 × 118.9 cm  = 1.000 m²
```

Al hacer clic:
1. Los campos se llenan automáticamente
2. El área se calcula
3. El precio se actualiza

### ¿Puedo agregar nuevos presets?

Sí, editando `ConfiguradorGranFormato.tsx`:

```typescript
const presets = [
    { label: 'Custom', ancho: 100, alto: 100 },
    // Agregar aquí
];
```

### ¿Los presets respetan límites?

Sí. Si un preset excede los límites:
1. Se ajusta automáticamente
2. Se muestra advertencia
3. El usuario puede confirmar o cambiar

---

## Interfaz

### ¿Por qué no aparece el configurador?

**Causas comunes:**

1. **Producto no es de gran formato**
   ```
   Verificar: tipo = 'gran_formato' en BD
   ```

2. **Categoría incorrecta**
   ```
   Debe ser: 'gran_formato_flexible' o 'gran_formato_rigido'
   ```

3. **Producto no cargó**
   ```
   Esperar a que cargue el dropdown completo
   ```

4. **Bug de cache**
   ```
   Refrescar página (Ctrl+F5)
   ```

### ¿El configurador desaparece al cambiar de producto?

Sí, es por diseño. Al cambiar de producto:
1. Se resetea el configurador
2. Se limpian las dimensiones
3. Se muestra el nuevo configurador (si es gran formato)

### ¿Cómo edito los límites de un producto?

En la BD:
```sql
UPDATE product 
SET anchoMaxCm = 1000, altoMaxCm = 1000
WHERE key = 'lona_flexible_pvc_280';
```

Luego refrescar la página (caché se invalida en 1 hora).

---

## Cotizaciones

### ¿Se guardan las cotizaciones?

Sí. Al hacer clic "Calcular Precio", se crea un registro:

```
Cotización
├── Product ID
├── Cantidad (m²)
├── Área (m²)
├── Base
├── IVA
├── Total
└── Creado: fecha/hora
```

Ver tabla `cotizacion` en BD.

### ¿Puedo descargar la cotización?

Sí, hay botones:
- "Imprimir" → PDF
- "Descargar" → PDF/Excel (si está implementado)
- "Enviar presupuesto" → Form con email

### ¿Cuánto tiempo es válida una cotización?

Por defecto, **no tiene expiración**. Se puede configurar:

```typescript
// En cotizar/page.tsx
const COTIZACION_EXPIRA_EN = 7 * 24 * 60 * 60 * 1000; // 7 días
```

### ¿Dónde veo el historial de cotizaciones?

En la BD:
```sql
SELECT * FROM cotizacion 
WHERE productId = ? 
ORDER BY createdAt DESC 
LIMIT 10;
```

En el admin UI (si existe):
1. Ir a Admin → Cotizaciones
2. Ver listado con filtros

---

## API

### ¿Cuál es el endpoint para calcular?

```
POST /api/cotizar
Content-Type: application/json

{
  "productKey": "lona_flexible_pvc_280",
  "cantidad": 6,
  "areaM2": 6
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "base": 45.00,
    "iva": 9.45,
    "total": 54.45,
    "cantidad": 6,
    "producto": {
      "nombre": "Lona Flexible PVC 280g",
      "key": "lona_flexible_pvc_280"
    }
  }
}
```

### ¿Puedo usar la API desde otra app?

Sí, pero sin CORS configurado, no directamente desde navegador.

Opciones:
1. Usar como backend (recomendado)
2. Implementar CORS
3. Usar proxy

### ¿Qué status codes devuelve?

- `200` → Éxito
- `400` → Parámetros inválidos
- `404` → Producto no existe
- `500` → Error servidor

---

## Performance

### ¿Es rápido el configurador?

Sí:
- Cálculos: < 100ms
- API: < 500ms
- Page load: < 2s

Optimizaciones:
- Caché de productos (1h)
- Select específicos (sin includes)
- Compresión Gzip

### ¿Maneja grandes dimensiones?

Sí, hasta 500×500 cm (25 m²). Más allá:
- El sistema limita automáticamente
- Se muestra advertencia
- Usuario puede contactar para custom

### ¿Hay límite de cotizaciones por día?

No por defecto. Se puede implementar rate limiting:

```typescript
// Ejemplo: 100 cotizaciones por IP por día
const rateLimit = new RateLimiter(100, 24 * 60 * 60);
```

---

## Troubleshooting

### "500 Error al calcular"

**Pasos:**

1. Verificar DATABASE_URL
   ```bash
   psql $DATABASE_URL -c "SELECT 1"
   ```

2. Verificar Prisma
   ```bash
   npx prisma db push
   npx prisma generate
   ```

3. Verificar logs
   ```bash
   vercel logs --tail
   ```

### "Precio incorrecto"

**Verificar:**

1. `precioPorM2` en Decimal(10, 2)
2. Cálculo: (ancho × alto / 10000) × precioPorM2
3. IVA: × 1.21

```javascript
// Debug en consola
const area = (300 * 200) / 10000; // = 6
const base = area * 7.50;          // = 45
const iva = base * 0.21;           // = 9.45
const total = base + iva;          // = 54.45
console.log({ area, base, iva, total });
```

### "Configurador se congela"

**Causa:** Input recibe props incorrectas

**Solución:**
1. Refrescar página
2. Verificar console (F12)
3. Reportar error

### "No carga el configurador después de cambiar de producto"

**Causa:** Estado no se resetea correctamente

**Solución:**
1. Refrescar página
2. Usar navegador diferente
3. Borrar cookies/cache

---

## Soporte

### ¿Cómo reporto un bug?

1. Reproducir el error
2. Anotar pasos exactos
3. Captura de pantalla (si visible)
4. Console log (F12)
5. Contactar: soporte@visuarte.com

### ¿Cómo request una feature?

1. Describir qué necesitas
2. Por qué es importante
3. Casos de uso
4. Email: features@visuarte.com

### ¿Quién mantiene esto?

Equipo de Visuarte
- Frontend: @visuarte/dev
- Backend: @visuarte/backend
- Soporte: support@visuarte.com

---

## Más Información

- 📖 Documentación técnica: `GRAN_FORMATO.md`
- 🧪 Testing: `TESTING_GRAN_FORMATO.md`
- 🚀 Deployment: `DEPLOYMENT_GRAN_FORMATO.md`
- 💾 SQL: `SQL_GRAN_FORMATO.sql`
- 📋 Resumen: `RESUMEN_GRAN_FORMATO.md`
