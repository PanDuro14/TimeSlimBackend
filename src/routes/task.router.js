const express = require('express'); 
const router = express.Router(); 
const taskController = require('../Controllers/task.controller'); 

router.get('/', taskController.getAlltask); 
router.get('/:id', taskController.getOneTask); 
router.get('/:user_id', taskController.getByUser); 
router.post('/', taskController.createTask); 
router.put('/:id', taskController.updateTask); 
router.delete('/:id', taskController.deleteTask); 

module.exports = router; 