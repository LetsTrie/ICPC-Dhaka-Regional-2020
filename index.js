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

app.get('/bingo', async (req, res, next) => {
  const Team = require('./models/team');
  const teams = await Team.find();
  for (let t of teams) {
    if (t.payment_transition_id) {
      t.payment_status = 'Paid';
    } else {
      t.payment_status = 'Not Paid Yet';
    }
    await t.save();
  }
  return res.json({ success: true });
});

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

const PORT = process.env.PORT;
app.listen(PORT, console.log(`server is running at port: ${PORT}`));
