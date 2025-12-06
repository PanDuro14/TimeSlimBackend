const { connection } = require('../DataBase/connection'); // Importamos la función de conexión
const bcrypt = require('bcryptjs');

// Función para login
const login = async (email, password) => {
    const pool = await connection('users');  // Usamos await para esperar la conexión

    return new Promise((resolve, reject) => {
        const sql = 'SELECT id, username, email, password FROM users WHERE email = $1';
        pool.query(sql, [email], async (error, results) => {
            if (error) return reject(error);  // En caso de error en la consulta
            if (results.rows.length === 0) return reject('Error: Miss user');  // Si no se encuentra el usuario

            const user = results.rows[0];
            const isMatch = await bcrypt.compare(password, user.password);  // Comparar contraseñas
            isMatch ? resolve(user) : reject('Incorrect password');  // Validar la contraseña
        });
    });
};

// Obtener todos los usuarios
const getAllUsers = async () => {
    const pool = await connection('users');  // Usamos await para esperar a que se resuelva la conexión

    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM users';
        pool.query(sql, (error, results) => {
            if (error) return reject(error);  // En caso de error en la consulta
            resolve(results.rows);  // Si todo sale bien, devolvemos los resultados
        });
    });
};

// Obtener un usuario por ID
const getOneUser = async (id) => {
    const pool = await connection('users');  // Usamos await para esperar a que se resuelva la conexión

    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM users WHERE id = $1';
        pool.query(sql, [id], (error, results) => {
            if (error) return reject(error);  // En caso de error en la consulta
            resolve(results.rows[0]);  // Si todo sale bien, devolvemos el usuario
        });
    });
};

// Crear un nuevo usuario
const createUser = async (username, email, password) => {
    const pool = await connection('users');  // Usamos await para esperar a que se resuelva la conexión

    return new Promise(async (resolve, reject) => {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const sql = `
            INSERT INTO users (username, email, password)
            VALUES ($1, $2, $3) RETURNING *;
        `;
        pool.query(sql, [username, email, hashedPassword], (error, results) => {
            if (error) return reject(error);  // En caso de error en la consulta
            resolve(results.rows[0]);  // Si todo sale bien, devolvemos el nuevo usuario
        });
    });
};

// Actualizar un usuario
const updateUser = async (id, username, email, password) => {
    const pool = await connection('users');  // Usamos await para esperar a que se resuelva la conexión

    return new Promise(async (resolve, reject) => {
        const sql = `UPDATE users
            SET username = $1, email = $2, password = $3
            WHERE id = $4;`;
        pool.query(sql, [username, email, password, id], (error, results) => {
            if (error) return reject(error);  // En caso de error en la consulta
            resolve('User updated');  // Si todo sale bien, devolvemos un mensaje de éxito
        });
    });
};

// Eliminar un usuario
const deleteUser = async (id) => {
    const pool = await connection('users');  // Usamos await para esperar a que se resuelva la conexión

    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM users WHERE id = $1';
        pool.query(sql, [id], (error, results) => {
            if (error) return reject(error);  // En caso de error en la consulta
            resolve('Usuario eliminado');  // Si todo sale bien, devolvemos un mensaje de éxito
        });
    });
};

module.exports = {
    login,
    getAllUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteUser
};
 