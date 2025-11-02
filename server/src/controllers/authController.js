/* Import modules */
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User, OAuthAccount, UserService } from '../models/indexModel.js';

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

    const timerOauth = await OAuthAccount.create({ user_id: newUser.id, provider: 'Timer', provider_user_id: `timer-${newUser.id}` });
    await UserService.create({ user_id: newUser.id, service_id: 1, oauth_account_id: timerOauth.id });

    const token = jwt.sign({ userId: newUser.id, role: 'user' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true, secure: true, maxAge: 60 * 60 * 1000 });

    res.status(201).json({ success: true, message: 'User registered successfully', token });
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

    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true, secure: true, maxAge: 60 * 60 * 1000 });

    res.status(200).json({ success: true, message: 'User login successful', token });
};

/* Controller for user logout */
const logout = (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ success: false, message: 'Not authenticated' });
    }
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
        if (decoded.role === 'admin') {
            return res.status(200).json({ success: true, isAdmin: true });
        }
        return res.status(200).json({ success: true, isAdmin: false });
    } catch (err) {
        return res.status(401).json({ success: false, isAdmin: false });
    }
};

/* Controller to return current user based on token cookie */
const me = async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ success: false, error: 'Not authenticated' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByPk(decoded.userId, { attributes: { exclude: ['password_hash'] } });
        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }
        return res.status(200).json({ success: true, user });
    } catch (err) {
        console.error('Error in auth.me:', err);
        return res.status(401).json({ success: false, error: 'Invalid token' });
    }
};

/* Exported controllers */
export default { register, login, logout, isConnected, isAdmin, me };
