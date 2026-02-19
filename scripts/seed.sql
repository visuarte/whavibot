-- Seed data for Neon PostgreSQL
-- Run with: psql $DATABASE_URL -f scripts/seed.sql

-- ============ PEQUEÑO FORMATO ============

-- Tarjetas Clásicas
INSERT INTO product (key, nombre, descripcion, tipo, unidad, category, material)
VALUES ('tarjetas_clasicas', 'Tarjetas de Visita Clásicas (85x55 mm, Sin Laminar)', 'Papel estándar sin laminar', 'cantidad_fija', 'uds', 'pequeño_formato', 'Papel 350 gr')
RETURNING id;

-- This is a multi-step approach - we'll insert products first, then prices
