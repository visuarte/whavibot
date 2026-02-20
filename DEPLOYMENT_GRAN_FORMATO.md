# Deployment - Productos de Gran Formato

## Pre-deployment Checklist

- [ ] AUTH_SECRET está configurado en Vercel
- [ ] DATABASE_URL apunta a la BD correcta (Neon)
- [ ] Schema Prisma está actualizado
- [ ] Migraciones se han ejecutado
- [ ] Productos de gran formato existen en BD

## Pasos de Deployment

### 1. Preparar la Base de Datos

```bash
# Ver estado de migraciones
npx prisma migrate status

# Si necesitas crear migración nueva
npx prisma migrate dev --name add_gran_formato_fields

# O si ya existe la migración, solo aplica
npx prisma migrate deploy
```

### 2. Agregar Productos de Gran Formato

**Opción A - Usar script:**
```bash
npx ts-node scripts/seed-gran-formato.ts
```

**Opción B - Ejecutar SQL directo en Neon:**
1. Ir a Neon Dashboard
2. SQL Editor
3. Ejecutar queries en `GRAN_FORMATO.md` - sección "Agregar Nuevos Productos"

### 3. Variables de Entorno Necesarias

En Vercel Dashboard → Settings → Environment Variables:

```
AUTH_SECRET=<generate-con-openssl-rand-base64-32>
DATABASE_URL=postgresql://user:password@host/dbname?sslmode=require
```

**Generar AUTH_SECRET seguro:**
```bash
openssl rand -base64 32
```

### 4. Verificar en Staging

Antes de ir a producción:

```bash
# Instalar dependencias
npm install

# Build
npm run build

# Start
npm run start
```

Probar en `http://localhost:3000/cotizar`:
1. Seleccionar producto gran formato
2. Configurar dimensiones
3. Verificar cálculo de precio

### 5. Deploy a Producción

```bash
# Push a GitHub
git add .
git commit -m "feat: add gran formato configurador"
git push origin main

# Vercel auto-despliega en 30-60 segundos
```

## Post-deployment Verification

### Verificar en Producción

1. Ir a `https://tu-dominio.com/cotizar`
2. Reproducir los tests de `TESTING_GRAN_FORMATO.md`
3. Verificar en browser console que no hay errores

### Monitoreo

**Logs de Vercel:**
```bash
vercel logs --tail
```

Buscar:
```
[cotizar] Product loaded
[ConfiguradorGranFormato] Configuration changed
[api/cotizar] Calculating price
```

**Monitoreo de Errores:**

Si tienes Sentry configurado:
- Buscar errores en `/cotizar`
- Verificar que no hay issues de type mismatch
- Monitorear performance de API calls

## Rollback Plan

Si algo falla en producción:

```bash
# Revertir a versión anterior
git revert <commit-hash>
git push origin main

# O revertir deployment específico en Vercel Dashboard
# → Deployments → [seleccionar anterior] → Redeploy
```

## Performance Considerations

### Optimizaciones Aplicadas

- ✅ Caché de productos (1 hora TTL)
- ✅ Select específicos en queries (no include innecesarios)
- ✅ Limite de 100 cotizaciones en admin
- ✅ Skeletons para loading states

### Métricas Esperadas

- **Time to Interactive**: < 2s
- **API Response Time**: < 500ms
- **JavaScript Bundle**: +15KB (configurador)

## Troubleshooting en Producción

### 500 Error en /api/cotizar

**Solución 1: Verificar DATABASE_URL**
```bash
# Conectar a Neon y verificar
psql $DATABASE_URL -c "SELECT COUNT(*) FROM product;"
```

**Solución 2: Verificar Prisma Client**
```bash
# Regenerar
npx prisma generate

# Reiniciar servidor
vercel deployments --tail
```

### Producto no aparece en dropdown

**Solución 1: Verificar que existe**
```sql
SELECT key, nombre, tipo, category 
FROM product 
WHERE tipo = 'gran_formato';
```

**Solución 2: Limpiar caché**
```bash
# Invalidar caché de productos
curl -X POST https://tu-dominio.com/api/admin/invalidar-cache \
  -H "Authorization: Bearer $AUTH_TOKEN"
```

### Precio incorrecto

**Verificar:**
1. `precioPorM2` está en Decimal(10, 2)
2. Cálculo: (ancho × alto / 10000) × precioPorM2
3. IVA se suma correctamente: base × 1.21

**Debug:**
```javascript
// En consola del navegador
console.log({
  anchoCm: 300,
  altoCm: 200,
  areaCm2: 60000,
  areaM2: 6,
  precioPorM2: 7.50,
  precioBase: 45,
  iva: 9.45,
  total: 54.45
})
```

## Security

### Validaciones en Servidor

- ✅ Rango de dimensiones validado
- ✅ Precio por m² verificado vs BD
- ✅ IVA recalculado en servidor
- ✅ SQL Injection prevenido con Prisma

### No se confía en valores del cliente

```typescript
// ❌ MALO - confía en cliente
const precio = req.body.precio

// ✅ BUENO - obtiene de BD
const producto = await getProductByKey(productoKey)
const precio = producto.precioPorM2 * areaM2
```

## Escalabilidad Futura

### Potenciales mejoras

1. **Presets por Cliente**: Guardar configuraciones favoritas
2. **Descuentos Dinámicos**: Basados en volumen (m²)
3. **Notificaciones**: Cuando precio cambia
4. **Historial**: Cotizaciones previas del usuario
5. **PDF Export**: Descargar cotización

### Plan para escalar

- Agregar índices en `category` y `key`
- Implementar Redis para caché distribuido
- Separar API de cálculos en microservicio
- CDN para imágenes de productos

## Documentación Relacionada

- 📄 [GRAN_FORMATO.md](./GRAN_FORMATO.md) - Especificación técnica
- 🧪 [TESTING_GRAN_FORMATO.md](./TESTING_GRAN_FORMATO.md) - Guía de testing
- 📊 [prisma/schema.prisma](./prisma/schema.prisma) - Schema DB
- 🔧 [src/components/ConfiguradorGranFormato.tsx](./src/components/ConfiguradorGranFormato.tsx) - Componente

## Support

Para issues durante deployment:
1. Revisar logs: `vercel logs --tail`
2. Revisar DB: Neon Dashboard
3. Revisar environment variables: Vercel Settings
4. Revertir si es necesario
