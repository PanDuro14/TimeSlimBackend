// controller
const jwt = require('jsonwebtoken');
const userProcess = require('../Procesess/users.process');

// Login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email) return res.status(400).json({ success: false, message: 'Email missing' });
        if (!password) return res.status(400).json({ success: false, message: 'Password missing' });

        const user = await userProcess.login(email, password);
        if (!user) return res.status(401).json({ success: false, message: 'Incorrect credentials' });

        const token = jwt.sign(
            { userId: user.id, username: user.username, email: user.email },
            process.env.JWT_SECRET, { expiresIn: '1h' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            path: '/',
            maxAge: 60 * 60 * 1000
        });

        return res.status(200).json({ success: true, token, user });
    } catch (error) {
        return res.status(502).json({ error: 'Error: Login Failed' });
    }
};

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await userProcess.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(502).json({ error: 'Error: GetAllUsers failed' });
    }
};

// Get one user
const getOneUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ error: 'ID Missing' });

        const user = await userProcess.getOneUser(id);
        if (!user) return res.status(404).json({ error: 'User Doesn\'t exist' });

        res.status(200).json(user);
    } catch (error) {
        res.status(502).json({ error: 'Error: GetOne failed' });
    }
};

// Create user
const createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        const newUser = await userProcess.createUser(username, email, password);
        if (!newUser) {
            return res.status(500).json({ success: false, message: 'Error creating user' });
        }

        res.status(201).json({ success: true, user: newUser });
    } catch (error) {
        res.status(502).json({ error: 'Error: User creation failed' });
    }
};

// Update user
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email, password } = req.body;

        if (!id || !username || !email || !password) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        const updatedUser = await userProcess.updateUser(id, username, email, password);
        if (!updatedUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({ success: true, user: updatedUser });
    } catch (error) {
        res.status(502).json({ error: 'Error: User update failed' });
    }
};

// Delete user
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ error: 'ID Missing' });

        const deletedUser = await userProcess.deleteUser(id);
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
        res.status(502).json({ error: 'Error: User deletion failed' });
    }
};

module.exports = {
    login,
    getAllUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteUser
};
