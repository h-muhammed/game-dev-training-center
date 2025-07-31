require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DB_LOCAL_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'));

app.use('/api/register', require('./routes/register'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/courses', require('./routes/course'));
app.use('/api/contactinfo', require('./routes/contactInfo'));
app.use('/api/contactmessage', require('./routes/contactMessage'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
