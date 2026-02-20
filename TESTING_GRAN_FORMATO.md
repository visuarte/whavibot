# Guía de Testing - Configurador de Gran Formato

## Prerequisitos

1. ✅ AUTH_SECRET configurado
2. ✅ Base de datos conectada (Neon PostgreSQL)
3. ✅ Productos de gran formato en la BD

## Pasos para Testing

### 1. Agregar Productos de Prueba

Ejecutar el script de seed:
```bash
npx ts-node scripts/seed-gran-formato.ts
```

O ejecutar manualmente en la BD:
```sql
INSERT INTO product (
  id, key, nombre, descripcion, tipo, precioPorM2, 
  unidad, category, materialType, anchoMinCm, anchoMaxCm, 
  altoMinCm, altoMaxCm, anchoRecomendadoCm, altoRecomendadoCm
) VALUES 
(
  gen_random_uuid(), 'lona_test', 'Lona Test', 'Lona flexible de prueba',
  'gran_formato', 7.50, 'm²', 'gran_formato_flexible', 'flexible',
  10, 500, 10, 500, 300, 200
);
```

### 2. Acceder a la Calculadora

1. Ir a `/cotizar`
2. Hacer clic en el dropdown de "Producto"
3. Expandir "Gran Formato Flexible" o "Gran Formato Rígido"
4. Seleccionar un producto de prueba

### 3. Probar el Configurador

**Test 1 - Ingreso manual de dimensiones:**
```
✓ Campo "Ancho (cm)": Ingresa 300
✓ Campo "Alto (cm)": Ingresa 200
✓ Haz clic "Calcular Área"
✓ Verifica: Se muestra "6.00 m²" y "€45.00"
```

**Test 2 - Usar preset DIN A1:**
```
✓ Haz clic en "DIN A1"
✓ Los campos se llenan con 84.1 × 59.4 cm
✓ Se calcula automáticamente como 0.50 m²
✓ El precio se actualiza a €3.75
```

**Test 3 - Límites de dimensiones:**
```
✓ Intenta ingresar ancho = 600 cm (fuera de rango)
✓ El sistema debe limitar a 500 cm máximo
✓ El cálculo se ajusta automáticamente
```

**Test 4 - Precisión decimal:**
```
✓ Ingresa ancho = 150.5 cm
✓ Ingresa alto = 100.3 cm
✓ Área debe ser 15.12 m² (aproximadamente)
✓ Precio = 15.12 × €7.50 = €113.40
```

### 4. Calcular Precio Final

1. Después de configurar dimensiones, haz clic en "Confirmar y Calcular Precio"
2. Verifica que aparezca la tarjeta "Presupuesto Calculado" con:
   - Dimensiones mostradas: "300.0 cm × 200.0 cm - 6.00 m²"
   - Base (sin IVA): €45.00
   - IVA (21%): €9.45
   - **Total: €54.45** ✓

### 5. Casos Edge

**Test - Dimensiones mínimas:**
```
✓ Ancho: 10 cm
✓ Alto: 10 cm
✓ Área: 0.01 m²
✓ Precio: €0.08 (con €7.50/m²)
```

**Test - Dimensiones máximas:**
```
✓ Ancho: 500 cm
✓ Alto: 500 cm
✓ Área: 250 m²
✓ Precio: €1,875.00 (sin IVA)
```

**Test - Cambiar de producto:**
```
✓ Selecciona "Lona Flexible"
✓ Configura dimensiones
✓ Selecciona "Foam Board Rígido"
✓ El configurador se actualiza
✓ Los precios cambian correctamente (€8.99/m² vs €7.50/m²)
```

## Verificación de Comportamiento

### Verificar en Consola del Navegador

Abre DevTools (F12) → Console

**Debería haber logs como:**
```javascript
// Cuando carga productos
[v0] Productos cargados: 8 productos

// Cuando selecciona gran formato
[v0] Producto seleccionado: Lona Flexible (gran_formato)

// Cuando calcula precio
[v0] Configuración: {anchoCm: 300, altoCm: 200, m2: 6, precioBase: 45}
[v0] Resultado: {base: 45, iva: 9.45, total: 54.45, cantidad: 6}
```

### Verificar en Network

1. Abre DevTools → Network tab
2. Filtra por "cotizar" y "productos"
3. Deberías ver:
   - `GET /api/productos` → lista de productos
   - `POST /api/cotizar` → cálculo de precio

**Response esperado en POST /api/cotizar:**
```json
{
  "success": true,
  "data": {
    "base": 45.00,
    "iva": 9.45,
    "total": 54.45,
    "cantidad": 6,
    "producto": {
      "nombre": "Lona Flexible",
      "key": "lona_flexible"
    }
  }
}
```

## Checklist Final

- [ ] Página `/cotizar` carga sin errores
- [ ] AUTH_SECRET está configurado
- [ ] Productos de gran formato aparecen en dropdown
- [ ] Configurador aparece al seleccionar gran formato
- [ ] Inputs de ancho/alto aceptan valores
- [ ] Presets funcionan correctamente
- [ ] Cálculo de m² es correcto (ancho × alto / 10000)
- [ ] Cálculo de precio es correcto (m² × €/m²)
- [ ] IVA se suma correctamente (21%)
- [ ] Resumen muestra dimensiones y área
- [ ] Botón "Calcular Precio" funciona
- [ ] Presupuesto final se muestra correctamente
- [ ] Se puede volver atrás y cambiar de producto

## Problemas Comunes

### "El configurador no aparece"
**Causa**: Producto no tiene `tipo: "gran_formato"`
**Solución**: Verificar en BD que `tipo = 'gran_formato'`

### "Precio incorrecto"
**Causa**: Multiplicación de decimales
**Solución**: Usar `Decimal` en Prisma, no `number`

### "Errores de TypeScript"
**Causa**: ConfiguracionGranFormato no importado
**Solución**: Verificar import en `cotizar/page.tsx`

### "AUTH_SECRET missing"
**Causa**: Variable de entorno no configurada
**Solución**: Establecer AUTH_SECRET en .env o Vercel dashboard

## Links Útiles

- 📄 Documentación: `/GRAN_FORMATO.md`
- 🔧 Componente: `src/components/ConfiguradorGranFormato.tsx`
- 📍 Página: `src/app/cotizar/page.tsx`
- 💾 Seed: `scripts/seed-gran-formato.ts`
- 📊 Schema: `prisma/schema.prisma`
