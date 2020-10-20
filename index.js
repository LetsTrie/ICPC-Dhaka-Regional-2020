const express = require('express');
const app = express();
const cors = require('cors')

// Configure .env
require('dotenv').config() 

// Data setup
require('./config/databaseSetup.js')()

// Express set up
app.use(cors())
app.use(express.json());

// Routes
app.use('/api/v1', require('./index.route'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`server is running at port: ${PORT}`));