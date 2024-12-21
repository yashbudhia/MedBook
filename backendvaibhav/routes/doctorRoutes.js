const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Doctor = require('../models/Doctor');
const router = express.Router();

// Sign Up
router.post('/signup', async (req, res) => {
    const { name, email, licenseNumber, userId, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newDoctor = new Doctor({ name, email, licenseNumber, userId, password: hashedPassword });
        await newDoctor.save();
        res.status(201).json({ message: 'Doctor registered successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Registration failed' });
    }
});

// Sign In
router.post('/signin', async (req, res) => {
    const token = jwt.sign({ id: Doctor._id }, 'default_secret', { expiresIn: '1h' });

    const { userId, password } = req.body;
    try {
        console.log('Request Body:', req.body); // Log the request body

        const doctor = await Doctor.findOne({ userId });
        if (!doctor) {
            console.log('Doctor not found');
            return res.status(404).json({ error: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, doctor.password);
        if (!isMatch) {
            console.log('Invalid credentials');
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Use a fallback for JWT_SECRET if not defined
        const secret = process.env.JWT_SECRET || 'default_secret';
        const token = jwt.sign({ id: doctor._id }, secret, { expiresIn: '1h' });
        console.log('Login successful, Token:', token);

        res.status(200).json({ token });
    } catch (err) {
        console.error('Signin Error:', err); // Log the error
        res.status(500).json({ error: 'Sign in failed' });
    }
});


module.exports = router;
