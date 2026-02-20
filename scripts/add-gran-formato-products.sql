-- Script para agregar productos de gran formato flexible y rígido
-- Ejecuta esto en la base de datos Neon

-- Lona Flexible (Gran Formato Flexible)
INSERT INTO "Product" (
    key,
    nombre,
    descripcion,
    category,
    tipo,
    unidad,
    precioPorM2,
    materialType
) VALUES (
    'lona_flexible',
    'Lona Flexible',
    'Lona publicitaria flexible - Configure ancho y alto en cm',
    'gran_formato_flexible',
    'gran_formato',
    'm²',
    7.00,
    'flexible'
) ON CONFLICT (key) DO UPDATE SET 
    tipo = 'gran_formato',
    materialType = 'flexible',
    precioPorM2 = 7.00;

-- PVC Flexible (Gran Formato Flexible)
INSERT INTO "Product" (
    key,
    nombre,
    descripcion,
    category,
    tipo,
    unidad,
    precioPorM2,
    materialType
) VALUES (
    'pvc_flexible',
    'PVC Flexible',
    'PVC flexible de alta calidad - Configure ancho y alto en cm',
    'gran_formato_flexible',
    'gran_formato',
    'm²',
    8.50,
    'flexible'
) ON CONFLICT (key) DO UPDATE SET 
    tipo = 'gran_formato',
    materialType = 'flexible',
    precioPorM2 = 8.50;

-- Foam Rígido (Gran Formato Rígido)
INSERT INTO "Product" (
    key,
    nombre,
    descripcion,
    category,
    tipo,
    unidad,
    precioPorM2,
    materialType
) VALUES (
    'foam_rigido',
    'Foam Rígido',
    'Paneles de espuma rígida - Configure ancho y alto en cm',
    'gran_formato_rigido',
    'gran_formato',
    'm²',
    5.50,
    'rigido'
) ON CONFLICT (key) DO UPDATE SET 
    tipo = 'gran_formato',
    materialType = 'rigido',
    precioPorM2 = 5.50;

-- Aluminio Composite Rígido (Gran Formato Rígido)
INSERT INTO "Product" (
    key,
    nombre,
    descripcion,
    category,
    tipo,
    unidad,
    precioPorM2,
    materialType
) VALUES (
    'alu_composite_rigido',
    'Aluminio Composite',
    'Panel de aluminio composite rígido - Configure ancho y alto en cm',
    'gran_formato_rigido',
    'gran_formato',
    'm²',
    12.00,
    'rigido'
) ON CONFLICT (key) DO UPDATE SET 
    tipo = 'gran_formato',
    materialType = 'rigido',
    precioPorM2 = 12.00;

-- PVC Rígido (Gran Formato Rígido)
INSERT INTO "Product" (
    key,
    nombre,
    descripcion,
    category,
    tipo,
    unidad,
    precioPorM2,
    materialType
) VALUES (
    'pvc_rigido',
    'PVC Rígido',
    'PVC rígido para estructuras - Configure ancho y alto en cm',
    'gran_formato_rigido',
    'gran_formato',
    'm²',
    6.50,
    'rigido'
) ON CONFLICT (key) DO UPDATE SET 
    tipo = 'gran_formato',
    materialType = 'rigido',
    precioPorM2 = 6.50;
