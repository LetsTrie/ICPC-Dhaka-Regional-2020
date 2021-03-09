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

// Temp email route
const { sendTeamEmail } = require('./config/sendMail');
const Team = require('./models/team');
app.post('/email', async (req, res) => {
  const paidTeams = new Array(30).fill('team').map((t, i) => `${t}-${i}`);
  const promises = [];

  for (let team of paidTeams) {
    promises.push({
      teamId: '1',
      promise: sendTeamEmail(team, req, {
        subject: 'subject',
        body: 'body',
      }),
    });
  }
  async function trigger(index) {
    if (promises.length === index) return;
    const { teamId, promise } = promises[index];
    const re = await promise;
    console.log(re);
    // ei teamId diye search kore, new kisu data insert korte hobe
    // such as, teamPaymentMailSend = true
    // teamPaymentMailSendTime = new Date(Date.now())
    // save in db
    // model eo update korte hobe...
    setTimeout(() => trigger(index + 1), 5000);
  }
  trigger(0);
  return res.json({ success: true });
});

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
