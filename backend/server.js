// backend/server.js

// --- IMPORTACIONES ---
const express = require('express');
const cors = require('cors');
const db = require('./db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// --- CONFIGURACIÓN DE LA APP ---
const app = express();
const PORT = process.env.PORT || 8000;

// Middlewares
app.use(cors()); // Permite la comunicación entre el frontend y el backend
app.use(express.json()); // Permite al servidor entender JSON

// Lista de RUTs que serán asignados como administradores
const adminRuts = ['22076160-6', '111111111-1', '222222222-2', '121212121-2'];

// --- MIDDLEWARE DE AUTENTICACIÓN ---
// Verifica el token JWT para proteger rutas
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Formato "Bearer TOKEN"

    if (token == null) {
        return res.sendStatus(401); // No autorizado si no hay token
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403); // Prohibido si el token es inválido o ha expirado
        }
        req.user = user; // Guardamos los datos del usuario del token en la petición
        next(); // Continuamos a la ruta protegida
    });
};

// --- RUTAS DE AUTENTICACIÓN ---

// Ruta para registrar un nuevo usuario
app.post('/api/register', async (req, res) => {
    const { nombre, rut, email, telefono, direccion, password } = req.body;

    if (!nombre || !rut || !email || !password) {
        return res.status(400).json({ message: 'Nombre, RUT, email y contraseña son campos obligatorios.' });
    }

    try {
        const existingUser = await db.query('SELECT * FROM usuarios WHERE rut = $1 OR email = $2', [rut, email]);
        if (existingUser.rows.length > 0) {
            return res.status(409).json({ message: 'El RUT o el correo electrónico ya están registrados.' });
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);
        const role = adminRuts.includes(rut) ? 'admin' : 'cliente';

        await db.query(
            'INSERT INTO usuarios (nombre, rut, email, telefono, direccion, password_hash, role) VALUES ($1, $2, $3, $4, $5, $6, $7)',
            [nombre, rut, email, telefono, direccion, passwordHash, role]
        );
        res.status(201).json({ message: 'Usuario registrado con éxito.' });
    } catch (error) {
        console.error("Error en el registro:", error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
});

// Ruta para iniciar sesión
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email y contraseña son requeridos.' });
    }

    try {
        const result = await db.query('SELECT * FROM usuarios WHERE email = $1', [email]);
        const user = result.rows[0];

        if (!user) {
            return res.status(401).json({ message: 'Credenciales inválidas.' });
        }

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(401).json({ message: 'Contraseña errónea. Por favor, intente de nuevo.' });
        }

        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            message: 'Inicio de sesión exitoso.',
            token,
            user: { id: user.id, nombre: user.nombre, email: user.email, role: user.role },
        });
    } catch (error) {
        console.error("Error en el login:", error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
});

// Ruta para verificar una sesión existente usando un token
app.get('/api/verify-session', authMiddleware, async (req, res) => {
    try {
        const result = await db.query('SELECT id, nombre, email, role FROM usuarios WHERE id = $1', [req.user.id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error al verificar sesión:", error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
});

// --- RUTAS DE PRODUCTOS Y STOCK ---

// Ruta para obtener todos los productos de un tipo (Venta o Arriendo)
app.get('/api/productos', async (req, res) => {
    try {
        const { tipo } = req.query;
        const result = await db.query('SELECT * FROM productos WHERE tipo = $1 ORDER BY id ASC', [tipo]);
        res.json(result.rows);
    } catch (error) {
        console.error("Error al obtener productos:", error);
        res.status(500).json({ message: 'Error al obtener los productos.' });
    }
});

// Ruta para actualizar el stock de un producto (solo para administradores)
app.put('/api/stock', authMiddleware, async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Acceso denegado. Se requiere rol de administrador.' });
    }
    const { productId, cantidad } = req.body;
    try {
        await db.query('UPDATE productos SET stock = stock + $1 WHERE id = $2', [cantidad, productId]);
        res.json({ message: 'Stock actualizado con éxito.' });
    } catch (error) {
        console.error("Error al actualizar stock:", error);
        res.status(500).json({ message: 'Error al actualizar el stock.' });
    }
});

// --- RUTA DE CHECKOUT (COMPRAS Y ARRIENDOS) ---

// Ruta para registrar una nueva compra o arriendo
app.post('/api/compras', authMiddleware, async (req, res) => {
    const { items } = req.body;
    const clienteId = req.user.id;
    const client = await db.getClient();

    try {
        await client.query('BEGIN');

        for (const item of items) {
            // Descontamos siempre 1 unidad del stock
            const stockResult = await client.query(
                'UPDATE productos SET stock = stock - 1 WHERE id = $1 AND stock >= 1 RETURNING stock',
                [item.id]
            );

            if (stockResult.rowCount === 0) {
                await client.query('ROLLBACK');
                return res.status(400).json({ message: `Lo sentimos, no hay stock suficiente para: ${item.nombre}` });
            }

            // Lógica diferenciada para Venta o Arriendo
            if (item.type === 'Venta') {
                await client.query(
                    'INSERT INTO compras (cliente_id, producto_id, cantidad, precio_unitario) VALUES ($1, $2, 1, $3)',
                    [clienteId, item.id, item.price]
                );
            } else if (item.type === 'Arriendo') {
                const costoTotalArriendo = item.price * item.days;
                await client.query(
                    'INSERT INTO arriendos (cliente_id, producto_id, dias_arriendo, costo_total) VALUES ($1, $2, $3, $4)',
                    [clienteId, item.id, item.days, costoTotalArriendo]
                );
            }
        }
        
        await client.query('COMMIT');
        res.status(201).json({ message: 'Pedido procesado con éxito.' });

    } catch (error) {
        await client.query('ROLLBACK');
        console.error("Error en la transacción de checkout:", error);
        res.status(500).json({ message: 'Error interno al procesar el pedido.' });
    } finally {
        client.release();
    }
});

// --- RUTA PARA DATOS DEL DASHBOARD ---

// Ruta para obtener datos agregados para el dashboard (solo admin)
app.get('/api/dashboard-data', authMiddleware, async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Acceso denegado.' });
    }

    try {
        const [comprasResult, arriendosResult] = await Promise.all([
            // Consulta para obtener todas las compras, uniendo tablas para obtener nombres
            db.query(`
                SELECT c.id, u.nombre as cliente, p.nombre as producto, c.precio_unitario, c.fecha_compra 
                FROM compras c
                JOIN usuarios u ON c.cliente_id = u.id
                JOIN productos p ON c.producto_id = p.id
                ORDER BY c.fecha_compra DESC;
            `),
            // Consulta para obtener todos los arriendos
            db.query(`
                SELECT a.id, u.nombre as cliente, p.nombre as bicicleta, a.dias_arriendo, a.costo_total, a.fecha_arriendo
                FROM arriendos a
                JOIN usuarios u ON a.cliente_id = u.id
                JOIN productos p ON a.producto_id = p.id
                ORDER BY a.fecha_arriendo DESC;
            `)
        ]);

        res.json({
            compras: comprasResult.rows,
            arriendos: arriendosResult.rows,
        });

    } catch (error) {
        console.error("Error al obtener datos para el dashboard:", error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
});

// --- INICIO DEL SERVIDOR ---
app.listen(PORT, async () => {
    await db.setupDatabase(); // Asegura que las tablas existan al arrancar
    console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
