# Configurador de Gran Formato (Flexible/Rígido)

## Descripción

Se ha implementado un nuevo sistema de configuración de productos de gran formato que permite a los usuarios seleccionar dimensiones personalizadas (ancho × alto en cm) y calcular automáticamente el precio basado en metros cuadrados.

## Características

### 1. Nuevo Tipo de Producto: `gran_formato`

Los productos de gran formato permiten:
- Entrada libre de ancho y alto en centímetros
- Cálculo automático de m² (ancho cm × alto cm / 10000)
- Presets de tamaños estándar (DIN A3, A2, A1, A0)
- Validación de rangos mín/máx configurables
- Precio calculado automáticamente (m² × precio/m²)

### 2. Propiedades del Producto

```typescript
interface ProductCatalog {
  // ... propiedades existentes ...
  
  // Para gran formato
  materialType?: string    // 'flexible' | 'rigido'
  anchoMinCm?: number     // Ancho mínimo permitido (default: 10)
  anchoMaxCm?: number     // Ancho máximo permitido (default: 300)
  altoMinCm?: number      // Alto mínimo permitido (default: 10)
  altoMaxCm?: number      // Alto máximo permitido (default: 300)
  anchoRecomendadoCm?: number  // Dimensión recomendada (default: 100)
  altoRecomendadoCm?: number   // Dimensión recomendada (default: 100)
}
```

### 3. Componente ConfiguradorGranFormato

Ubicación: `src/components/ConfiguradorGranFormato.tsx`

Propiedades:
```typescript
interface ConfiguradorGranFormatoProps {
  producto: ProductCatalog          // Producto a configurar
  precioPorM2: number              // Precio base por m²
  onConfiguracionChange: (config: ConfiguracionGranFormato) => void
}

interface ConfiguracionGranFormato {
  anchoCm: number   // Ancho seleccionado
  altoCm: number    // Alto seleccionado
  m2: number        // Metros cuadrados calculados
  precioBase: number // Precio base (sin IVA)
}
```

### 4. Presets de Tamaños Estándar

El configurador incluye 4 presets comunes:
- DIN A3: 42 × 29.7 cm
- DIN A2: 59.4 × 42 cm
- DIN A1: 84.1 × 59.4 cm
- DIN A0: 118.9 × 84.1 cm

## Implementación en Base de Datos

### 1. Ejecutar Migraciones

```bash
# Agregar campos a la tabla product
psql $DATABASE_URL < prisma/migrations/add_material_type.sql

# Insertar productos de gran formato
psql $DATABASE_URL < scripts/add-gran-formato-products.sql
```

O usar Prisma:
```bash
npx prisma db push
```

### 2. Productos Incluidos

Después de ejecutar los scripts, se crearán automáticamente:

**Gran Formato Flexible:**
- `lona_flexible` - Lona publicitaria (7.00€/m²)
- `pvc_flexible` - PVC flexible (8.50€/m²)

**Gran Formato Rígido:**
- `foam_rigido` - Paneles de espuma (5.50€/m²)
- `alu_composite_rigido` - Aluminio composite (12.00€/m²)
- `pvc_rigido` - PVC rígido (6.50€/m²)

## Uso en la Página de Cotización

### 1. Importar Componente

```typescript
import { ConfiguradorGranFormato, type ConfiguracionGranFormato } from "@/components/ConfiguradorGranFormato"
```

### 2. Estados Necesarios

```typescript
const [configuracionGranFormato, setConfiguracionGranFormato] = useState<ConfiguracionGranFormato | null>(null)
```

### 3. Renderizar Configurador

```typescript
{productoSeleccionado?.tipo === "gran_formato" && (
  <ConfiguradorGranFormato
    producto={productoSeleccionado}
    precioPorM2={productoSeleccionado.precioPorM2 || 0}
    onConfiguracionChange={setConfiguracionGranFormato}
  />
)}
```

### 4. Usar en Cálculo

```typescript
if (producto.tipo === "gran_formato") {
  if (!configuracionGranFormato) return
  areaM2Final = configuracionGranFormato.m2
  cantidad = configuracionGranFormato.m2
}
```

## Cálculo de Precios

### Fórmula

```
Ancho (cm) × Alto (cm) ÷ 10000 = m²
m² × Precio/m² = Precio Base (sin IVA)
Precio Base × 1.21 = Precio Total (con IVA 21%)
```

### Ejemplo

Usuario configura: 200 cm × 150 cm con precio de 7€/m²

```
200 × 150 ÷ 10000 = 3 m²
3 × 7 = 21€ (precio base)
21 × 1.21 = 25.41€ (total con IVA)
```

## Validaciones

El componente valida automáticamente:
- Ancho dentro de rango [anchoMinCm, anchoMaxCm]
- Alto dentro de rango [altoMinCm, altoMaxCm]
- Cálculos actualizados en tiempo real
- No permite calcular sin configuración completa

## Mejoras Futuras

Posibles expansiones:
1. Cantidades múltiples (ej: 5 paneles de 100×100)
2. Recargos por tamaño especializado
3. Plantillas de proyectos comunes
4. Previsualización en vivo
5. Descargador de especificaciones PDF

## Troubleshooting

### El configurador no aparece

Verificar que:
- El producto tiene `tipo === "gran_formato"`
- `precioPorM2` está definido
- El estado `configuracionGranFormato` se actualiza

### Precios incorrectos

Verificar:
- Fórmula: (ancho × alto / 10000) × precioPorM2
- IVA siempre 21%
- Redondeo psicológico aplicado a precio base
