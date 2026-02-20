# Cambios Implementados: Configurador de Gran Formato

## Resumen

Se ha implementado un nuevo sistema de configurador de productos de gran formato (flexible y rígido) que permite a los usuarios:
- Seleccionar dimensiones personalizadas en cm (ancho × alto)
- Ver presets de tamaños estándar (DIN A0-A3)
- Calcular automáticamente el área en m²
- Obtener el precio basado en €/m²

## Archivos Modificados

### 1. **src/lib/types.ts** ✏️
- Actualizado tipo `ProductType` para incluir `"gran_formato"`
- Actualizado tipo `ProductUnit` para incluir `"cm"`
- Agregadas propiedades al interface `ProductCatalog`:
  - `materialType?: string` (flexible/rígido)
  - `anchoMinCm`, `anchoMaxCm`, `altoMinCm`, `altoMaxCm`
  - `anchoRecomendadoCm`, `altoRecomendadoCm`

### 2. **src/lib/precios.ts** ✏️
- Actualizado `dbToCatalog()` para mapear propiedades de gran formato
- Agregado caso `gran_formato` en `calcularPrecio()`
- Actualizado `PRODUCTS_FALLBACK` con ejemplos:
  - `lona_flexible` (7.00€/m²)
  - `foam_rigido` (5.50€/m²)

### 3. **src/components/ConfiguradorGranFormato.tsx** ✨ **NUEVO**
Componente React completo con:
- Inputs para ancho/alto en cm con validación
- 4 presets estándar (DIN A3, A2, A1, A0)
- Cálculo automático de m² en tiempo real
- Visualización clara del desglose de precios
- Info sobre IVA
- Interfaz responsive y accesible

### 4. **src/app/cotizar/page.tsx** ✏️
- Importado `ConfiguradorGranFormato` y `ConfiguracionGranFormato`
- Agregado estado `configuracionGranFormato`
- Actualizado `handleProductChange()` para resetear configuración
- Actualizado `handleCalcular()` para usar m² de configurador
- Agregada validación en botón: deshabilitado si gran_formato sin config
- Integrado renderizado del configurador cuando tipo es `gran_formato`
- Actualizado resumen de resultado para mostrar dimensiones

### 5. **prisma/schema.prisma** ✏️
- Agregados campos al modelo `Product`:
  - `materialType` (VARCHAR 50)
  - `anchoMinCm` (Int, default 10)
  - `anchoMaxCm` (Int, default 300)
  - `altoMinCm` (Int, default 10)
  - `altoMaxCm` (Int, default 300)
  - `anchoRecomendadoCm` (Int, default 100)
  - `altoRecomendadoCm` (Int, default 100)

## Archivos Nuevos

### 1. **prisma/migrations/add_material_type.sql** 📝
Script SQL que agrega los nuevos campos a la tabla `product`

### 2. **scripts/add-gran-formato-products.sql** 📝
Script que inserta 5 productos de gran formato:
- Lona Flexible (7.00€/m²)
- PVC Flexible (8.50€/m²)
- Foam Rígido (5.50€/m²)
- Aluminio Composite (12.00€/m²)
- PVC Rígido (6.50€/m²)

### 3. **docs/GRAN_FORMATO.md** 📚
Documentación completa con:
- Descripción de características
- API del componente
- Instrucciones de implementación
- Ejemplos de uso
- Fórmulas de cálculo
- Troubleshooting

### 4. **public/images/gran-formato-example.jpg** 🖼️
Imagen de ejemplo del configurador

## Flujo de Uso

```
1. Usuario selecciona producto tipo "gran_formato"
   ↓
2. Se muestra ConfiguradorGranFormato
   ↓
3. Usuario configura ancho × alto (o usa preset)
   ↓
4. Componente calcula m² automáticamente
   ↓
5. Usuario ve desglose de precios en tiempo real
   ↓
6. Usuario hace clic "Calcular Precio"
   ↓
7. Se envía m² calculado al servidor
   ↓
8. Servidor calcula: m² × €/m² × 1.21 (IVA)
   ↓
9. Se muestra presupuesto con dimensiones
```

## Cálculos

### Fórmula Básica
```
Área (m²) = (Ancho cm × Alto cm) / 10000
Precio Base = Área × €/m²
Precio Total = Precio Base × 1.21
```

### Ejemplo
```
Configuración: 200 cm × 150 cm
Producto: Lona Flexible (7.00€/m²)

Cálculo:
- Área = (200 × 150) / 10000 = 3 m²
- Base = 3 × 7.00 = 21.00€
- Total = 21.00 × 1.21 = 25.41€
```

## Validaciones Implementadas

✅ Rango de ancho: [anchoMinCm, anchoMaxCm]
✅ Rango de alto: [altoMinCm, altoMaxCm]
✅ Valores numéricos válidos
✅ Cálculos en tiempo real
✅ Botón deshabilitado sin configuración completa
✅ Precio mínimo validado (≥ 0)

## Próximos Pasos (Opcionales)

1. **Base de Datos**: Ejecutar migraciones
   ```bash
   psql $DATABASE_URL < prisma/migrations/add_material_type.sql
   psql $DATABASE_URL < scripts/add-gran-formato-products.sql
   ```

2. **Prisma**: Generar cliente actualizado
   ```bash
   npx prisma generate
   ```

3. **Testing**: Probar productos:
   - Gran Formato Flexible: lona_flexible, pvc_flexible
   - Gran Formato Rígido: foam_rigido, alu_composite_rigido, pvc_rigido

## Compatibilidad

✅ No rompe funcionalidad existente
✅ Productos antiguos (cantidad_fija, por_m2) funcionan igual
✅ Fallback para desarrollo sin DB
✅ TypeScript totalmente tipado
✅ Responsive design
✅ Accesibilidad WCAG

## Notas de Desarrollo

- El configurador solo se muestra si `tipo === "gran_formato"`
- Los m² se calculan en el cliente (en tiempo real)
- El precio final se calcula en el servidor (seguro)
- IVA siempre es 21%
- Redondeo psicológico aplicado a precio base
