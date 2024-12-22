// routes/doctorRoutes.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Doctor = require('../models/Doctor');

const router = express.Router();

// Sign Up (Doctor)
router.post('/signup', async (req, res) => {
    const { name, email, licenseNumber, userId, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newDoctor = new Doctor({ name, email, licenseNumber, userId, password: hashedPassword });
        await newDoctor.save();
        res.status(201).json({ message: 'Doctor registered successfully' });
    } catch (err) {
        console.error('Doctor Signup Error:', err);
        res.status(500).json({ error: 'Registration failed' });
    }
});

// Sign In (Doctor)
router.post('/signin', async (req, res) => {
    try {
        const { userId, password } = req.body;

        const doctor = await Doctor.findOne({ userId });
        if (!doctor) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, doctor.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const secret = process.env.JWT_SECRET || 'default_secret';
        // include userType: 'doctor'
        const token = jwt.sign({ id: doctor._id, userType: 'doctor' }, secret, { expiresIn: '1h' });

        res.status(200).json({
            token,
            userId: doctor.userId,
            name: doctor.name,
        });
    } catch (err) {
        console.error('Doctor Signin Error:', err);
        res.status(500).json({ error: 'Sign in failed' });
    }
});

module.exports = router;
