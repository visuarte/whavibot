-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "key" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "tipo" TEXT NOT NULL,
    "precioPorM2" REAL,
    "unidad" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "product_prices" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "productId" TEXT NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "precioBase" REAL NOT NULL,
    "variante" TEXT,
    CONSTRAINT "product_prices_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "cotizaciones" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "productId" TEXT NOT NULL,
    "cantidad" INTEGER,
    "areaM2" REAL,
    "base" REAL NOT NULL,
    "iva" REAL NOT NULL,
    "total" REAL NOT NULL,
    "leadScoring" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "cotizaciones_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "leads" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cotizacionId" TEXT,
    "archivoNombre" TEXT,
    "archivoPath" TEXT,
    "archivoSize" INTEGER,
    "archivoType" TEXT,
    "mensaje" TEXT,
    "leadScoring" TEXT NOT NULL,
    "notificado" BOOLEAN NOT NULL DEFAULT false,
    "notificadoAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "leads_cotizacionId_fkey" FOREIGN KEY ("cotizacionId") REFERENCES "cotizaciones" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "products_key_key" ON "products"("key");

-- CreateIndex
CREATE INDEX "products_key_idx" ON "products"("key");

-- CreateIndex
CREATE INDEX "product_prices_productId_idx" ON "product_prices"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "product_prices_productId_cantidad_variante_key" ON "product_prices"("productId", "cantidad", "variante");

-- CreateIndex
CREATE INDEX "cotizaciones_productId_idx" ON "cotizaciones"("productId");

-- CreateIndex
CREATE INDEX "cotizaciones_leadScoring_idx" ON "cotizaciones"("leadScoring");

-- CreateIndex
CREATE INDEX "cotizaciones_createdAt_idx" ON "cotizaciones"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "leads_cotizacionId_key" ON "leads"("cotizacionId");

-- CreateIndex
CREATE INDEX "leads_leadScoring_idx" ON "leads"("leadScoring");

-- CreateIndex
CREATE INDEX "leads_notificado_idx" ON "leads"("notificado");

-- CreateIndex
CREATE INDEX "leads_createdAt_idx" ON "leads"("createdAt");
