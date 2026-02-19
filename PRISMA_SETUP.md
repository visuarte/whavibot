# Visuarte Print Shop - Configuración de Prisma + PostgreSQL

Este documento describe cómo configurar Prisma con PostgreSQL (Vercel/Neon/Supabase) para producción y SQLite para desarrollo local.

## 📋 Requisitos Previos

- Node.js 18+
- npm o yarn
- Cuenta de Vercel (para producción) o PostgreSQL local

---

## 🚀 Configuración para Desarrollo Local (SQLite)

### 1. Instalar dependencias

```bash
npm install prisma @prisma/client --save
npm install tsx @types/node --save-dev
```

### 2. Inicializar Prisma

```bash
npx prisma init --datasource-provider sqlite
```

Esto crea:
- `prisma/schema.prisma`
- `.env`

### 3. Configurar el schema

Edita `prisma/schema.prisma` con los modelos necesarios (ya incluido en este proyecto).

### 4. Ejecutar migración

```bash
npx prisma migrate dev --name init
```

Esto crea la base de datos SQLite en `prisma/dev.db`.

### 5. Ejecutar seed

El seed SQL está en `prisma/seed.sql`:

```bash
# Para SQLite, puedes usar sqlite3 directamente
sqlite3 prisma/dev.db < prisma/seed.sql

# O con Prisma (si tienes problemas, usa el método anterior)
npx prisma db execute --sql "$(cat prisma/seed.sql)"
```

### 6. Ver datos con Prisma Studio

```bash
npx prisma studio
```

---

## ☁️ Configuración para Producción (PostgreSQL)

### Opción 1: Vercel + Vercel Postgres

1. **Crear proyecto en Vercel**
   ```bash
   vercel
   ```

2. **Crear base de datos Postgres**
   - Ve a Vercel Dashboard → Storage → Marketplace
   - Elige "Vercel Postgres" o "Neon" o "Supabase"
   - Sigue las instrucciones para crear la DB

3. **Conectar al proyecto**
   - Vercel agregará automáticamente `DATABASE_URL` a tu proyecto
   - La variable se configura en Settings → Environment Variables

### Opción 2: Neon (neon.tech)

1. **Crear cuenta en neon.tech**
2. **Crear proyecto** → "Visuarte Print Shop"
3. **Copiar connection string**:
   ```
   postgresql://user:password@ep-xxx.us-east-1.aws.neon.tech/visuarte?sslmode=require
   ```

### Opción 3: Supabase

1. **Crear cuenta en supabase.com**
2. **Crear nuevo proyecto**
3. **Settings → Database → Connection string**

---

## 🔧 Configuración del Entorno

### Desarrollo Local (.env)

```env
# SQLite para desarrollo
DATABASE_URL="file:prisma/dev.db"

# CallMeBot (obtén tu API key en https://api.callmebot.com/)
CALLME_BOT_API_KEY="tu_api_key"
CALLME_BOT_PHONE="+34600000000"
```

### Producción (.env) - Vercel

```env
# PostgreSQL (configurado automáticamente por Vercel)
DATABASE_URL="postgresql://..."

# CallMeBot
CALLME_BOT_API_KEY="tu_api_key"
CALLME_BOT_PHONE="+34600000000"
```

---

## 📦 Estructura de Modelos

### Product
```prisma
model Product {
  id          String   @id @default(uuid())
  key         String   @unique
  nombre      String
  descripcion String?
  tipo        String   // "cantidad_fija" o "por_m2"
  precioPorM2 Float?
  unidad      String   // "uds" o "m²"
  precios     ProductPrice[]
  cotizaciones Cotizacion[]
}
```

### ProductPrice
```prisma
model ProductPrice {
  id         String  @id @default(uuid())
  productId  String
  cantidad   Int
  precioBase Float
  variante   String? // Para productos con variantes (ej: sobres)
  product    Product @relation(...)
}
```

### Cotizacion
```prisma
model Cotizacion {
  id          String   @id @default(uuid())
  productId   String
  cantidad    Int?
  areaM2      Float?
  base        Float
  iva         Float
  total       Float
  leadScoring String  // "tibio" o "caliente"
  product     Product @relation(...)
  lead        Lead?   @relation(...)
}
```

### Lead
```prisma
model Lead {
  id             String    @id @default(uuid())
  cotizacionId   String?   @unique
  archivoNombre  String?
  archivoPath    String?
  archivoSize    Int?
  archivoType    String?
  mensaje        String?
  leadScoring    String
  notificado     Boolean   @default(false)
  notificadoAt   DateTime?
  cotizacion     Cotizacion? @relation(...)
}
```

---

## 🔄 Migrar de SQLite a PostgreSQL

### Método 1: Exportar/Importar

1. **Exportar datos de SQLite**
   ```bash
   sqlite3 prisma/dev.db ".dump" > backup.sql
   ```

2. **Transformar SQL para PostgreSQL** (si es necesario)
   - Cambiar `uuid()` por `gen_random_uuid()` o usar extensiones
   - Ajustar tipos de datos

3. **Importar en PostgreSQL**
   ```bash
   psql $DATABASE_URL < backup.sql
   ```

### Método 2: Prisma Migrate

```bash
# Cambiar provider en schema.prisma a postgresql
# Actualizar DATABASE_URL en .env
# Ejecutar migrate
npx prisma migrate dev --name init
# Luego ejecutar seed
npx prisma db execute --sql "$(cat prisma/seed.sql)"
```

---

## 🎯 Uso en el Código

### Importar Prisma Client

```typescript
import { prisma } from '@/lib/prisma'

// Obtener productos
const products = await prisma.product.findMany()

// Obtener precios de un producto
const precios = await prisma.productPrice.findMany({
  where: { productId: product.id }
})

// Crear cotización
const cotizacion = await prisma.cotizacion.create({
  data: {
    productId: product.id,
    cantidad: 500,
    base: 85.30,
    iva: 17.91,
    total: 103.21,
    leadScoring: 'tibio'
  }
})
```

---

## 📝 Comandos Útiles

```bash
# Generar cliente Prisma
npx prisma generate

# Crear migración
npx prisma migrate dev --name nombre_migracion

# Aplicar migraciones en producción
npx prisma migrate deploy

# Studio de desarrollo
npx prisma studio

# Resetear base de datos (desarrollo)
npx prisma migrate reset
```

---

## ⚠️ Notas Importantes

1. **Prisma 7**: La versión 7 de Prisma cambió la API. Si tienes problemas:
   - Usa `npx prisma@6 generate` para versión anterior
   - O configura el adapter correctamente

2. **SQLite vs PostgreSQL**: 
   - SQLite: Mejor para desarrollo local
   - PostgreSQL: Necesario para producción con Vercel

3. **Seed**: Si el seed de TypeScript falla, usa el SQL directo en `prisma/seed.sql`

4. **Environment Variables**: 
   - Nunca commitees `.env` al repositorio
   - Usa `.env.example` para documentar variables requeridas

---

## 🔗 Recursos

- [Documentación de Prisma](https://www.prisma.io/docs)
- [Vercel Storage](https://vercel.com/storage)
- [Neon Database](https://neon.tech)
- [Supabase](https://supabase.com)
- [CallMeBot API](https://api.callmebot.com/)
