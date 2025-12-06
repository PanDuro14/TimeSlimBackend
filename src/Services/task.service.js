const { connection } = require('../DataBase/connection'); 

const getAlltask = async() => {
    const pool = await connection('tasks'); 
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM task'; 
        pool.query(sql, (error, results) => {
            if (error) return reject(error); 
            resolve(results.rows); 
        });
    }); 
}

const getOneTask = async(id) => {
    const pool = await connection('tasks'); 
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM task WHERE id = $1`; 
        pool.query(sql, [id], (error, results) => {
            if (error) return reject(error); 
            resolve(results.rows[0]); 
        }); 
    }); 
}

const getByUser = async(user_id) => {
    const pool = await connection('Task'); 
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM task WHERE user_id = $1`; 
        pool.query(sql, [user_id], (error, results) => {
            if (error) return reject(error); 
            resolve(results.rows);
        }); 
    });
}

const createTask = async(user_id, title, description, is_finished, date_started,  date_finished) => {
    const pool = await connection('task'); 
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO task 
            (user_id, title, description, is_finished, date_started,  date_finished)
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING *; 
        `; 
        pool.query(sql, [user_id, title, description, is_finished, date_started,  date_finished], (error, results) => {
            if(error) return reject(error); 
            resolve(results.rows[0]); 
        }); 
    });
}

const updateTask = async (id, user_id, title, description, is_finished, date_started,  date_finished) => {
    const pool = await connection('task'); 
    return new Promise((resolve, reject) => {
        const sql = `UPDATE task
            SET user_id = $1, title = $2, description = $3, is_finished = $4, date_started = $5, date_finished = $6
            WHERE id = $7
        `
        pool.query(sql, [user_id, title, description, is_finished, date_started,  date_finished, id], (error, results) => {
            if (error) return reject(error); 
            resolve('Tarea actualizada'); 
        }); 
    }); 
}

const deleteTask = async(id) => {
    const pool = await connection('task'); 
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM task WHERE id = $1'; 
        pool.query(sql, [id], (error, results) => {
            if (error) reject(error); 
            resolve(`Tarea ${id} ha sido eliminada Bv`); 
        }); 
    }); 
}


module.exports = {
    getAlltask, 
    getOneTask, 
    getByUser, 
    createTask, 
    updateTask, 
    deleteTask
}