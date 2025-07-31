const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration');

router.post('/', async (req, res) => {
    const { name, email, phone, course, message } = req.body;
    if (!name || !email || !phone || !course) {
        return res.status(400).json({ msg: 'Please fill in all required fields' });
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
