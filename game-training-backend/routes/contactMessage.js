const express = require('express');
const router = express.Router();
const ContactInfo = require('../models/ContactMessage');


router.post('/', async (req, res) => {
  const { name, email, phone, message } = req.body;
  if (!name || !email || !phone || !message) {
    return res.status(400).json({ msg: 'Please fill in all fields' });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10,15}$/; 
  if (!emailRegex.test(email)) {
    return res.status(400).json({ msg: 'Invalid email format' });
  }
  if (!phoneRegex.test(phone)) {
    return res.status(400).json({ msg: 'Phone number must be numeric and 10–15 digits long' });
  }
  try {
    const contactMessage = new ContactInfo(req.body);
    await contactMessage.save();
    res.status(201).json({ msg: 'Contact message submitted successfully' });
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;