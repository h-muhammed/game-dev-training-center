const express = require('express');
const router = express.Router();
const ContactInfo = require('../models/ContactMessage');


router.post('/', async (req, res) => {
  const { name, email, phone, message } = req.body;
  if (!name || !email || !phone || !message) {
    return res.status(400).json({ msg: 'Please fill in all fields' });
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