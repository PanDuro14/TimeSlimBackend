const taskProcess = require('../Procesess/task.process'); 

const getAlltask = async (req, res) => {
    try {
        const task = await taskProcess.getAlltask(); 
        return res.status(200).json(task); 
    } catch (error) {
        return res.status(502).json({ error: `Error: ${self} failed`}); 
    }
}

const getOneTask = async (req, res) => {
    try {
        const { id } = req.params; 
        if (!id) return res.status(400).json({ error: 'ID missing '}); 

        const task = await taskProcess.getOneTask(id); 
        if (!user) return res.status(404).json({ error: 'Task doesnt exist '}); 

        return res.status(200).json(task); 
    } catch (error) {
        return res.status(502).json({ error: `Error: ${self} failed`}); 
    }
}

const getByUser = async (req, res) => {
    try {
        const { user_id } = req.params; 
        if (!user_id) return res.status(400).json({ error: 'user id missing'}); 

        const task = await taskProcess.getByUser(user_id); 
        if (!task) return res.status(404).json({ error: 'Task desnt exist'}); 

        return res.status(200).json(task); 
    } catch (error) {
        return res.status(502).json({ error: `Error: ${self} failed`}); 
    }
}

const createTask = async (req, res) => {
    try {
        const { user_id, title, description, is_finished, date_started,  date_finished } = req.body; 
        
        if ( !user_id )      return res.status(400).json({ error: 'User id missing'}); 
        if ( !title )        return res.status(400).json({ error: 'title missing'}); 
        if ( !description)   return res.status(400).json({ error: 'description missing'}); 
        if ( !is_finished)   return res.status(400).json({ error: 'is_finished missing'}); 
        if ( !date_started)  return res.status(400).json({ error: 'date_started missing'}); 
        if ( !date_finished) return res.status(400).json({ error: 'date_finished missing'}); 

        const task = await taskProcess.createTask(user_id, title, description, is_finished, date_started,  date_finished); 
        if (!task) return res.status(500).json({ error: 'no sé que tipo de error es este pero algo salió mal al intentar crear dentro del try xd'}); 

        return res.status(200).json(task); 
    } catch (error) {
        return res.status(502).json({ error: `Error: ${self} failed`}); 
    }
}

const updateTask = async (req, res) => {
    try {
        const { id } = req.params; 
        const { user_id, title, description, is_finished, date_started,  date_finished } = req.body; 

        const task = await taskProcess.updateTask(user_id, title, description, is_finished, date_started,  date_finished, id); 

        return res.status(200).json(task); 
    } catch (error) {
        return res.status(502).json({ error: `Error: ${self} failed`}); 
    }
}

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params; 
        if (!id) return res.status(400).json({ error: 'ID missing'}); 

        const task = await taskProcess.deleteTask(id); 
        if (!task) return res.status(404).json({ error: 'Task not found'}); 
        return res.status(200).json(task); 
    } catch (error) {
        return res.status(502).json({ error: `Error: ${self} failed`}); 
    }
}

module.exports = {
    getAlltask, 
    getOneTask, 
    getByUser, 
    createTask, 
    updateTask, 
    deleteTask
}