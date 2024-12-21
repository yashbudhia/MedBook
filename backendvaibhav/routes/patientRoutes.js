const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Patient = require('../models/Patient');
const router = express.Router();

// Sign Up
router.post('/signup', async (req, res) => {
    const { name, email, userId, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newPatient = new Patient({ name, email, userId, password: hashedPassword });
        await newPatient.save();
        res.status(201).json({ message: 'Patient registered successfully' });
    } catch (err) {
        console.error('Signup Error:', err); // Log errors
        res.status(500).json({ error: 'Registration failed' });
    }
});

// Sign In
router.post('/signin', async (req, res) => {
    try {
        console.log('Request Body:', req.body); // Log incoming data

        const { userId, password } = req.body;

        // Validate input
        if (!userId || !password) {
            return res.status(400).json({ error: 'User ID and password are required' });
        }

        // Check if user exists
        const patient = await Patient.findOne({ userId });
        if (!patient) {
            console.log('User not found');
            return res.status(404).json({ error: 'User not found' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, patient.password);
        if (!isMatch) {
            console.log('Invalid credentials');
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Generate token with fallback to default secret
        const secret = process.env.JWT_SECRET || 'default_secret';
        const token = jwt.sign({ id: patient._id }, secret, { expiresIn: '1h' });
        console.log('Login successful, Token:', token);

        return res.status(200).json({ token });
    } catch (err) {
        console.error('Signin Error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
