// connection.js
const { Pool } = require('pg');  // Asegúrate de usar el Pool correcto

// Conexión a la base de datos remota
const dbRemote = new Pool({
    connectionString: process.env.DATABASE_URL, 
    ssl: { rejectUnauthorized: false }  // Si no usas SSL, puedes deshabilitarlo
});

// Conexión a la base de datos local
const dbLocal = new Pool({
    port: process.env.PORT_DB,
    host: process.env.HOST_DB,
    user: process.env.USER_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.NAME_DB,
});

// Función para obtener el pool de la base de datos
const connection = async (component) => {
    let pool;
    try {
        // Intentamos la conexión remota
        await dbRemote.connect();
        console.log(`Conexión con la db remota exitosa: ${component}`);
        pool = dbRemote;  // Si la conexión es exitosa, usamos el pool remoto
    } catch (errRemote) {
        console.warn('Error con la db remota. Intentando conexión local...', errRemote);
        try {
            // Intentamos la conexión local
            await dbLocal.connect();
            console.log(`Conexión con la db local exitosa: ${component}`);
            pool = dbLocal;  // Usamos el pool local si la remota falla
        } catch (errLocal) {
            console.error('Error al conectar con la db local: ', errLocal.message);
            throw new Error('No se pudo conectar a ninguna base de datos');
        }
    }
    return pool;  // Devolvemos el pool para que se pueda usar en consultas
};

module.exports = { connection };
