const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration');

router.post('/', async (req, res) => {
    const { name, email, phone, course, message } = req.body;

    // Basic required fields check
    if (!name || !email || !phone || !course) {
        return res.status(400).json({ msg: 'Please fill in all required fields' });
    }

   
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10,15}$/; 

    if (typeof name !== 'string' || name.trim().length < 2) {
        return res.status(400).json({ msg: 'Name must be at least 2 characters long' });
    }

    if (!emailRegex.test(email)) {
        return res.status(400).json({ msg: 'Invalid email format' });
    }

    if (!phoneRegex.test(phone)) {
        return res.status(400).json({ msg: 'Phone number must be numeric and 10–15 digits long' });
    }

    if (typeof course !== 'string' || course.trim().length === 0) {
        return res.status(400).json({ msg: 'Course must be a non-empty string' });
    }

    if (message && message.length > 500) {
        return res.status(400).json({ msg: 'Message should not exceed 500 characters' });
    }

    try {
        const registration = new Registration(req.body);
        await registration.save();
        res.status(201).json({ msg: 'Registration successful' });
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;
