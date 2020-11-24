const express = require('express');
const app = express();

// Configure .env
require('dotenv').config();

// Data setup
require('./config/databaseSetup.js')();

// Express set up
app.use(require('cors')());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static Files
app.use(express.static('uploads'));

app.use('/api/v1', require('./index.route'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`server is running at port: ${PORT}`));
