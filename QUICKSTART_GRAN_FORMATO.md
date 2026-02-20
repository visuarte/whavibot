# Quick Start - Configurador Gran Formato

## ⚡ 5 Minutos para Empezar

### 1. Verificar Requisitos (1 min)

```bash
# ✅ Verificar que AUTH_SECRET esté configurado
echo $AUTH_SECRET

# ✅ Verificar conexión BD
psql $DATABASE_URL -c "SELECT COUNT(*) FROM product;"
```

### 2. Agregar Productos (2 min)

**Opción A - Automático:**
```bash
npx ts-node scripts/seed-gran-formato.ts
```

**Opción B - Manual:**
1. Ir a Neon Dashboard
2. SQL Editor
3. Copiar/pegar contenido de `SQL_GRAN_FORMATO.sql`
4. Execute

### 3. Probar en Desarrollo (1 min)

```bash
npm run dev
```

Ir a: `http://localhost:3000/cotizar`

1. Seleccionar **"Lona Flexible PVC 280g"** (o similar)
2. Ingresa **300 cm** de ancho
3. Ingresa **200 cm** de alto
4. Deberías ver **6.00 m²** y **€45.00**
5. Click "Confirmar y Calcular Precio"
6. Verás: **€54.45 con IVA incluido** ✓

### 4. Deploy (1 min)

```bash
git add .
git commit -m "feat: gran formato configurador"
git push origin main
# Vercel despliega automáticamente
```

---

## 📋 Checklist Rápido

```
✓ AUTH_SECRET configurado
✓ DATABASE_URL válida
✓ Productos en BD (seed ejecutado)
✓ /cotizar carga sin errores
✓ Configurador aparece al seleccionar gran formato
✓ Cálculos son correctos
✓ IVA se suma correctamente
✓ Deploy a producción OK
```

---

## 🎯 Flujo Visual

```
┌─────────────────────────┐
│   Usuario va a /cotizar │
└────────────┬────────────┘
             │
             ▼
    ┌────────────────────┐
    │ Dropdown Productos │
    └────────┬───────────┘
             │
    ┌────────┴─────────────────────────────┐
    │ Selecciona "Lona Flexible" (o similar)
    │
    ▼
┌─────────────────────────────┐
│ ConfiguradorGranFormato      │
│ ┌─────────────────────────┐ │
│ │ Ancho (cm): [300] ____  │ │
│ │ Alto (cm):  [200] ____  │ │
│ │ Área: 6.00 m² 📊       │ │
│ │ Precio Base: €45.00    │ │
│ │                        │ │
│ │ [Confirmar] [Presets] │ │
│ └─────────────────────────┘ │
└─────────────────────────────┘
             │
             ▼
    ┌────────────────────────┐
    │ Cálculo de Precio      │
    │ Base: €45.00           │
    │ IVA:  €9.45            │
    │ TOTAL: €54.45          │
    │                        │
    │ [Solicitar Presupuesto]│
    └────────────────────────┘
```

---

## 🔢 Ejemplo Rápido

**Entrada:**
```
Producto: Lona Flexible PVC 280g (€7.50/m²)
Ancho: 300 cm
Alto: 200 cm
```

**Salida:**
```
Área: 6.00 m²
Base (sin IVA): €45.00
IVA (21%): €9.45
TOTAL: €54.45 ✓
```

---

## 🧪 Test Rápido

### Test 1 - Ingreso Manual
```
✓ Ancho: 150 cm
✓ Alto: 100 cm
✓ Esperado: 1.50 m² × €7.50 = €11.25 + IVA = €13.61
```

### Test 2 - Preset A1
```
✓ Click "DIN A1"
✓ Campos se llenan automáticamente
✓ Se calcula correctamente
```

### Test 3 - Cambiar Producto
```
✓ Selecciona "Foam Board 5mm" (€7.99/m²)
✓ Configurador se actualiza
✓ Precios recalculan correctamente
```

---

## 📁 Archivos Importantes

```
src/
  ├── app/cotizar/page.tsx          ← Página principal
  ├── components/ConfiguradorGranFormato.tsx  ← Configurador
  └── lib/precios.ts                ← Lógica de cálculo

prisma/
  └── schema.prisma                 ← Base de datos

scripts/
  └── seed-gran-formato.ts          ← Poblar BD

docs/
  ├── GRAN_FORMATO.md               ← Documentación técnica
  ├── TESTING_GRAN_FORMATO.md       ← Testing completo
  ├── DEPLOYMENT_GRAN_FORMATO.md    ← Deployment
  ├── FAQ_GRAN_FORMATO.md           ← Preguntas frecuentes
  └── RESUMEN_GRAN_FORMATO.md       ← Resumen
```

---

## 🚨 Si Algo Falla

### Configurador no aparece
```
1. Verificar: tipo = 'gran_formato' en BD
2. Verificar: category = 'gran_formato_flexible' o 'gran_formato_rigido'
3. Refrescar página (Ctrl+F5)
```

### Precio incorrecto
```
1. Verificar: precioPorM2 está en Decimal(10,2)
2. Verificar cálculo: m² × precio/m² = base
3. Abrir console (F12) para ver logs
```

### 500 Error
```
1. Verificar DATABASE_URL
2. npx prisma generate
3. npx prisma migrate deploy
4. Reiniciar servidor
```

---

## 📚 Documentación Completa

| Documento | Contenido |
|-----------|-----------|
| `GRAN_FORMATO.md` | Especificación técnica completa |
| `TESTING_GRAN_FORMATO.md` | Casos de prueba detallados |
| `DEPLOYMENT_GRAN_FORMATO.md` | Guía paso a paso para deploy |
| `SQL_GRAN_FORMATO.sql` | Ejemplos SQL para agregar productos |
| `FAQ_GRAN_FORMATO.md` | Preguntas frecuentes |
| `RESUMEN_GRAN_FORMATO.md` | Resumen de implementación |

---

## 🎓 Próximos Pasos

### Ya Funcionando ✓
- ✅ Configuración de dimensiones
- ✅ Cálculo automático de m²
- ✅ Precios con IVA
- ✅ Presets estándar
- ✅ Validación de límites

### Mejoras Opcionales
- [ ] Descuentos por volumen
- [ ] Guardador de configuraciones
- [ ] PDF export
- [ ] Historial de cotizaciones
- [ ] Carrito de compras

---

## 💬 Soporte

**¿Problema?**
1. Revisar esta guía
2. Revisar `FAQ_GRAN_FORMATO.md`
3. Revisar logs: `vercel logs --tail`
4. Contactar: soporte@visuarte.com

**¿Feature request?**
- Email: features@visuarte.com
- Include: descripción, use case, ejemplo

---

## ✨ ¡Listo!

Tu configurador de gran formato está funcionando. 

**Ahora puedes:**
1. ✅ Ir a `/cotizar`
2. ✅ Seleccionar gran formato
3. ✅ Configurar dimensiones
4. ✅ Ver precios automáticamente
5. ✅ Obtener cotizaciones

**¿Necesitas agregar más productos?** → Revisa `SQL_GRAN_FORMATO.sql`

**¿Necesitas testing completo?** → Revisa `TESTING_GRAN_FORMATO.md`

**¿Listo para producción?** → Revisa `DEPLOYMENT_GRAN_FORMATO.md`
