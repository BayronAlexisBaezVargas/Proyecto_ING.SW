// backend/db.js
const { Pool } = require('pg');
require('dotenv').config();

const isProduction = process.env.NODE_ENV === 'production';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: isProduction ? { rejectUnauthorized: false } : false,
});


// Función auxiliar para ejecutar queries de creación de tablas
const executeQuery = async (queryText, tableName) => {
    try {
        await pool.query(queryText);
        console.log(`Tabla '${tableName}' verificada o creada exitosamente.`);
    } catch (err) {
        // Ignora el error si la tabla ya existe, pero loguea otros errores.
        if (err.code !== '42P07') { 
            console.error(`Error al crear la tabla '${tableName}':`, err);
        }
    }
};

// Función principal que configura toda la base de datos
const setupDatabase = async () => {
    console.log("Iniciando configuración de la base de datos...");

    // Crear tabla de usuarios
    await executeQuery(`
        CREATE TABLE IF NOT EXISTS usuarios (
            id SERIAL PRIMARY KEY,
            nombre VARCHAR(100) NOT NULL,
            rut VARCHAR(12) UNIQUE NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            telefono VARCHAR(15),
            direccion VARCHAR(255),
            password_hash VARCHAR(100) NOT NULL,
            role VARCHAR(10) NOT NULL DEFAULT 'cliente'
        );
    `, 'usuarios');

    // Crear tabla de productos
    await executeQuery(`
        CREATE TABLE IF NOT EXISTS productos (
            id VARCHAR(10) PRIMARY KEY,
            nombre VARCHAR(100) NOT NULL,
            descripcion TEXT,
            precio INT NOT NULL,
            stock INT NOT NULL DEFAULT 0,
            imagen VARCHAR(255),
            tipo VARCHAR(20) NOT NULL -- 'Venta' o 'Arriendo'
        );
    `, 'productos');
    
    // Crear tabla de compras
    await executeQuery(`
        CREATE TABLE IF NOT EXISTS compras (
            id SERIAL PRIMARY KEY,
            cliente_id INT REFERENCES usuarios(id),
            producto_id VARCHAR(10) REFERENCES productos(id),
            cantidad INT NOT NULL,
            precio_unitario INT NOT NULL,
            fecha_compra TIMESTAMPTZ DEFAULT NOW()
        );
    `, 'compras');
    
    // Crear tabla de arriendos
    await executeQuery(`
        CREATE TABLE IF NOT EXISTS arriendos (
            id SERIAL PRIMARY KEY,
            cliente_id INT REFERENCES usuarios(id),
            producto_id VARCHAR(10) REFERENCES productos(id),
            dias_arriendo INT NOT NULL,
            costo_total INT NOT NULL,
            fecha_arriendo TIMESTAMPTZ DEFAULT NOW()
        );
    `, 'arriendos');

    // Poblar la tabla de productos si está vacía
    const res = await pool.query('SELECT COUNT(*) FROM productos');
    if (res.rows[0].count === '0') {
        console.log("La tabla 'productos' está vacía. Poblando con datos iniciales...");
        const productosIniciales = [
            // Productos de Venta
            ['B-001', 'Bicicleta de Montaña Pro', 'Aro 29, 21 velocidades, cuadro de aluminio ligero.', 349990, 15, 'bici_montana.jpg', 'Venta'],
            ['B-002', 'Bicicleta Urbana Clásica', 'Diseño retro, canasto frontal, ideal para paseos por la ciudad.', 229990, 20, 'bici_urbana.jpg', 'Venta'],
            ['B-003', 'Bicicleta de Ruta Veloz', 'Ultra liviana, componentes de carbono, para máxima velocidad.', 799990, 8, 'bici_ruta.jpg', 'Venta'],
            ['B-004', 'Bicicleta Eléctrica Plegable', 'Compacta y potente, perfecta para el transporte multimodal.', 950000, 5, 'bici_electrica.jpg', 'Venta'],
            // Productos de Arriendo
            ['R-001', 'Bicicleta de Paseo Confort', 'Canasto frontal, asiento ergonómico, guardabarros.', 10000, 10, 'arriendo_paseo.jpg', 'Arriendo'],
            ['R-002', 'Bicicleta Urbana Híbrida', '7 velocidades, cuadro ligero, neumáticos mixtos.', 12000, 12, 'arriendo_urbana.jpg', 'Arriendo'],
            ['R-003', 'Bicicleta Eléctrica Boost', 'Motor 250W, autonomía 50km, asistencia al pedaleo.', 25000, 5, 'arriendo_electrica.jpg', 'Arriendo'],
            ['R-004', 'Bicicleta Infantil Aro 20', 'Ruedas de apoyo, freno contrapedal, cubre cadena.', 8000, 15, 'arriendo_nino.jpg', 'Arriendo'],
            ['R-005', 'Bicicleta Tándem (para 2)', 'Doble asiento, marco reforzado, ideal para parejas.', 20000, 4, 'arriendo_tandem.jpg', 'Arriendo'],
            ['R-006', 'Bicicleta Gravel Aventura', 'Frenos de disco, manillar de ruta, apta para tierra.', 18000, 7, 'arriendo_gravel.jpg', 'Arriendo'],
            ['R-007', 'Bicicleta Plegable City', 'Se pliega en 10s, ultra compacta, perfecta para metro.', 15000, 8, 'arriendo_plegable.jpg', 'Arriendo'],
            ['R-008', 'Fatbike Todo Terreno', 'Neumáticos anchos, gran tracción, para arena o nieve.', 22000, 6, 'arriendo_fatbike.jpg', 'Arriendo'],
        ];

        for (const p of productosIniciales) {
            await pool.query('INSERT INTO productos (id, nombre, descripcion, precio, stock, imagen, tipo) VALUES ($1, $2, $3, $4, $5, $6, $7)', p);
        }
        console.log("Datos iniciales de productos (venta y arriendo) insertados.");
    }
};

module.exports = {
    // getClient nos permite usar transacciones
    getClient: () => pool.connect(),
    query: (text, params) => pool.query(text, params),
    setupDatabase,
};
