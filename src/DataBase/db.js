// db.js
import postgres from 'postgres';

// Conexión usando DATABASE_URL del .env
const connectionString = process.env.DATABASE_URL;

// El objeto 'sql' maneja conexiones y pooling automáticamente
const sql = postgres(connectionString);

export default sql;
