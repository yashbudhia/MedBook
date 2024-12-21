const jwt = require('jsonwebtoken');
const Patient = require('../models/Patient');

const auth = async (req, res, next) => {
    try {
        // Extract token from Authorization header
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Authorization token missing or malformed' });
        }

        const token = authHeader.split(' ')[1];
        const secret = process.env.JWT_SECRET || 'default_secret'; // Use environment variable in production

        // Verify token
        const decoded = jwt.verify(token, secret);
        const patient = await Patient.findById(decoded.id);
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        // Attach patient to request object
        req.patient = patient;
        next();
    } catch (err) {
        console.error('Auth Middleware Error:', err);
        res.status(401).json({ error: 'Invalid or expired token' });
    }
};

module.exports = auth;
