# 🚀 Guía de Deploy - Whavibot (Visuarte Print Shop)

## Estado Actual
- Next.js 16.1.6 + Prisma + NextAuth
- 21 productos en DB (SQLite local)
- Calculadora con redondeo psicológico
- Dashboard admin protegido

---

## Pasos para Deploy en Vercel

### 1️⃣ Crear Proyecto en Vercel

```bash
# Instalar Vercel CLI (opcional)
npm i -g vercel

# O ir a https://vercel.com/new y conectar tu repositorio GitHub
```

### 2️⃣ Crear Base de Datos PostgreSQL

**Opción A: Vercel Postgres (推荐)**
1. Ir a Vercel Dashboard → Storage → Create New → Postgres
2. Nombre: `visuarte-db`
3. Región: `eu-central-1` (Frankfurt)
4. Copiar DATABASE_URL generada

**Opción B: Neon (Gratis)**
1. Ir a https://neon.tech
2. Crear proyecto: `visuarte`
3. Copiar connection string: `postgresql://user:pass@ep-xxx.eu-central-1.aws.neon.tech/visuarte?sslmode=require`

### 3️⃣ Configurar Variables en Vercel

Ir a **Settings → Environment Variables** y añadir:

| Variable | Valor | Ejemplo |
|----------|-------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://...` |
| `NEXTAUTH_SECRET` | Generated secret | `openssl rand -base64 32` |
| `NEXTAUTH_URL` | Production URL | `https://tu-proyecto.vercel.app` |
| `WHATSAPP_PHONE` | Tu número | `34616996306` |
| `CALLMEBOT_APIKEY` | Tu API key | `1577042` |

### 4️⃣ Hacer Push del Código

```bash
git add .
git commit -m "feat: Production ready with PostgreSQL"
git push origin main
```

Vercel hará deploy automáticamente.

### 5️⃣ Ejecutar Migraciones en Producción

```bash
# En Vercel (usando Rails runner o similar)
npx prisma migrate deploy
```

O ejecutar desde el dashboard de Vercel.

### 6️⃣ Seed de Productos (Primera vez)

```bash
npx prisma db seed
```

---

## ✅ Checklist de Verificación

### Después del deploy, prueba:

- [ ] **Homepage carga** - https://tu-proyecto.vercel.app
- [ ] **Calculadora funciona** - Elige producto, cantidad, verifica precio
- [ ] **Redondeo psicológico** - El precio debe terminar en .99
- [ ] **Login admin** - https://tu-proyecto.vercel.app/login
  - Email: `visuarte.creativos@gmail.com`
  - Password: `malboro2026`
- [ ] **Dashboard muestra datos** - Cotizaciones y leads
- [ ] **Test WhatsApp** - Envía una cotización y verifica que llega mensaje
- [ ] **Subida de archivos** - Prueba en /enviar-archivo

---

## 🔧 Configuración Local para Desarrollo

```bash
# Instalar dependencias
npm install

# Generar Prisma Client
npx prisma generate

# Migrar DB (SQLite local)
npx prisma migrate dev

# Seed de datos
npm run db:seed

# Iniciar servidor
npm run dev
```

---

## 📱 Configurar WhatsApp (CallMeBot)

1. Ir a https://api.callmebot.com/whatsapp.php
2. Seguir instrucciones para obtener API key
3. Añadir `CALLMEBOT_APIKEY` en variables de entorno
4. El número debe estar en formato internacional sin +

---

## 🛠️ Solución de Problemas

### Error de conexión a DB
- Verificar DATABASE_URL es correcta
- Asegurar que PostgreSQL permite conexiones externas

### WhatsApp no llega
- Verificar API key correcta
- Verificar número de teléfono formato: `34616996306` (sin +)

### Build falla
- Ejecutar `npm run build` localmente primero
- Verificar todas las dependencias instaladas

---

## 📝 Notas

- El redondeo psicológico convierte precios técnicos a comerciales (ej: 84.09 → 89.99)
- Los precios se guardan en la tabla `Cotizacion` con campos: base, iva, total
- Los productos están en tablas `Product` y `ProductPrice`
