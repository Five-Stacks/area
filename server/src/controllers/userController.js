import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/userModel.js';

/* Controller for user routes */

/* Create new user */
const createUser = async (req, res) => {
    const { name, email, password, role } = req.body;

    const userRole = await getUserRoleFromId(req.user.userId);
    if (userRole !== 'admin') {
        return res.status(403).json({ success: false, error: 'Forbidden' });
    }

    if (!name || !email || !password) {
        return res.status(400).json({ success: false, error: 'Name, email, and password are required' });
    }

    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ success: false, error: 'Email already in use' });
        }
    } catch (error) {
        console.error('Error checking existing user:', error);
        return res.status(500).json({ success: false, error: 'Internal server error' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password_hash: hashedPassword, role });
        res.status(201).json({ success: true, message: 'User registered successfully' });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

/* Get all users */
const getAllUsers = async (req, res) => {
    const userRole = await getUserRoleFromId(req.user.userId);
    if (userRole !== 'admin') {
        return res.status(403).json({ success: false, error: 'Forbidden' });
    }

    try {
        const users = await User.findAll({ attributes: { exclude: ['password_hash'] } });
        res.status(200).json({ success: true, users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

/* Get user by ID */
const getUserById = async (req, res) => {
    const userRole = await getUserRoleFromId(req.user.userId);
    if (userRole !== 'admin' && Number(req.params.id) !== req.user.userId) {
        return res.status(403).json({ success: false, error: 'Forbidden' });
    }

    try {
        const user = await User.findByPk(req.params.id, { attributes: { exclude: ['password_hash'] } });
        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }
    res.status(200).json({ success: true, user });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

/* Update user */
const updateUser = async (req, res) => {
    const userRole = await getUserRoleFromId(req.user.userId);
    if (userRole !== 'admin' && Number(req.params.id) !== req.user.userId) {
        return res.status(403).json({ success: false, error: 'Forbidden' });
    }

    if (req.body.password) {
        req.body.password_hash = await bcrypt.hash(req.body.password, 10);
        delete req.body.password;
    }

    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }
        await user.update(req.body);
        res.json({ success: true, message: 'User updated successfully' });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

/* Delete user */
const deleteUser = async (req, res) => {
    const userRole = await getUserRoleFromId(req.user.userId);
    if (userRole !== 'admin' && Number(req.params.id) !== req.user.userId) {
        return res.status(403).json({ success: false, error: 'Forbidden' });
    }

    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }
        await user.destroy();
        res.json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

async function getUserRoleFromId(userId) {
    try {
        const user = await User.findOne({ where: { id: userId } });
        if (user) {
            return user.role;
        }
        return null;
    } catch (err) {
        console.error('Error fetching user role:', err);
        return null;
    }
}

/* Export user controller */
const userController = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};

export default userController;
