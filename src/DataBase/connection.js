// connection.js
const { Pool } = require('pg');

// Pool remoto
const dbRemote = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }  // solo si tu host remoto requiere SSL
});

// Pool local
const dbLocal = new Pool({
    port: process.env.PORT_DB,
    host: process.env.HOST_DB,
    user: process.env.USER_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.NAME_DB,
});

// Función para obtener el pool correcto
const connection = async (component) => {
    try {
        // Intentamos hacer una query simple para testear la conexión remota
        await dbRemote.query('SELECT 1');
        console.log(`Conexión con la db remota exitosa: ${component}`);
        return dbRemote;
    } catch (errRemote) {
        console.warn('Error con la db remota. Intentando conexión local...', errRemote.message);
        try {
            await dbLocal.query('SELECT 1');
            console.log(`Conexión con la db local exitosa: ${component}`);
            return dbLocal;
        } catch (errLocal) {
            console.error('Error al conectar con la db local: ', errLocal.message);
            throw new Error('No se pudo conectar a ninguna base de datos');
        }
    }
};

module.exports = { connection };
