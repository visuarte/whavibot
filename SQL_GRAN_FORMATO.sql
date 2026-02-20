-- ==========================================
-- EJEMPLOS SQL - Productos de Gran Formato
-- ==========================================
-- Ejecutar en Neon Dashboard → SQL Editor
-- O en terminal: psql $DATABASE_URL -f SQL_GRAN_FORMATO.sql

-- ==========================================
-- 1. LONA FLEXIBLE PVC
-- ==========================================
INSERT INTO product (
    id, key, nombre, descripcion, tipo, precioPorM2, unidad,
    category, materialType, material,
    anchoMinCm, anchoMaxCm, altoMinCm, altoMaxCm,
    anchoRecomendadoCm, altoRecomendadoCm,
    createdAt, updatedAt
) VALUES (
    gen_random_uuid(),
    'lona_flexible_pvc_280',
    'Lona Flexible PVC 280g',
    'Lona publicitaria flexible de PVC 280g/m² - Ideal para exteriores. Configure ancho y alto en centímetros.',
    'gran_formato',
    7.50,
    'm²',
    'gran_formato_flexible',
    'flexible',
    'PVC 280g/m² ignífugo',
    10, 500, 10, 500,
    300, 200,
    NOW(), NOW()
) ON CONFLICT (key) DO UPDATE SET
    precioPorM2 = EXCLUDED.precioPorM2,
    updatedAt = NOW();

-- ==========================================
-- 2. LONA FLEXIBLE POLY
-- ==========================================
INSERT INTO product (
    id, key, nombre, descripcion, tipo, precioPorM2, unidad,
    category, materialType, material,
    anchoMinCm, anchoMaxCm, altoMinCm, altoMaxCm,
    anchoRecomendadoCm, altoRecomendadoCm,
    createdAt, updatedAt
) VALUES (
    gen_random_uuid(),
    'lona_flexible_poly_440',
    'Lona Flexible Poliéster 440g',
    'Lona de poliéster 440g/m² - Mayor durabilidad. Configure ancho y alto en centímetros.',
    'gran_formato',
    9.50,
    'm²',
    'gran_formato_flexible',
    'flexible',
    'Poliéster 440g/m² resistente a UV',
    10, 500, 10, 500,
    300, 200,
    NOW(), NOW()
) ON CONFLICT (key) DO UPDATE SET
    precioPorM2 = EXCLUDED.precioPorM2,
    updatedAt = NOW();

-- ==========================================
-- 3. FOAM BOARD 3MM
-- ==========================================
INSERT INTO product (
    id, key, nombre, descripcion, tipo, precioPorM2, unidad,
    category, materialType, material,
    anchoMinCm, anchoMaxCm, altoMinCm, altoMaxCm,
    anchoRecomendadoCm, altoRecomendadoCm,
    createdAt, updatedAt
) VALUES (
    gen_random_uuid(),
    'foam_board_3mm',
    'Foam Board 3mm Rígido',
    'Panel de espuma rígida de 3mm - Ligero y económico. Configure ancho y alto en centímetros.',
    'gran_formato',
    5.99,
    'm²',
    'gran_formato_rigido',
    'rigido',
    'Espuma de poliestireno 3mm blanca',
    20, 400, 20, 400,
    120, 80,
    NOW(), NOW()
) ON CONFLICT (key) DO UPDATE SET
    precioPorM2 = EXCLUDED.precioPorM2,
    updatedAt = NOW();

-- ==========================================
-- 4. FOAM BOARD 5MM
-- ==========================================
INSERT INTO product (
    id, key, nombre, descripcion, tipo, precioPorM2, unidad,
    category, materialType, material,
    anchoMinCm, anchoMaxCm, altoMinCm, altoMaxCm,
    anchoRecomendadoCm, altoRecomendadoCm,
    createdAt, updatedAt
) VALUES (
    gen_random_uuid(),
    'foam_board_5mm',
    'Foam Board 5mm Rígido',
    'Panel de espuma rígida de 5mm - Mayor rigidez. Configure ancho y alto en centímetros.',
    'gran_formato',
    7.99,
    'm²',
    'gran_formato_rigido',
    'rigido',
    'Espuma de poliestireno 5mm blanca',
    20, 400, 20, 400,
    120, 80,
    NOW(), NOW()
) ON CONFLICT (key) DO UPDATE SET
    precioPorM2 = EXCLUDED.precioPorM2,
    updatedAt = NOW();

-- ==========================================
-- 5. DIBOND 3MM
-- ==========================================
INSERT INTO product (
    id, key, nombre, descripcion, tipo, precioPorM2, unidad,
    category, materialType, material,
    anchoMinCm, anchoMaxCm, altoMinCm, altoMaxCm,
    anchoRecomendadoCm, altoRecomendadoCm,
    createdAt, updatedAt
) VALUES (
    gen_random_uuid(),
    'dibond_3mm_blanco',
    'Dibond 3mm Blanco Premium',
    'Panel de aluminio compuesto Dibond 3mm - Acabado premium. Configure ancho y alto en centímetros.',
    'gran_formato',
    14.99,
    'm²',
    'gran_formato_rigido',
    'rigido',
    'Aluminio compuesto Dibond 3mm blanco',
    30, 350, 30, 350,
    120, 80,
    NOW(), NOW()
) ON CONFLICT (key) DO UPDATE SET
    precioPorM2 = EXCLUDED.precioPorM2,
    updatedAt = NOW();

-- ==========================================
-- 6. DIBOND 3MM NEGRO
-- ==========================================
INSERT INTO product (
    id, key, nombre, descripcion, tipo, precioPorM2, unidad,
    category, materialType, material,
    anchoMinCm, anchoMaxCm, altoMinCm, altoMaxCm,
    anchoRecomendadoCm, altoRecomendadoCm,
    createdAt, updatedAt
) VALUES (
    gen_random_uuid(),
    'dibond_3mm_negro',
    'Dibond 3mm Negro Premium',
    'Panel de aluminio compuesto Dibond 3mm negro - Acabado premium. Configure ancho y alto en centímetros.',
    'gran_formato',
    15.99,
    'm²',
    'gran_formato_rigido',
    'rigido',
    'Aluminio compuesto Dibond 3mm negro',
    30, 350, 30, 350,
    120, 80,
    NOW(), NOW()
) ON CONFLICT (key) DO UPDATE SET
    precioPorM2 = EXCLUDED.precioPorM2,
    updatedAt = NOW();

-- ==========================================
-- 7. ACRÍLICO CAST
-- ==========================================
INSERT INTO product (
    id, key, nombre, descripcion, tipo, precioPorM2, unidad,
    category, materialType, material,
    anchoMinCm, anchoMaxCm, altoMinCm, altoMaxCm,
    anchoRecomendadoCm, altoRecomendadoCm,
    createdAt, updatedAt
) VALUES (
    gen_random_uuid(),
    'acrilico_cast_3mm',
    'Acrílico Cast 3mm Rígido',
    'Acrílico de fundición 3mm - Transparencia cristalina. Configure ancho y alto en centímetros.',
    'gran_formato',
    12.50,
    'm²',
    'gran_formato_rigido',
    'rigido',
    'Acrílico PMMA cast 3mm transparente',
    20, 350, 20, 350,
    100, 70,
    NOW(), NOW()
) ON CONFLICT (key) DO UPDATE SET
    precioPorM2 = EXCLUDED.precioPorM2,
    updatedAt = NOW();

-- ==========================================
-- VERIFICACIÓN
-- ==========================================
-- Mostrar productos insertados
SELECT 
    key,
    nombre,
    tipo,
    materialType,
    precioPorM2,
    category,
    anchoMinCm || '-' || anchoMaxCm as rango_ancho,
    altoMinCm || '-' || altoMaxCm as rango_alto
FROM product
WHERE tipo = 'gran_formato'
ORDER BY category, precioPorM2;

-- Contar por categoría
SELECT 
    category,
    COUNT(*) as cantidad,
    MIN(precioPorM2) as precio_min,
    MAX(precioPorM2) as precio_max
FROM product
WHERE tipo = 'gran_formato'
GROUP BY category
ORDER BY category;
