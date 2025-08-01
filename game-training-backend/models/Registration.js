const mongoose = require('mongoose');

const RegistrationSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  phone: { type: String, required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  message: { type: String, trim: true },
  status: { type: String, enum: ['active', 'deactive'], default: 'deactive' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Registration', RegistrationSchema);
