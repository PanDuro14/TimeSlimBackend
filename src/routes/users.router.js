// routes.js o app.js
const express = require('express');
const router = express.Router();
const userController = require('../Controllers/users.controller'); 

router.post('/login', userController.login);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getOneUser);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
