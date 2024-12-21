const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const Patient = require('../models/Patient');
const auth = require('../middleware/auth'); // Import the auth middleware
const router = express.Router();

// Sign Up
router.post(
    '/signup',
    [
        body('name').notEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage('Valid email is required'),
        body('userId').notEmpty().withMessage('User ID is required'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, userId, password } = req.body;
        try {
            // Check if userId or email already exists
            const existingPatient = await Patient.findOne({ $or: [{ userId }, { email }] });
            if (existingPatient) {
                return res.status(400).json({ error: 'User ID or Email already exists' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const newPatient = new Patient({ name, email, userId, password: hashedPassword });
            await newPatient.save();
            res.status(201).json({ message: 'Patient registered successfully' });
        } catch (err) {
            console.error('Signup Error:', err); // Log errors
            res.status(500).json({ error: 'Registration failed' });
        }
    }
);

// Sign In
router.post(
    '/signin',
    [
        body('userId').notEmpty().withMessage('User ID is required'),
        body('password').notEmpty().withMessage('Password is required'),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            console.log('Request Body:', req.body); // Log incoming data

            const { userId, password } = req.body;

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
    }
);

/* -------------------------------------------------------
   MEDICATION ROUTES
------------------------------------------------------- */

// GET all medications for the logged-in patient
router.get('/medications', auth, async (req, res) => {
    try {
        const patient = req.patient;
        res.status(200).json({ medications: patient.medications });
    } catch (err) {
        console.error('Fetch Medications Error:', err);
        res.status(500).json({ error: 'Failed to fetch medications' });
    }
});

// POST a new medication
router.post(
    '/medications',
    auth,
    [
        body('name').notEmpty().withMessage('Name is required'),
        body('dosage').notEmpty().withMessage('Dosage is required'),
        body('schedule').notEmpty().withMessage('Schedule is required'),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { name, dosage, schedule, status } = req.body;

            const patient = req.patient;

            const newMedication = {
                name,
                dosage,
                schedule,
                status: status || 'Active',
            };

            patient.medications.push(newMedication);
            await patient.save();

            res.status(201).json({ message: 'Medication added successfully', medications: patient.medications });
        } catch (err) {
            console.error('Add Medication Error:', err);
            res.status(500).json({ error: 'Failed to add medication' });
        }
    }
);

// DELETE a medication by _id
router.delete('/medications/:medId', auth, async (req, res) => {
    try {
        const { medId } = req.params;
        const patient = req.patient;

        const medication = patient.medications.id(medId);
        if (!medication) {
            return res.status(404).json({ error: 'Medication not found' });
        }

        medication.remove();
        await patient.save();

        return res.status(200).json({ message: 'Medication deleted successfully', medications: patient.medications });
    } catch (err) {
        console.error('Delete Medication Error:', err);
        res.status(500).json({ error: 'Failed to delete medication' });
    }
});

/* -------------------------------------------------------
   FAMILY HISTORY ROUTES
------------------------------------------------------- */

// GET all family members for the logged-in patient
router.get('/family-history', auth, async (req, res) => {
    try {
        const patient = req.patient;
        res.status(200).json({ familyHistory: patient.familyHistory });
    } catch (err) {
        console.error('Fetch Family History Error:', err);
        res.status(500).json({ error: 'Failed to fetch family history' });
    }
});

// POST a new family member
router.post(
    '/family-history',
    auth,
    [
        body('name').notEmpty().withMessage('Name is required'),
        body('relation').notEmpty().withMessage('Relation is required'),
        body('conditions').notEmpty().withMessage('Conditions are required'),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { name, relation, conditions } = req.body;

            const patient = req.patient;

            const conditionsArray = conditions.split(',').map(c => c.trim());

            const newFamilyMember = {
                name,
                relation,
                conditions: conditionsArray,
            };

            patient.familyHistory.push(newFamilyMember);
            await patient.save();

            res.status(201).json({ message: 'Family member added successfully', familyHistory: patient.familyHistory });
        } catch (err) {
            console.error('Add Family Member Error:', err);
            res.status(500).json({ error: 'Failed to add family member' });
        }
    }
);

// DELETE a family member by _id
router.delete('/family-history/:famId', auth, async (req, res) => {
    try {
        const { famId } = req.params;
        const patient = req.patient;

        const familyMember = patient.familyHistory.id(famId);
        if (!familyMember) {
            return res.status(404).json({ error: 'Family member not found' });
        }

        familyMember.remove();
        await patient.save();

        return res.status(200).json({ message: 'Family member deleted successfully', familyHistory: patient.familyHistory });
    } catch (err) {
        console.error('Delete Family Member Error:', err);
        res.status(500).json({ error: 'Failed to delete family member' });
    }
});

module.exports = router;
