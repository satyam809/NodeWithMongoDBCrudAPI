// app.js
const express = require('express');
const app = express();
const db = require('./db');
const userRoutes = require('./routes/userRoutes');

app.use(express.json());

app.use('/users', userRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
