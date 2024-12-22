const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const Patient = require('../models/Patient');
const auth = require('../middleware/auth'); // Import the auth middleware
const router = express.Router();
const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor'); // We'll need to find the doctor


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


router.get('/medications', auth, async (req, res) => {
    try {
        const patient = req.patient;
        res.status(200).json({ medications: patient.medications });
    } catch (err) {
        console.error('Fetch Medications Error:', err);
        res.status(500).json({ error: 'Failed to fetch medications' });
    }
});


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

        // 1) Track the array length before
        const beforeCount = patient.medications.length;

        // 2) Pull subdocument(s) matching _id = medId
        patient.medications.pull({ _id: medId });

        // 3) Check if anything was removed
        if (patient.medications.length === beforeCount) {
            return res.status(404).json({ error: 'Medication not found' });
        }

        // 4) Save updates
        await patient.save();
        return res.status(200).json({
            message: 'Medication deleted successfully',
            medications: patient.medications,
        });
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

        // Option A: pull
        const originalLength = patient.familyHistory.length;
        patient.familyHistory.pull({ _id: famId });
        if (patient.familyHistory.length === originalLength) {
            return res.status(404).json({ error: 'Family member not found' });
        }

        await patient.save();
        return res.status(200).json({
            message: 'Family member deleted successfully',
            familyHistory: patient.familyHistory,
        });
    } catch (err) {
        console.error('Delete Family Member Error:', err);
        res.status(500).json({ error: 'Failed to delete family member' });
    }
});

//For appointment 
//post an appointment
// POST /appointments
// POST /appointments
router.post(
    '/appointments',
    auth, // Ensure only authenticated patients can create an appointment
    [
        body('type').notEmpty().withMessage('Appointment type is required'),
        body('doctorUserId').notEmpty().withMessage('Doctor User ID is required'),
        body('date').notEmpty().withMessage('Date is required'),
        body('time').notEmpty().withMessage('Time is required'),
    ],
    async (req, res) => {
        // 1) Validate input
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { type, doctorUserId, date, time } = req.body;
            const patient = req.patient; // from auth middleware

            // 2) Find the doctor by userId
            const doctor = await Doctor.findOne({ userId: doctorUserId });
            if (!doctor) {
                // Throw an error if the Doctor's userId doesn't exist
                return res.status(404).json({ error: `Doctor with userId '${doctorUserId}' does not exist` });
            }

            // 3) Create a new Appointment referencing both patient & doctor
            const newAppointment = new Appointment({
                patient: patient._id,
                doctor: doctor._id,
                type,
                date,
                time,
            });

            // 4) Save and respond
            await newAppointment.save();
            return res.status(201).json({
                message: 'Appointment scheduled successfully',
                appointment: newAppointment
            });
        } catch (err) {
            console.error('Appointment Creation Error:', err);
            res.status(500).json({ error: 'Failed to create appointment' });
        }
    }
);

// GET /appointments
router.get('/appointments', auth, async (req, res) => {
    try {
        const patient = req.patient;

        // Find all appointments for this patient, optionally populate doctor details
        const appointments = await Appointment
            .find({ patient: patient._id })
            .populate('doctor', 'name email licenseNumber');
        // .populate('patient', 'name email') // If needed

        return res.status(200).json({ appointments });
    } catch (err) {
        console.error('Fetch Appointments Error:', err);
        res.status(500).json({ error: 'Failed to fetch appointments' });
    }
});
// DELETE /appointments/:id
// DELETE /appointments/:id
router.delete('/appointments/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const patient = req.patient;

        // 1) Find & delete the appointment owned by this patient
        const appointment = await Appointment.findOneAndDelete({
            _id: id,
            patient: patient._id, // Only delete if the appointment belongs to this patient
        });

        if (!appointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }

        return res.status(200).json({ message: 'Appointment deleted successfully' });
    } catch (err) {
        console.error('Delete Appointment Error:', err);
        res.status(500).json({ error: 'Failed to delete appointment' });
    }
});


module.exports = router;
