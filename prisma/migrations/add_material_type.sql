-- Agregar campo materialType a la tabla product si no existe
ALTER TABLE product
ADD COLUMN IF NOT EXISTS "materialType" VARCHAR(50);

-- Agregar campos para dimensiones de gran formato si no existen
ALTER TABLE product
ADD COLUMN IF NOT EXISTS "anchoMinCm" INT DEFAULT 10;

ALTER TABLE product
ADD COLUMN IF NOT EXISTS "anchoMaxCm" INT DEFAULT 300;

ALTER TABLE product
ADD COLUMN IF NOT EXISTS "altoMinCm" INT DEFAULT 10;

ALTER TABLE product
ADD COLUMN IF NOT EXISTS "altoMaxCm" INT DEFAULT 300;

ALTER TABLE product
ADD COLUMN IF NOT EXISTS "anchoRecomendadoCm" INT DEFAULT 100;

ALTER TABLE product
ADD COLUMN IF NOT EXISTS "altoRecomendadoCm" INT DEFAULT 100;
