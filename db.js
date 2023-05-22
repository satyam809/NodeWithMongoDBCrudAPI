// db.js
const mongoose = require('mongoose');

const uri = 'mongodb://localhost:27017/test'; // MongoDB connection URI

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

module.exports = mongoose.connection;
