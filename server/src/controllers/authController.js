/* Import modules */
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/userModel.js';

/* Controller for user registration */
const register = async (req, res) => {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
        return res.status(400).json({ success: false, error: 'All fields are required' });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        return res.status(409).json({ success: false, error: 'User already exists' });
    }

    const password_hash = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password_hash, name });

    const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true, secure: true, maxAge: 60 * 60 * 1000 });

    res.status(201).json({ success: true, message: 'User registered successfully' });
}

/* Controller for user login */
const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, error: 'Email and password are required' });
    }

    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
        return res.status(401).json({ success: false, error: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true, secure: true, maxAge: 60 * 60 * 1000 });

    res.status(200).json({ success: true, message: 'User login successful' });
};

/* Controller for user logout */
const logout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ success: true, message: 'User logged out successfully' });
};

/* Controller to check if user is connected */
const isConnected = (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ success: false, connected: false });
    }
    try {
        jwt.verify(token, process.env.JWT_SECRET);
        return res.status(200).json({ success: true, connected: true });
    } catch (err) {
        return res.status(401).json({ success: false, connected: false });
    }
};

/* Controller to check if user is admin */
const isAdmin = async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ success: false, isAdmin: false });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByPk(decoded.userId);
        if (user && user.role === 'admin') {
            return res.status(200).json({ success: true, isAdmin: true });
        }
        return res.status(200).json({ success: true, isAdmin: false });
    } catch (err) {
        return res.status(401).json({ success: false, isAdmin: false });
    }
};

/* Exported controllers */
export default { register, login, logout, isConnected, isAdmin };
