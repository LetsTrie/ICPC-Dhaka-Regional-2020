const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const errorHandler = require('./middlewares/error');

const app = express();

// Configure .env
require('dotenv').config();

// Database setup
let dbAddress = process.env.mongoString;
if (process.env.NODE_ENV === 'production')
  dbAddress = process.env.mongoStringProd;

mongoose.connect(
  dbAddress,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  },
  () => console.log('connected to database!')
);

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

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`server is running at port: ${PORT}`));
