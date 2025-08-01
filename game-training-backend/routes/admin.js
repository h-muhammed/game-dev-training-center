const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Registration = require('../models/Registration');
const auth = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });

  if (!admin) return res.status(400).json({ msg: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token });
});

router.get('/registrations', auth, async (req, res) => {
  const Registration = require('../models/Registration');

  try {
    const data = await Registration.find().populate('course'); // 👈 this joins course data
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});
//update register student status
router.put('/registration/:id/status',auth, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  // Optional: Validate allowed status values
  const allowedStatuses = ['active', 'deactive'];
  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid status value' });
  }

  try {
    const updatedRegistration = await Registration.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedRegistration) {
      return res.status(404).json({ error: 'Registration not found' });
    }

    res.json({ message: 'Status updated successfully', data: updatedRegistration });
  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

//register new admin
router.post('/register',auth,isAdmin, async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ msg: 'Please fill in all fields' });
  }

  try {
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) return res.status(400).json({ msg: 'Admin already exists' });

    const admin = new Admin({ username, password });
    await admin.save();
    res.status(201).json({ msg: 'Admin registered successfully' });
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
