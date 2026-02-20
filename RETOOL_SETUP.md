# Guía de Configuración - Retool + Neon PostgreSQL

## Paso 1: Obtener la Connection String de Neon

1. Ve a [Neon Console](https://console.neon.tech/)
2. Selecciona tu proyecto **whavibot**
3. Ve a **Dashboard** → **Connection Details**
4. Copia la URL de conexión (debe ser algo como):
   ```
   postgresql://username:password@ep-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require
   ```

## Paso 2: Crear cuenta en Retool

1. Ve a [Retool](https://retool.com/)
2. Regístrate con tu cuenta de Google o email
3. Crea una cuenta gratuita (gratis para 5 usuarios)

## Paso 3: Conectar Base de Datos

1. En Retool, ve a **Resources** → **+ Create New** → **Database**
2. Selecciona **PostgreSQL**
3. Configura la conexión:

   | Campo | Valor |
   |-------|-------|
   | Name | Whavibot DB |
   | Host | `ep-xxx.us-east-1.aws.neon.tech` (sin https://) |
   | Port | `5432` |
   | Database name | `neondb` |
   | Username | Tu usuario de Neon |
   | Password | Tu contraseña de Neon |
   | SSL | ✅ Enabled |
   | SSL Mode | `require` |

4. Click **Test Connection** → debe mostrar "Success"
5. Click **Create Resource**

## Paso 4: Crear Dashboard

### 4.1 Crear tabla de Leads

1. Ve a **Apps** → **+ Create New** → **Start from scratch**
2. Arrastra un componente **Table** al canvas
3. En el panel derecho, configura el **Data source**:
   - Selecciona tu resource **Whavibot DB**
   - Escribe la query SQL:
   ```sql
   SELECT 
     id,
     nombre,
     email,
     telefono,
     producto,
     mensaje,
     created_at,
     notificado
   FROM "Lead"
   ORDER BY created_at DESC
   ```
4. Click **Preview** para ver los datos

### 4.2 Crear panel de estadísticas

1. Añade un componente **Text** para títulos
2. Añade componentes **Stat** para métricas:
   - **Total Leads**: `SELECT COUNT(*) FROM "Lead"`
   - **Leads hoy**: `SELECT COUNT(*) FROM "Lead" WHERE DATE(created_at) = CURRENT_DATE`
   - **Pendientes**: `SELECT COUNT(*) FROM "Lead" WHERE notificado = false`

### 4.3 Crear acciones

1. **Botón "Marcar como notificado"**:
   - Añade un componente **Button**
   - En **On Click** → **Add action** → **Run database query**
   ```sql
   UPDATE "Lead" 
   SET notificado = true 
   WHERE id = {{ table1.selectedRow.id }}
   ```
   - Añade **Refresh table** después del update

2. **Botón "Eliminar lead"**:
   ```sql
   DELETE FROM "Lead" WHERE id = {{ table1.selectedRow.id }}
   ```

## Paso 5: Configurar Permisos (Opcional)

Si quieres que otros usuarios puedan acceder:
1. Ve a **Settings** → **Sharing**
2. Invita por email a otros usuarios
3. Asigna permisos apropiados

## Estructura Recomendada del Dashboard

```
┌─────────────────────────────────────────────────┐
│  📊 DASHBOARD WHAVIBOT                          │
├─────────────────────────────────────────────────┤
│  ┌─────────┐ ┌─────────┐ ┌─────────┐            │
│  │ Total   │ │ Hoy     │ │ Pendien.│            │
│  │ Leads   │ │ Leads   │ │ tes     │            │
│  │   150   │ │    12   │ │    5    │            │
│  └─────────┘ └─────────┘ └─────────┘            │
├─────────────────────────────────────────────────┤
│  🔍 Búsqueda: [__________] [Buscar]             │
├─────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────┐   │
│  │ Tabla de Leads                           │   │
│  │ [Nombre] [Email] [Producto] [Fecha] ... │   │
│  │ ─────────────────────────────────────────│   │
│  │ Juan    | juan@.. | Lonas     | 20/02.. │   │
│  │ María   | maria@..| Flyers    | 19/02.. │   │
│  └─────────────────────────────────────────┘   │
├─────────────────────────────────────────────────┤
│  [✓ Notificar]  [🗑 Eliminar]  [📤 Exportar]   │
└─────────────────────────────────────────────────┘
```

## Alternativa: Conectar a API REST

Si prefieres no exponer la base de datos directamente, podemos crear endpoints API en Next.js que Retool consuma:

```typescript
// src/app/api/retool/leads/route.ts
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: 'desc' }
  })
  return NextResponse.json(leads)
}
```

---

## Costos

| Plataforma | Plan Gratis |
|------------|-------------|
| Retool | 5 usuarios, apps ilimitadas |
| Neon | 0.5GB storage, 1 proyecto |

**Total: $0/mes** para comenzar.
