/* Import modules */
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/userModel.js';

/* Controller for user registration */
const register = async (req, res) => {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        return res.status(409).json({ error: 'User already exists' });
    }

    const password_hash = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password_hash, name });

    const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true, secure: true, maxAge: 60 * 60 * 1000 });

    res.status(201).json({ message: 'User registered successfully' });
}

/* Controller for user login */
const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true, secure: true, maxAge: 60 * 60 * 1000 });

    res.status(200).json({ message: 'User login successful' });
};

/* Controller for user logout */
const logout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'User logged out successfully' });
};

/* Exported controllers */
export default { register, login, logout };