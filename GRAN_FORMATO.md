# Productos de Gran Formato - Configurador Flexible y Rígido

## Descripción General

Los productos de gran formato (flexible y rígido) permiten a los usuarios especificar dimensiones personalizadas en centímetros y calcular automáticamente el precio basado en metros cuadrados.

## Cómo Funciona

### 1. Selección del Producto
Cuando un usuario selecciona un producto de gran formato en la página de cotizar, se muestra automáticamente el **Configurador de Dimensiones**.

### 2. Configurador de Dimensiones
El configurador permite:

- **Entrada de Ancho y Alto (cm)**: El usuario ingresa valores en centímetros
- **Límites Automáticos**: El sistema valida que los valores estén dentro de los rangos permitidos
- **Presets Estándar**: Botones rápidos para tamaños DIN (A3, A2, A1, A0)
- **Cálculo Automático**:
  - `Área (cm²) = Ancho × Alto`
  - `Área (m²) = Área (cm²) / 10000`
  - `Precio Base = Área (m²) × Precio por m²`

### 3. Ejemplo de Cálculo

**Usuario configura una lona flexible:**
- Ancho: 300 cm
- Alto: 200 cm
- Precio por m²: €7.50

**Sistema calcula:**
```
Área cm²: 300 × 200 = 60,000 cm²
Área m²: 60,000 / 10,000 = 6 m²
Precio Base: 6 × €7.50 = €45.00
Precio Total (con IVA 21%): €54.45
```

## Tipos de Productos

### Flexible
- **Ejemplos**: Lonas PVC, Poliéster, Tela de algodón
- **Rango típico**: 10-500 cm
- **Precio/m²**: €7.50-€12.00

### Rígido
- **Ejemplos**: Foam Board, Dibond, Acrílico, PVC rígido
- **Rango típico**: 20-400 cm
- **Precio/m²**: €8.99-€20.00

## Configuración en Base de Datos

### Schema del Producto

```prisma
model Product {
  // ... campos estándar
  tipo: "gran_formato"
  materialType: "flexible" | "rigido"
  
  // Límites de dimensiones
  anchoMinCm: 10
  anchoMaxCm: 300
  altoMinCm: 10
  altoMaxCm: 300
  
  // Valores recomendados para defaults
  anchoRecomendadoCm: 100
  altoRecomendadoCm: 100
}
```

### Campos Requeridos
- `tipo: "gran_formato"` - Tipo de producto
- `materialType: "flexible" | "rigido"` - Tipo de material
- `precioPorM2: Decimal(10, 2)` - Precio por metro cuadrado
- `anchoMinCm, anchoMaxCm` - Rango de ancho permitido
- `altoMinCm, altoMaxCm` - Rango de alto permitido
- `anchoRecomendadoCm, altoRecomendadoCm` - Valores por defecto

## Agregar Nuevos Productos

### 1. Opción A: Script de Seed
```bash
npx ts-node scripts/seed-gran-formato.ts
```

### 2. Opción B: Directamente en BD
```sql
INSERT INTO product (
  key, nombre, descripcion, tipo, materialType,
  precioPorM2, category, unidad,
  anchoMinCm, anchoMaxCm, altoMinCm, altoMaxCm,
  anchoRecomendadoCm, altoRecomendadoCm
) VALUES (
  'lona_custom',
  'Lona Personalizada',
  'Lona flexible personalizada',
  'gran_formato',
  'flexible',
  10.50,
  'gran_formato_flexible',
  'm²',
  10, 500, 10, 500, 300, 200
);
```

## Componentes

### ConfiguradorGranFormato
**Ubicación**: `src/components/ConfiguradorGranFormato.tsx`

**Props**:
```typescript
interface ConfiguradorGranFormatoProps {
    producto: ProductCatalog
    precioPorM2: number
    onConfiguracionChange: (config: ConfiguracionGranFormato) => void
}
```

**Emite**:
```typescript
interface ConfiguracionGranFormato {
    anchoCm: number
    altoCm: number
    m2: number
    precioBase: number
}
```

## Lógica de Cálculo

### En Frontend (ConfiguradorGranFormato.tsx)
- Validación de entrada
- Conversión cm → m²
- Cálculo de precio base
- Actualización en tiempo real

### En Server (actions.ts / route.ts)
- Confirmación de valores
- Aplicación de reglas de negocio
- Cálculo final con IVA (21%)
- Persistencia en cotización

## Flujo de Usuario

```
1. Usuario selecciona producto gran formato
   ↓
2. Se muestra ConfiguradorGranFormato
   ↓
3. Usuario ingresa ancho y alto (cm)
   ↓
4. Sistema calcula m² automáticamente
   ↓
5. Usuario ve precio base estimado
   ↓
6. Usuario hace clic en "Confirmar"
   ↓
7. Sistema calcula precio final con IVA
   ↓
8. Se muestra cotización completa
   ↓
9. Usuario puede solicitar presupuesto personalizado
```

## Presets Estándar Disponibles

Los usuarios pueden usar estos presets para seleccionar rápidamente tamaños estándar:

- **DIN A3**: 42 × 29.7 cm
- **DIN A2**: 59.4 × 42 cm
- **DIN A1**: 84.1 × 59.4 cm
- **DIN A0**: 118.9 × 84.1 cm

## Validaciones

El sistema valida:
- ✅ Ancho mínimo y máximo
- ✅ Alto mínimo y máximo
- ✅ Valores numéricos positivos
- ✅ Precisión decimal (hasta 0.1 cm)

## Ejemplos de Respuesta API

### POST /api/cotizar
```json
{
  "success": true,
  "data": {
    "base": 45.00,
    "iva": 9.45,
    "total": 54.45,
    "cantidad": 6.0,
    "producto": {
      "nombre": "Lona Flexible PVC",
      "key": "lona_flexible_pvc"
    },
    "unidad": "m²"
  }
}
```

## Troubleshooting

### Configurador no aparece
- Verificar que `tipo = "gran_formato"`
- Verificar que se encuentre en categoría `gran_formato_flexible` o `gran_formato_rigido`

### Precio incorrecto
- Verificar `precioPorM2` está en formato Decimal(10, 2)
- Confirmar cálculo: m² × precio/m² = base

### Límites no se validan
- Verificar campos `anchoMinCm`, `anchoMaxCm`, etc. están definidos

## Contacto y Soporte
Para cambios en productos de gran formato, revisar `src/lib/precios.ts` y actualizar el fallback `PRODUCTS_FALLBACK`.
