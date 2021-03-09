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
const { sendTeamEmail } = require('./config/sendMail')
const Team = require('./models/team');
app.post('/email', async (req, res) => {
  const { data } = req.body
  const { teams, teamName, subject, body } = data

  if (teams == 'Single team') {
    const team = await Team.findOne({ Team_Name: teamName })
    await sendTeamEmail(team, req, { subject, body })
    res.status(200).json({ success: true, msg: 'Emails sent successfully' })

} else if (teams == 'Unpaid teams') {
  const unpaidTeams = await Team.find({ payment_status: 'Not Paid Yet' })
  const promises = []

  for (let team of unpaidTeams) {
    const promise = new Promise((resolve, reject) => {
      sendTeamEmail(team, req, {subject, body})
      resolve(true)
    })
    promises.push(promise)
  }
  
  Promise.all(promises).then(data => res.status(200).json({ success: true, msg: 'Emails sent successfully' })).catch(data => res.status(200).json({ success: false, msg: 'Error sending emails' }))

} else if (teams == 'Paid teams') {
  // const paidTeams = await Team.find({ payment_status: 'Paid' })
  const promises = []
  const paidTeams = new Array(50).fill('team')
  console.log(paidTeams)
  let t = 0
  for (let team of paidTeams) {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        sendTeamEmail(team, req, {subject, body}).then(data => {
          resolve(true)
        }).catch(e => {
          reject(e)
        })
        console.log(t)
      }, t*30);
      t++
    })
    promises.push(promise)
  }
  
  Promise.all(promises).then(data => res.status(200).json({ success: true, msg: 'Emails sent successfully' })).catch(data => res.status(200).json({ success: false, msg: 'Error sending emails' }))

} else {
  let allTeams = await Team.find()

  const promises = []

  for (let team of allTeams) {
    const promise = new Promise((resolve, reject) => {
      sendTeamEmail(team, req, {subject, body})
      resolve(true)
    })
    promises.push(promise)
  }
  
  Promise.all(promises).then(data => res.status(200).json({ success: true, msg: 'Emails sent successfully' })).catch(data => res.status(200).json({ success: false, msg: 'Error sending emails' }))

}
})

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
