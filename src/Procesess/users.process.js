const userService = require('../Services/users.service'); 

const login = async(email, password) => {
    const user = await userService.login(email, password); 
    return user; 
}

const getAllUsers = async () => {
    const user = await userService.getAllUsers(); 
    return user; 
}

const getOneUser = async (id) => {
    const user = await userService.getOneUser(id); 
    return user; 
}

const createUser = async (username, email, password) => {
    const user = await userService.createUser(username, email, password);
    return user; 
}

const updateUser = async (id, username, email, password) => {
    const user = await userService.updateUser(id, username, email, password); 
    return user; 
}

const deleteUser = async (id) => {
    const user = await userService.deleteUser(id); 
    return user; 
}

module.exports = {
    login, 
    getAllUsers, 
    getOneUser,
    createUser, 
    updateUser, 
    deleteUser
}