-- Schema for Neon PostgreSQL
-- Run: npx tsx scripts/init-db.ts

-- Product table
CREATE TABLE IF NOT EXISTS product (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key VARCHAR(255) UNIQUE NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    tipo VARCHAR(50) NOT NULL,
    "precioPorM2" DECIMAL(10,2),
    unidad VARCHAR(50) NOT NULL,
    category VARCHAR(100),
    material VARCHAR(255),
    "sizeOptions" JSONB,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- Product Price table
CREATE TABLE IF NOT EXISTS product_price (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "productId" UUID REFERENCES product(id) ON DELETE CASCADE,
    cantidad INTEGER NOT NULL,
    "precioBase" DECIMAL(10,2) NOT NULL
);

-- Product Option table
CREATE TABLE IF NOT EXISTS product_option (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "productId" UUID REFERENCES product(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    recargo DECIMAL(10,2) NOT NULL
);

-- Cotizacion table
CREATE TABLE IF NOT EXISTS cotizacion (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "productId" UUID REFERENCES product(id),
    cantidad INTEGER,
    "areaM2" DECIMAL(10,2),
    base DECIMAL(10,2) NOT NULL,
    iva DECIMAL(10,2) NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    "leadScoring" VARCHAR(50) DEFAULT 'tibio',
    "optionId" VARCHAR(255),
    "createdAt" TIMESTAMP DEFAULT NOW()
);

-- Lead table
CREATE TABLE IF NOT EXISTS lead (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "cotizacionId" UUID UNIQUE REFERENCES cotizacion(id),
    "archivoNombre" VARCHAR(255),
    "archivoPath" VARCHAR(500),
    mensaje TEXT,
    "leadScoring" VARCHAR(50) DEFAULT 'tibio',
    notificado BOOLEAN DEFAULT FALSE,
    "notificadoAt" TIMESTAMP,
    "createdAt" TIMESTAMP DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_product_key ON product(key);
CREATE INDEX IF NOT EXISTS idx_product_category ON product(category);
CREATE INDEX IF NOT EXISTS idx_product_price_productId ON product_price("productId");
CREATE INDEX IF NOT EXISTS idx_cotizacion_productId ON cotizacion("productId");
CREATE INDEX IF NOT EXISTS idx_cotizacion_createdAt ON cotizacion("createdAt");
CREATE INDEX IF NOT EXISTS idx_lead_cotizacionId ON lead("cotizacionId");
CREATE INDEX IF NOT EXISTS idx_lead_createdAt ON lead("createdAt");
