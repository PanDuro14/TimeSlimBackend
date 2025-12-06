const taskService = require('../Services/task.service'); 

const getAlltask = async() => {
    const task = await taskService.getAlltask(); 
    return task; 
}

const getOneTask = async(id) => {
    const task = await taskService.getOneTask(id); 
    return task; 
}

const getByUser = async(user_id) => {
    const task = await taskService.getByUser(user_id); 
    return task; 
}

const createTask = async(user_id, title, description, is_finished, date_started, date_finished) => {
    const task = await taskService.createTask(user_id, title, description, is_finished, date_started, date_finished); 
    return task; 
}

const updateTask = async(id, user_id, title, description, is_finished, date_started,  date_finished) => {
    const task = await taskService.updateTask(id, user_id, title, description, is_finished, date_started,  date_finished); 
    return task; 
}

const deleteTask = async(id) => {
    const task = await taskService.deleteTask(id); 
    return task; 
}
module.exports = {
    getAlltask, 
    getOneTask, 
    getByUser, 
    createTask, 
    updateTask, 
    deleteTask
}