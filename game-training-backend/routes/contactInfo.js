const express = require('express');
const router = express.Router();
const ContactInfo = require('../models/ContactInfo');

const auth = require('../middleware/auth');


//insert contact info
router.post('/', async (req, res) => {
     console.log(req.body); 
  const { address, email, phone, googleMapEmbedUrl } = req.body;
  if (!address || !email || !phone || !googleMapEmbedUrl) {
    return res.status(400).json({ msg: 'Please fill in all fields' });
  }

  try {
    const contactInfo = new ContactInfo(req.body);
    await contactInfo.save();
    res.status(201).json({ msg: 'Contact information submitted successfully' });
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
});

//get all contact info
router.get('/', async (req, res) => {
  try {
    const contactInfos = await ContactInfo.find();
    res.json(contactInfos);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
});

//update contact info by ID
router.put('/:id',auth, async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, message } = req.body;

  if (!name || !email || !phone || !message) {
    return res.status(400).json({ msg: 'Please fill in all fields' });
  }

  try {
    const contactInfo = await ContactInfo.findByIdAndUpdate(id, req.body, { new: true });
    if (!contactInfo) return res.status(404).json({ msg: 'Contact info not found' });
    res.json(contactInfo);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;