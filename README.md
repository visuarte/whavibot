# Visuarte Print Shop - WhatsApp Bot

Aplicación web para cotizaciones de impresión digital con notificaciones WhatsApp via CallMeBot.

## 🚀 Características

- **Cotizador Online**: Calcula precios de productos impresos (tarjetas, flyers, sobres, vinilos, etc.)
- **Subida de Archivos**: Los clientes pueden subir archivos para presupuestos personalizados
- **Notificaciones WhatsApp**: Recibes notificaciones inmediatas de nuevos leads via CallMeBot
- **Dashboard Admin**: Panel para gestionar cotizaciones y leads
- **Base de Datos**: PostgreSQL (Neon/Vercel Postgres)
- **Storage**: Vercel Blob para archivos subidos

## 🛠️ Configuración para Desarrollo Local

### Prerrequisitos
- Node.js 18+
- PostgreSQL (local o Neon)

### Instalación

```bash
# Instalar dependencias
npm install

# Generar cliente Prisma
npx prisma generate

# Ejecutar migraciones
npx prisma migrate deploy

# Iniciar servidor de desarrollo
npm run dev
```

### Variables de Entorno (.env.local)

```env
DATABASE_URL="postgresql://user:pass@localhost:5432/visuarte?sslmode=prefer"
WHATSAPP_PHONE=34616996306
CALLME_BOT_API_KEY=tu_api_key
```

## ☁️ Despliegue en Vercel

### Paso 1: Crear Base de Datos PostgreSQL

1. Ir a [Vercel Dashboard](https://vercel.com/dashboard)
2. Seleccionar proyecto → pestaña **Storage**
3. Click en **Create New** → **Postgres** (elegir Neon o Vercel Postgres)
4. Configurar:
   - Nombre: `visuarte-db`
   - Región: `eu-central-1` (Frankfurt)
5. Click en **Create**

### Paso 2: Crear Storage para Archivos (Vercel Blob)

1. En el mismo proyecto → **Storage**
2. Click en **Create New** → **Blob**
3. Nombre: `visuarte-files`
4. Click en **Create**

### Paso 3: Configurar Environment Variables

Ir a **Settings** → **Environment Variables** y añadir:

| Variable | Valor | Entorno |
|----------|-------|---------|
| `DATABASE_URL` | (generado al crear Postgres) | Production, Preview, Development |
| `WHATSAPP_PHONE` | 34616996306 | Production, Preview, Development |
| `CALLME_BOT_API_KEY` | (tu API key de callmebot.com) | Production, Preview, Development |
| `BLOB_READ_WRITE_TOKEN` | (generado al crear Blob) | Production, Preview, Development |

### Paso 4: Desplegar

```bash
# Hacer push a GitHub
git add .
git commit -m "feat: PostgreSQL + Vercel Blob + Admin Dashboard"
git push origin main
```

Vercel detectará automáticamente el cambio y desplegará. El script `vercel-build` en `package.json` ejecutará:
1. `prisma generate`
2. `prisma migrate deploy`
3. `next build`

## 📱 Usar en Producción

### Dashboard Admin
- URL: `https://tu-proyecto.vercel.app/admin`
- Password: `visuarte2026`

### Rutas Principales
- **Home**: `/` - Landing page
- **Cotizar**: `/cotizar` - Herramienta de cotización
- **Enviar Archivo**: `/enviar-archivo` - Subir archivo para presupuesto
- **Admin**: `/admin` - Dashboard de gestión

## 📋 Estructura del Proyecto

```
├── prisma/
│   └── schema.prisma    # Schema de base de datos
├── src/
│   ├── app/
│   │   ├── api/         # API routes
│   │   │   ├── cotizar/
│   │   │   ├── leads/
│   │   │   └── admin/
│   │   ├── admin/       # Dashboard admin
│   │   ├── cotizar/     # Página de cotización
│   │   └── page.tsx     # Home page
│   └── lib/
│       ├── db.ts        # Funciones de base de datos
│       ├── precios.ts   # Lógica de precios
│       └── sendWhatsAppNotification.ts
└── .env                 # Variables de entorno
```

## 🔧 Scripts Disponibles

```bash
npm run dev          # Desarrollo local (puerto 3333)
npm run build       # Build para producción
npm run start       # Iniciar producción
npm run vercel-build # Build para Vercel (generates + migrate + build)
npm run db:generate # Generar Prisma client
npm run db:push     # Push schema a DB
```

## 📄 Licencia

MIT
