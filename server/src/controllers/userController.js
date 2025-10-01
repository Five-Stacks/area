import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/userModel.js';

/* Controller for user routes */

/* Get all users */
const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({ attributes: { exclude: ['password_hash'] } });
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/* Get user by ID */
const getUserById = async (req, res) => {
    if ((req.params.id != req.userId) && (req.userRole !== 'admin')) {
        return res.status(403).json({ error: 'Forbidden' });
    }

    try {
        const user = await User.findByPk(req.params.id, { attributes: { exclude: ['password_hash'] } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/* Update user */
const updateUser = async (req, res) => {
    if ((req.params.id != req.userId) && (req.userRole !== 'admin')) {
        return res.status(403).json({ error: 'Forbidden' });
    }

    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        await user.update(req.body);
        res.json({ message: 'User updated successfully' });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/* Delete user */
const deleteUser = async (req, res) => {
    if ((req.params.id != req.userId) && (req.userRole !== 'admin')) {
        return res.status(403).json({ error: 'Forbidden' });
    }

    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        await user.destroy();
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/* Export user controller */
const userController = {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};

export default userController;
