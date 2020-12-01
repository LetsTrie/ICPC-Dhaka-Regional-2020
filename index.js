const express = require('express');
const app = express();
const path = require('path');

// Configure .env
require('dotenv').config();

// Data setup
require('./config/databaseSetup.js')();

app.use(require('cors')());

// Express set up
app.use(require('cors')());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static Files
app.use(express.static('uploads'));

app.use('/api/v1', require('./index.route'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/client/build')));
  app.get('*', (req, res) => {
    return res.sendFile(
      path.resolve(__dirname, 'client', 'build', 'index.html')
    );
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`server is running at port: ${PORT}`));
