require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // to serve index.html and details.html

// Routes
app.use('/', userRoutes);

// Connect to MongoDB and Start Server
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
  app.listen(3000, () => console.log('Server is running on http://localhost:3000'));
})
.catch(err => console.error('MongoDB connection failed:', err));
