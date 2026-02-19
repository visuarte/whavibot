-- ============================================
-- Seed SQL para Visuarte Print Shop
-- Ejecutar con: npx prisma db execute --sql "$(cat prisma/seed.sql)"
-- ============================================

-- Limpiar datos existentes
DELETE FROM leads;
DELETE FROM cotizaciones;
DELETE FROM product_prices;
DELETE FROM products;

-- ========== TARJETAS DE VISITA ==========

-- Tarjetas Clásicas
INSERT INTO products (id, key, nombre, descripcion, tipo, precioPorM2, unidad, createdAt, updatedAt)
VALUES (uuid(), 'tarjetas_clasicas', 'Tarjetas de Visita Clásicas', '85x55 mm - Sin Laminar', 'cantidad_fija', NULL, 'uds', datetime('now'), datetime('now'));

INSERT INTO product_prices (id, productId, cantidad, precioBase, variante)
SELECT uuid(), id, 250, 55.50, NULL FROM products WHERE key = 'tarjetas_clasicas';
INSERT INTO product_prices (id, productId, cantidad, precioBase, variante)
SELECT uuid(), id, 500, 70.76, NULL FROM products WHERE key = 'tarjetas_clasicas';
INSERT INTO product_prices (id, productId, cantidad, precioBase, variante)
SELECT uuid(), id, 1000, 90.05, NULL FROM products WHERE key = 'tarjetas_clasicas';
INSERT INTO product_prices (id, productId, cantidad, precioBase, variante)
SELECT uuid(), id, 2500, 165.45, NULL FROM products WHERE key = 'tarjetas_clasicas';

-- Tarjetas Laminadas
INSERT INTO products (id, key, nombre, descripcion, tipo, precioPorM2, unidad, createdAt, updatedAt)
VALUES (uuid(), 'tarjetas_laminadas', 'Tarjetas Laminadas', '85x55 mm - Mate o Brillo', 'cantidad_fija', NULL, 'uds', datetime('now'), datetime('now'));

INSERT INTO product_prices (id, productId, cantidad, precioBase, variante)
SELECT uuid(), id, 250, 75.10, NULL FROM products WHERE key = 'tarjetas_laminadas';
INSERT INTO product_prices (id, productId, cantidad, precioBase, variante)
SELECT uuid(), id, 500, 90.56, NULL FROM products WHERE key = 'tarjetas_laminadas';
INSERT INTO product_prices (id, productId, cantidad, precioBase, variante)
SELECT uuid(), id, 1000, 125.34, NULL FROM products WHERE key = 'tarjetas_laminadas';
INSERT INTO product_prices (id, productId, cantidad, precioBase, variante)
SELECT uuid(), id, 2500, 169.90, NULL FROM products WHERE key = 'tarjetas_laminadas';

-- Tarjetas Exclusivas
INSERT INTO products (id, key, nombre, descripcion, tipo, precioPorM2, unidad, createdAt, updatedAt)
VALUES (uuid(), 'tarjetas_exclusivas', 'Tarjetas Acabados Exclusivos', '85x55 mm - Acabados especiales', 'cantidad_fija', NULL, 'uds', datetime('now'), datetime('now'));

INSERT INTO product_prices (id, productId, cantidad, precioBase, variante)
SELECT uuid(), id, 250, 85.90, NULL FROM products WHERE key = 'tarjetas_exclusivas';
INSERT INTO product_prices (id, productId, cantidad, precioBase, variante)
SELECT uuid(), id, 500, 135.24, NULL FROM products WHERE key = 'tarjetas_exclusivas';
INSERT INTO product_prices (id, productId, cantidad, precioBase, variante)
SELECT uuid(), id, 1000, 175.70, NULL FROM products WHERE key = 'tarjetas_exclusivas';
INSERT INTO product_prices (id, productId, cantidad, precioBase, variante)
SELECT uuid(), id, 2500, 205.34, NULL FROM products WHERE key = 'tarjetas_exclusivas';

-- ========== BROCHURES ==========

INSERT INTO products (id, key, nombre, descripcion, tipo, precioPorM2, unidad, createdAt, updatedAt)
VALUES (uuid(), 'brochure_21x10', 'Brochure 21x10.5', 'Alargado, 350gr, 1 o 2 caras', 'cantidad_fija', NULL, 'uds', datetime('now'), datetime('now'));

INSERT INTO product_prices (id, productId, cantidad, precioBase, variante)
SELECT uuid(), id, 100, 45.60, NULL FROM products WHERE key = 'brochure_21x10';
INSERT INTO product_prices (id, productId, cantidad, precioBase, variante)
SELECT uuid(), id, 200, 65.90, NULL FROM products WHERE key = 'brochure_21x10';
INSERT INTO product_prices (id, productId, cantidad, precioBase, variante)
SELECT uuid(), id, 300, 75.80, NULL FROM products WHERE key = 'brochure_21x10';
INSERT INTO product_prices (id, productId, cantidad, precioBase, variante)
SELECT uuid(), id, 500, 95.30, NULL FROM products WHERE key = 'brochure_21x10';

-- ========== FLYERS ==========

INSERT INTO products (id, key, nombre, descripcion, tipo, precioPorM2, unidad, createdAt, updatedAt)
VALUES (uuid(), 'flyers_a6', 'Flyers A6', '105x148mm, 135gr 2 caras', 'cantidad_fija', NULL, 'uds', datetime('now'), datetime('now'));

INSERT INTO product_prices (id, productId, cantidad, precioBase, variante)
SELECT uuid(), id, 100, 35.55, NULL FROM products WHERE key = 'flyers_a6';
INSERT INTO product_prices (id, productId, cantidad, precioBase, variante)
SELECT uuid(), id, 300, 55.65, NULL FROM products WHERE key = 'flyers_a6';
INSERT INTO product_prices (id, productId, cantidad, precioBase, variante)
SELECT uuid(), id, 500, 75.90, NULL FROM products WHERE key = 'flyers_a6';
INSERT INTO product_prices (id, productId, cantidad, precioBase, variante)
SELECT uuid(), id, 1000, 98.80, NULL FROM products WHERE key = 'flyers_a6';
INSERT INTO product_prices (id, productId, cantidad, precioBase, variante)
SELECT uuid(), id, 1500, 115.05, NULL FROM products WHERE key = 'flyers_a6';
INSERT INTO product_prices (id, productId, cantidad, precioBase, variante)
SELECT uuid(), id, 2500, 145.45, NULL FROM products WHERE key = 'flyers_a6';

INSERT INTO products (id, key, nombre, descripcion, tipo, precioPorM2, unidad, createdAt, updatedAt)
VALUES (uuid(), 'flyers_a5', 'Flyers A5', '148x210mm, 135gr 2 caras', 'cantidad_fija', NULL, 'uds', datetime('now'), datetime('now'));

INSERT INTO product_prices (id, productId, cantidad, precioBase, variante)
SELECT uuid(), id, 100, 45.75, NULL FROM products WHERE key = 'flyers_a5';
INSERT INTO product_prices (id, productId, cantidad, precioBase, variante)
SELECT uuid(), id, 250, 65.85, NULL FROM products WHERE key = 'flyers_a5';
INSERT INTO product_prices (id, productId, cantidad, precioBase, variante)
SELECT uuid(), id, 500, 85.30, NULL FROM products WHERE key = 'flyers_a5';
INSERT INTO product_prices (id, productId, cantidad, precioBase, variante)
SELECT uuid(), id, 750, 110.05, NULL FROM products WHERE key = 'flyers_a5';
INSERT INTO product_prices (id, productId, cantidad, precioBase, variante)
SELECT uuid(), id, 1000, 125.40, NULL FROM products WHERE key = 'flyers_a5';
INSERT INTO product_prices (id, productId, cantidad, precioBase, variante)
SELECT uuid(), id, 1500, 165.40, NULL FROM products WHERE key = 'flyers_a5';
INSERT INTO product_prices (id, productId, cantidad, precioBase, variante)
SELECT uuid(), id, 2500, 185.25, NULL FROM products WHERE key = 'flyers_a5';

INSERT INTO products (id, key, nombre, descripcion, tipo, precioPorM2, unidad, createdAt, updatedAt)
VALUES (uuid(), 'flyers_a4', 'Flyers A4', '210x297mm, 135gr 2 caras', 'cantidad_fija', NULL, 'uds', datetime('now'), datetime('now'));

INSERT INTO product_prices (id, productId, cantidad, precioBase, variante)
SELECT uuid(), id, 100, 69.75, NULL FROM products WHERE key = 'flyers_a4';
INSERT INTO product_prices (id, productId, cantidad, precioBase, variante)
SELECT uuid(), id, 250, 88.85, NULL FROM products WHERE key = 'flyers_a4';
INSERT INTO product_prices (id, productId, cantidad, precioBase, variante)
SELECT uuid(), id, 500, 145.30, NULL FROM products WHERE key = 'flyers_a4';
INSERT INTO product_prices (id, productId, cantidad, precioBase, variante)
SELECT uuid(), id, 1000, 185.40, NULL FROM products WHERE key = 'flyers_a4';

-- ========== TRÍPTICOS ==========

INSERT INTO products (id, key, nombre, descripcion, tipo, precioPorM2, unidad, createdAt, updatedAt)
VALUES (uuid(), 'tripticos_a4', 'Trípticos A4 Abierto', 'Formato A4 abierto', 'cantidad_fija', NULL, 'uds', datetime('now'), datetime('now'));

INSERT INTO product_prices (id, productId, cantidad, precioBase, variante)
SELECT uuid(), id, 100, 75.72, NULL FROM products WHERE key = 'tripticos_a4';
INSERT INTO product_prices (id, productId, cantidad, precioBase, variante)
SELECT uuid(), id, 250, 85.15, NULL FROM products WHERE key = 'tripticos_a4';
INSERT INTO product_prices (id, productId, cantidad, precioBase, variante)
SELECT uuid(), id, 500, 108.91, NULL FROM products WHERE key = 'tripticos_a4';
INSERT INTO product_prices (id, productId, cantidad, precioBase, variante)
SELECT uuid(), id, 1000, 198.84, NULL FROM products WHERE key = 'tripticos_a4';
INSERT INTO product_prices (id, productId, cantidad, precioBase, variante)
SELECT uuid(), id, 2500, 245.17, NULL FROM products WHERE key = 'tripticos_a4';
INSERT INTO product_prices (id, productId, cantidad, precioBase, variante)
SELECT uuid(), id, 5000, 400.50, NULL FROM products WHERE key = 'tripticos_a4';
INSERT INTO product_prices (id, productId, cantidad, precioBase, variante)
SELECT uuid(), id, 7500, 445.90, NULL FROM products WHERE key = 'tripticos_a4';
INSERT INTO product_prices (id, productId, cantidad, precioBase, variante)
SELECT uuid(), id, 10000, 620.60, NULL FROM products WHERE key = 'tripticos_a4';

INSERT INTO products (id, key, nombre, descripcion, tipo, precioPorM2, unidad, createdAt, updatedAt)
VALUES (uuid(), 'tripticos_a3', 'Trípticos A3 Abierto', 'Formato A3 abierto', 'cantidad_fija', NULL, 'uds', datetime('now'), datetime('now'));

INSERT INTO product_prices (id, productId, cantidad, precioBase, variante)
SELECT uuid(), id, 100, 99.90, NULL FROM products WHERE key = 'tripticos_a3';
INSERT INTO product_prices (id, productId, cantidad, precioBase, variante)
SELECT uuid(), id, 250, 205.15, NULL FROM products WHERE key = 'tripticos_a3';
INSERT INTO product_prices (id, productId, cantidad, precioBase, variante)
SELECT uuid(), id, 500, 228.91, NULL FROM products WHERE key = 'tripticos_a3';
INSERT INTO product_prices (id, productId, cantidad, precioBase, variante)
SELECT uuid(), id, 1000, 258.84, NULL FROM products WHERE key = 'tripticos_a3';
INSERT INTO product_prices (id, productId, cantidad, precioBase, variante)
SELECT uuid(), id, 2500, 290.17, NULL FROM products WHERE key = 'tripticos_a3';
INSERT INTO product_prices (id, productId, cantidad, precioBase, variante)
SELECT uuid(), id, 5000, 620.50, NULL FROM products WHERE key = 'tripticos_a3';
INSERT INTO product_prices (id, productId, cantidad, precioBase, variante)
SELECT uuid(), id, 7500, 695.90, NULL FROM products WHERE key = 'tripticos_a3';
INSERT INTO product_prices (id, productId, cantidad, precioBase, variante)
SELECT uuid(), id, 10000, 820.60, NULL FROM products WHERE key = 'tripticos_a3';

-- ========== DÍPTICOS ==========

INSERT INTO products (id, key, nombre, descripcion, tipo, precioPorM2, unidad, createdAt, updatedAt)
VALUES (uuid(), 'dipticos_a5', 'Dípticos A5 Abierto', 'Formato A5 abierto', 'cantidad_fija', NULL, 'uds', datetime('now'), datetime('now'));

INSERT INTO product_prices (id, productId, cantidad, precioBase, variante)
SELECT uuid(), id, 100, 74.72, NULL FROM products WHERE key = 'dipticos_a5';
INSERT INTO product_prices (id, productId, cantidad, precioBase, variante)
SELECT uuid(), id, 250, 88.15, NULL FROM products WHERE key = 'dipticos_a5';
INSERT INTO product_prices (id, productId, cantidad, precioBase, variante)
SELECT uuid(), id, 500, 105.71, NULL FROM products WHERE key = 'dipticos_a5';
INSERT INTO product_prices (id, productId, cantidad, precioBase, variante)
SELECT uuid(), id, 1000, 118.84, NULL FROM products WHERE key = 'dipticos_a5';
INSERT INTO product_prices (id, productId, cantidad, precioBase, variante)
SELECT uuid(), id, 2500, 160.17, NULL FROM products WHERE key = 'dipticos_a5';
INSERT INTO product_prices (id, productId, cantidad, precioBase, variante)
SELECT uuid(), id, 5000, 220.50, NULL FROM products WHERE key = 'dipticos_a5';
INSERT INTO product_prices (id, productId, cantidad, precioBase, variante)
SELECT uuid(), id, 7500, 265.90, NULL FROM products WHERE key = 'dipticos_a5';
INSERT INTO product_prices (id, productId, cantidad, precioBase, variante)
SELECT uuid(), id, 10000, 340.60, NULL FROM products WHERE key = 'dipticos_a5';

INSERT INTO products (id, key, nombre, descripcion, tipo, precioPorM2, unidad, createdAt, updatedAt)
VALUES (uuid(), 'dipticos_a4', 'Dípticos A4 Abierto', 'Formato A4 abierto', 'cantidad_fija', NULL, 'uds', datetime('now'), datetime('now'));

INSERT INTO product_prices (id, productId, cantidad, precioBase, variante)
SELECT uuid(), id, 100, 70.72, NULL FROM products WHERE key = 'dipticos_a4';
INSERT INTO product_prices (id, productId, cantidad, precioBase, variante)
SELECT uuid(), id, 250, 85.15, NULL FROM products WHERE key = 'dipticos_a4';
INSERT INTO product_prices (id, productId, cantidad, precioBase, variante)
SELECT uuid(), id, 500, 98.91, NULL FROM products WHERE key = 'dipticos_a4';
INSERT INTO product_prices (id, productId, cantidad, precioBase, variante)
SELECT uuid(), id, 1000, 108.84, NULL FROM products WHERE key = 'dipticos_a4';
INSERT INTO product_prices (id, productId, cantidad, precioBase, variante)
SELECT uuid(), id, 2500, 150.17, NULL FROM products WHERE key = 'dipticos_a4';
INSERT INTO product_prices (id, productId, cantidad, precioBase, variante)
SELECT uuid(), id, 5000, 200.50, NULL FROM products WHERE key = 'dipticos_a4';
INSERT INTO product_prices (id, productId, cantidad, precioBase, variante)
SELECT uuid(), id, 7500, 245.90, NULL FROM products WHERE key = 'dipticos_a4';
INSERT INTO product_prices (id, productId, cantidad, precioBase, variante)
SELECT uuid(), id, 10000, 320.60, NULL FROM products WHERE key = 'dipticos_a4';

INSERT INTO products (id, key, nombre, descripcion, tipo, precioPorM2, unidad, createdAt, updatedAt)
VALUES (uuid(), 'dipticos_a3', 'Dípticos A3 Abierto', 'Formato A3 abierto', 'cantidad_fija', NULL, 'uds', datetime('now'), datetime('now'));

INSERT INTO product_prices (id, productId, cantidad, precioBase, variante)
SELECT uuid(), id, 100, 90.72, NULL FROM products WHERE key = 'dipticos_a3';
INSERT INTO product_prices (id, productId, cantidad, precioBase, variante)
SELECT uuid(), id, 250, 105.15, NULL FROM products WHERE key = 'dipticos_a3';
INSERT INTO product_prices (id, productId, cantidad, precioBase, variante)
SELECT uuid(), id, 500, 128.91, NULL FROM products WHERE key = 'dipticos_a3';
INSERT INTO product_prices (id, productId, cantidad, precioBase, variante)
SELECT uuid(), id, 1000, 158.84, NULL FROM products WHERE key = 'dipticos_a3';
INSERT INTO product_prices (id, productId, cantidad, precioBase, variante)
SELECT uuid(), id, 2500, 190.17, NULL FROM products WHERE key = 'dipticos_a3';
INSERT INTO product_prices (id, productId, cantidad, precioBase, variante)
SELECT uuid(), id, 5000, 320.50, NULL FROM products WHERE key = 'dipticos_a3';
INSERT INTO product_prices (id, productId, cantidad, precioBase, variante)
SELECT uuid(), id, 7500, 395.90, NULL FROM products WHERE key = 'dipticos_a3';
INSERT INTO product_prices (id, productId, cantidad, precioBase, variante)
SELECT uuid(), id, 10000, 420.60, NULL FROM products WHERE key = 'dipticos_a3';

-- ========== VINILOS (por m²) ==========

INSERT INTO products (id, key, nombre, descripcion, tipo, precioPorM2, unidad, createdAt, updatedAt)
VALUES (uuid(), 'vinilos_corte', 'Vinilos de Corte', 'Con transportador, hasta 60x40cm, 2 colores', 'por_m2', 55.00, 'm²', datetime('now'), datetime('now'));

-- ========== SOBRES CON VARIANTES ==========

INSERT INTO products (id, key, nombre, descripcion, tipo, precioPorM2, unidad, createdAt, updatedAt)
VALUES (uuid(), 'sobres_bolsa_1tinta', 'Sobres Bolsa 26x36 cm - 1 Tinta', 'Sobres bolsa estándar - 1 Tinta', 'cantidad_fija', NULL, 'uds', datetime('now'), datetime('now'));

INSERT INTO product_prices (id, productId, cantidad, precioBase, variante)
SELECT uuid(), id, 500, 264.00, '1 Tinta' FROM products WHERE key = 'sobres_bolsa_1tinta';
INSERT INTO product_prices (id, productId, cantidad, precioBase, variante)
SELECT uuid(), id, 1000, 450.00, '1 Tinta' FROM products WHERE key = 'sobres_bolsa_1tinta';
INSERT INTO product_prices (id, productId, cantidad, precioBase, variante)
SELECT uuid(), id, 2500, 900.00, '1 Tinta' FROM products WHERE key = 'sobres_bolsa_1tinta';

INSERT INTO products (id, key, nombre, descripcion, tipo, precioPorM2, unidad, createdAt, updatedAt)
VALUES (uuid(), 'sobres_bolsa_2tintas', 'Sobres Bolsa 26x36 cm - 2 Tintas', 'Sobres bolsa estándar - 2 Tintas', 'cantidad_fija', NULL, 'uds', datetime('now'), datetime('now'));

INSERT INTO product_prices (id, productId, cantidad, precioBase, variante)
SELECT uuid(), id, 500, 310.00, '2 Tintas' FROM products WHERE key = 'sobres_bolsa_2tintas';
INSERT INTO product_prices (id, productId, cantidad, precioBase, variante)
SELECT uuid(), id, 1000, 520.00, '2 Tintas' FROM products WHERE key = 'sobres_bolsa_2tintas';
INSERT INTO product_prices (id, productId, cantidad, precioBase, variante)
SELECT uuid(), id, 2500, 1050.00, '2 Tintas' FROM products WHERE key = 'sobres_bolsa_2tintas';

INSERT INTO products (id, key, nombre, descripcion, tipo, precioPorM2, unidad, createdAt, updatedAt)
VALUES (uuid(), 'sobres_bolsa_4tintas', 'Sobres Bolsa 26x36 cm - 4 Tintas', 'Sobres bolsa estándar - 4 Tintas', 'cantidad_fija', NULL, 'uds', datetime('now'), datetime('now'));

INSERT INTO product_prices (id, productId, cantidad, precioBase, variante)
SELECT uuid(), id, 500, 440.00, '4 Tintas' FROM products WHERE key = 'sobres_bolsa_4tintas';
INSERT INTO product_prices (id, productId, cantidad, precioBase, variante)
SELECT uuid(), id, 1000, 615.00, '4 Tintas' FROM products WHERE key = 'sobres_bolsa_4tintas';
INSERT INTO product_prices (id, productId, cantidad, precioBase, variante)
SELECT uuid(), id, 2500, 1200.00, '4 Tintas' FROM products WHERE key = 'sobres_bolsa_4tintas';

-- Verificar resultados
SELECT 'Productos insertados:' as info, COUNT(*) as total FROM products;
SELECT 'Precios insertados:' as info, COUNT(*) as total FROM product_prices;
