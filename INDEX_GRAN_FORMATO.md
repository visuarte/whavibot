# 📚 Índice de Documentación - Configurador Gran Formato

## 🚀 Empezar Rápido

👉 **Comienza aquí:** [`QUICKSTART_GRAN_FORMATO.md`](./QUICKSTART_GRAN_FORMATO.md) (5 min)
- Requisitos mínimos
- Agregar productos
- Test básico
- Deploy

---

## 📖 Documentación por Rol

### Para Desarrolladores

1. **Especificación Técnica** → [`GRAN_FORMATO.md`](./GRAN_FORMATO.md)
   - Cómo funciona el sistema
   - Tipos de productos
   - Configuración en BD
   - Componentes
   - Lógica de cálculo
   - Ejemplos de respuesta API

2. **Testing Completo** → [`TESTING_GRAN_FORMATO.md`](./TESTING_GRAN_FORMATO.md)
   - Setup de testing
   - Casos de prueba
   - Verificación en console
   - Network debugging
   - Problemas comunes

3. **Deployment** → [`DEPLOYMENT_GRAN_FORMATO.md`](./DEPLOYMENT_GRAN_FORMATO.md)
   - Pre-deployment checklist
   - Pasos de deployment
   - Variables de entorno
   - Verificación post-deploy
   - Troubleshooting

### Para Administradores/Datos

1. **Agregar Productos** → [`SQL_GRAN_FORMATO.sql`](./SQL_GRAN_FORMATO.sql)
   - Ejemplos SQL listos para ejecutar
   - 7 productos de ejemplo (flexible + rígido)
   - Verificación de datos

2. **Quick Start** → [`QUICKSTART_GRAN_FORMATO.md`](./QUICKSTART_GRAN_FORMATO.md)
   - Script de seed automático
   - Verificación rápida
   - Pasos simples

### Para Usuarios Finales / Soporte

1. **Preguntas Frecuentes** → [`FAQ_GRAN_FORMATO.md`](./FAQ_GRAN_FORMATO.md)
   - Cómo funciona (general)
   - Cálculos explicados
   - Validación y límites
   - Troubleshooting básico
   - Soporte

2. **Quick Start** → [`QUICKSTART_GRAN_FORMATO.md`](./QUICKSTART_GRAN_FORMATO.md)
   - Guía visual del flujo
   - Ejemplo práctico
   - Checklist rápido

---

## 📋 Documentos

| Documento | Público | Técnico | Tamaño | Lectura |
|-----------|---------|---------|--------|---------|
| [`QUICKSTART_GRAN_FORMATO.md`](#-empezar-rápido) | ✅ | ⭐ | 5 min | Essential |
| [`FAQ_GRAN_FORMATO.md`](#para-usuarios-finales--soporte) | ✅ | ⭐⭐ | 10 min | Consulta |
| [`GRAN_FORMATO.md`](#documentación-por-rol) | ❌ | ⭐⭐⭐ | 15 min | Essential |
| [`TESTING_GRAN_FORMATO.md`](#para-desarrolladores) | ❌ | ⭐⭐⭐ | 20 min | Essential |
| [`DEPLOYMENT_GRAN_FORMATO.md`](#para-desarrolladores) | ❌ | ⭐⭐⭐ | 15 min | Essential |
| [`SQL_GRAN_FORMATO.sql`](#para-administradoresdatos) | ❌ | ⭐⭐ | Ejecutar | Consulta |
| [`RESUMEN_GRAN_FORMATO.md`](#documentación-por-rol) | ✅ | ⭐⭐ | 10 min | Overview |
| `INDEX_GRAN_FORMATO.md` (este archivo) | ✅ | ⭐ | 5 min | Nav |

---

## 🎯 Rutas de Aprendizaje

### 👨‍💻 Nuevo Desarrollador

```
1. QUICKSTART_GRAN_FORMATO.md      ← Entender qué es
2. GRAN_FORMATO.md                  ← Especificación técnica
3. TESTING_GRAN_FORMATO.md          ← Cómo testear
4. Explorar código en: src/components/ConfiguradorGranFormato.tsx
5. DEPLOYMENT_GRAN_FORMATO.md       ← Cómo deployar
```

### 📊 Administrador de BD

```
1. QUICKSTART_GRAN_FORMATO.md       ← Entender el sistema
2. SQL_GRAN_FORMATO.sql             ← Copiar/pegar ejemplos
3. GRAN_FORMATO.md § Agregar Nuevos Productos  ← Sintaxis
4. FAQ_GRAN_FORMATO.md § Validación ← Verificar límites
```

### 🎓 Estudiante / Aprendiz

```
1. QUICKSTART_GRAN_FORMATO.md       ← Overview
2. FAQ_GRAN_FORMATO.md              ← Preguntas comunes
3. TESTING_GRAN_FORMATO.md § Test Rápido  ← Probar
4. GRAN_FORMATO.md § Ejemplo de Cálculo  ← Profundizar
```

### 🆘 Troubleshooting

```
1. FAQ_GRAN_FORMATO.md § Troubleshooting  ← Problemas comunes
2. DEPLOYMENT_GRAN_FORMATO.md § Troubleshooting  ← En producción
3. TESTING_GRAN_FORMATO.md § Verificación  ← Debug
4. GRAN_FORMATO.md § Validaciones  ← Entender reglas
```

---

## 📂 Estructura de Carpetas

```
root/
├── QUICKSTART_GRAN_FORMATO.md        ⭐ Comienza aquí
├── FAQ_GRAN_FORMATO.md               (Preguntas frecuentes)
├── GRAN_FORMATO.md                   (Especificación técnica)
├── TESTING_GRAN_FORMATO.md           (Testing)
├── DEPLOYMENT_GRAN_FORMATO.md        (Deployment)
├── SQL_GRAN_FORMATO.sql              (Ejemplos SQL)
├── RESUMEN_GRAN_FORMATO.md           (Overview)
├── INDEX_GRAN_FORMATO.md             (este archivo)
│
├── src/
│   ├── app/cotizar/
│   │   └── page.tsx                  (Página de cotización)
│   │
│   ├── components/
│   │   └── ConfiguradorGranFormato.tsx   (Componente principal)
│   │
│   └── lib/
│       ├── precios.ts                (Lógica de cálculos)
│       ├── types.ts                  (TypeScript types)
│       └── db.ts                     (Database queries)
│
├── prisma/
│   └── schema.prisma                 (Database schema)
│
└── scripts/
    └── seed-gran-formato.ts          (Script de seed)
```

---

## 🔍 Búsqueda Rápida

### Por Tema

**Cálculos:**
- GRAN_FORMATO.md § Especificación de Cálculo
- FAQ_GRAN_FORMATO.md § Cálculos
- QUICKSTART_GRAN_FORMATO.md § Ejemplo Rápido

**Productos:**
- GRAN_FORMATO.md § Tipos de Productos
- SQL_GRAN_FORMATO.sql § Ejemplos
- FAQ_GRAN_FORMATO.md § General

**Validación:**
- GRAN_FORMATO.md § Validaciones
- FAQ_GRAN_FORMATO.md § Validación
- TESTING_GRAN_FORMATO.md § Casos Edge

**Testing:**
- TESTING_GRAN_FORMATO.md (documento completo)
- QUICKSTART_GRAN_FORMATO.md § Test Rápido

**Deployment:**
- DEPLOYMENT_GRAN_FORMATO.md (documento completo)
- QUICKSTART_GRAN_FORMATO.md § Deploy

**Errores:**
- FAQ_GRAN_FORMATO.md § Troubleshooting
- DEPLOYMENT_GRAN_FORMATO.md § Troubleshooting
- TESTING_GRAN_FORMATO.md § Problemas Comunes

---

## 🎬 Escenarios Comunes

### Escenario 1: "Quiero empezar ya"
```
1. QUICKSTART_GRAN_FORMATO.md (5 min)
2. npm run dev
3. http://localhost:3000/cotizar
4. ¡Hecho!
```

### Escenario 2: "Necesito agregar productos"
```
1. SQL_GRAN_FORMATO.sql
2. Copiar/pegar a Neon
3. Execute
4. Refrescar /cotizar
```

### Escenario 3: "No funciona, ¿qué hago?"
```
1. FAQ_GRAN_FORMATO.md § Troubleshooting
2. Si es en producción: DEPLOYMENT_GRAN_FORMATO.md § Troubleshooting
3. Si es testing: TESTING_GRAN_FORMATO.md § Problemas Comunes
```

### Escenario 4: "Necesito entender el código"
```
1. GRAN_FORMATO.md § Cómo Funciona
2. Ver src/components/ConfiguradorGranFormato.tsx
3. Ver src/app/cotizar/page.tsx
4. GRAN_FORMATO.md § Componentes
```

### Escenario 5: "Voy a deployar a producción"
```
1. DEPLOYMENT_GRAN_FORMATO.md (checklist pre-deployment)
2. TESTING_GRAN_FORMATO.md (verificar todo funciona)
3. DEPLOYMENT_GRAN_FORMATO.md (pasos deployment)
4. DEPLOYMENT_GRAN_FORMATO.md (verificación post-deployment)
```

---

## 📞 Preguntas Rápidas

**¿Cómo agrego un producto?**
→ [`SQL_GRAN_FORMATO.sql`](./SQL_GRAN_FORMATO.sql) o [`QUICKSTART_GRAN_FORMATO.md`](./QUICKSTART_GRAN_FORMATO.md)

**¿Cómo funciona el cálculo?**
→ [`GRAN_FORMATO.md § Especificación de Cálculo`](./GRAN_FORMATO.md) o [`FAQ_GRAN_FORMATO.md § Cálculos`](./FAQ_GRAN_FORMATO.md)

**¿Cuáles son los límites?**
→ [`FAQ_GRAN_FORMATO.md § Validación`](./FAQ_GRAN_FORMATO.md)

**¿Cómo testeo?**
→ [`TESTING_GRAN_FORMATO.md`](./TESTING_GRAN_FORMATO.md)

**¿Cómo deployar?**
→ [`DEPLOYMENT_GRAN_FORMATO.md`](./DEPLOYMENT_GRAN_FORMATO.md)

**¿Qué archivo edito?**
→ [`GRAN_FORMATO.md § Componentes`](./GRAN_FORMATO.md)

**¿El precio es correcto?**
→ [`FAQ_GRAN_FORMATO.md § Cálculos`](./FAQ_GRAN_FORMATO.md)

**¿Algo no funciona?**
→ [`FAQ_GRAN_FORMATO.md § Troubleshooting`](./FAQ_GRAN_FORMATO.md)

---

## 🎓 Vocabulario

| Término | Significado |
|---------|------------|
| **Gran Formato** | Productos personalizables por dimensiones (ancho × alto) |
| **Flexible** | Lonas y telas (100% ancho × alto configurable) |
| **Rígido** | Paneles y acrílicos (mayor limitación de tamaño) |
| **Configuración** | Estado con dimensiones (ancho, alto, m²) |
| **Base** | Precio sin IVA |
| **IVA** | Impuesto sobre el valor agregado (21% en España) |
| **Total** | Precio final con IVA incluido |
| **Preset** | Botón rápido para tamaños estándar (DIN A0, A1, etc.) |
| **m²** | Metro cuadrado (unidad de área) |
| **Seed** | Datos iniciales en la BD |

---

## ✅ Checklist de Lectura

Marca los documentos que has leído:

```
Según tu rol:

[ ] Yo soy Desarrollador
    [ ] QUICKSTART_GRAN_FORMATO.md
    [ ] GRAN_FORMATO.md
    [ ] TESTING_GRAN_FORMATO.md
    [ ] DEPLOYMENT_GRAN_FORMATO.md

[ ] Yo soy Administrador
    [ ] QUICKSTART_GRAN_FORMATO.md
    [ ] SQL_GRAN_FORMATO.sql
    [ ] FAQ_GRAN_FORMATO.md § General

[ ] Yo soy Soporte
    [ ] FAQ_GRAN_FORMATO.md (completo)
    [ ] QUICKSTART_GRAN_FORMATO.md
    [ ] RESUMEN_GRAN_FORMATO.md

[ ] Yo soy Estudiante
    [ ] QUICKSTART_GRAN_FORMATO.md
    [ ] FAQ_GRAN_FORMATO.md
    [ ] GRAN_FORMATO.md
```

---

## 📞 Contacto y Soporte

- **Issues Técnicos:** technical@visuarte.com
- **Feature Requests:** features@visuarte.com
- **Soporte General:** support@visuarte.com

---

## 📜 Historial de Cambios

| Versión | Fecha | Cambios |
|---------|-------|---------|
| 1.0 | 2026-02-20 | Documentación inicial completa |

---

## 🎉 ¡Listo para Empezar!

1. **Nuevo**: Comienza con [`QUICKSTART_GRAN_FORMATO.md`](./QUICKSTART_GRAN_FORMATO.md)
2. **Desarrollador**: Lee [`GRAN_FORMATO.md`](./GRAN_FORMATO.md)
3. **Testing**: Sigue [`TESTING_GRAN_FORMATO.md`](./TESTING_GRAN_FORMATO.md)
4. **Deploy**: Ejecuta [`DEPLOYMENT_GRAN_FORMATO.md`](./DEPLOYMENT_GRAN_FORMATO.md)

---

**Última actualización:** 2026-02-20
**Versión:** 1.0
**Status:** ✅ Completa y lista para producción
