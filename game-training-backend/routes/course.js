const Course = require('../models/Course');
const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');

router.post('/',auth, async (req, res) => {
   console.log(req.body);
  const { title, image, description, duration, fee } = req.body;

  if (!title || !image || !description || !duration || !fee ) {
    return res.status(400).json({ msg: 'Please fill in all fields' });
  }

  try {
    const course = new Course({ title, image, description, duration, fee });
    await course.save();
    res.status(201).json({ msg: 'Course created successfully', course });
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
