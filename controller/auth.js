const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { registerValidation } = require('../validations/team.js');
const { updatePasswordValidation } = require('../validations/profile.js');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs').promises;
const path = require('path');
const Team = require('../models/team');
const Payment = require('../models/payment');

const getHostname = require('../utils/getHostname');
const SSLCommerz = require('../services/sslcommerz');

let settings = {
  isSandboxMode: process.env.isSandboxMode === 'false' ? false : true,
  store_id: process.env.SSL_store_id,
  store_passwd: process.env.SSL_store_password,
};

let sslcommerz = new SSLCommerz(settings);

exports.teamPaymentInitiate = async (req, res) => {
  try {
    const payload = require('../data/paymentInit')(req);
    const init = await sslcommerz.init_transaction(payload);
    return res.status(200).json({
      success: true,
      GatewayPageURL: init.GatewayPageURL,
      transactionId: payload.tran_id,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.paymentIpnListener = async (req, res) => {
  let hostname = getHostname(req, 3000);
  const { teamId, teamName, country, institution, coach } = req.query;
  const { val_id } = req.body;
  const info = await sslcommerz.validate_transaction_order(val_id);
  const { status, tran_id, tran_date, amount, currency } = info;
  if (status === 'INVALID_TRANSACTION ') {
    return res.send('<h1>INVALID TRANSACTION</h1>');
  }
  const payment = new Payment({
    team: teamName
  });
  await payment.save();
  return res.send(
    `<script>window.location="${hostname}/payment/${teamId}?Team=${teamName}&Country=${country}&Institution=${institution}&Coach=${coach}&Success=true"</script>`
  );
};

exports.paymentUnseccessful = async (req, res) => {
  let hostname = getHostname(req, 3000);
  return res.send(
    `<script>window.location="${hostname}/payment/failed"</script>`
  );
};

exports.paymentFailed = async (req, res) => {
  let hostname = getHostname(req, 3000);
  return res.send(
    `<script>window.location="${hostname}/payment/cancel"</script>`
  );
};

exports.registerInfo = async (req, res) => {
  try {
    req.body.team = req.body.team.toLowerCase().trim();
    req.body.password = req.body.password.toLowerCase().trim();
    req.body.confirmPassword = req.body.confirmPassword.toLowerCase().trim();

    const RB = req.body;

    // Validate Request Body
    const { error } = registerValidation(RB);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }

    // Checking the password
    if (RB.password !== RB.confirmPassword) {
      return res.status(400).json({
        message: 'Password is not matching!',
      });
    }
    delete RB.confirmPassword;

    // Hashing the password
    RB.password = await bcrypt.hash(RB.password, 10);

    // Checking the Team name
    const alreadyTaken = await Team.findOne({ team: RB.team });
    if (alreadyTaken) {
      return res.status(400).json({
        message: 'Team name has already been taken !!',
      });
    }

    // Saving locally.. Waiting for display pictures
    const SECRET_KEY = uuidv4();
    await fs.writeFile(
      path.join(__dirname, `../uploads/${SECRET_KEY}.json`),
      JSON.stringify(RB)
    );
    return res.status(201).json({ success: true, SECRET_KEY });
  } catch (err) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.registerUpload = async (req, res) => {
  try {
    // Getting the local data from SECRET_KEY
    const { SECRET_KEY } = req.body;
    let data = await fs.readFile(
      path.join(__dirname, `../uploads/${SECRET_KEY}.json`),
      'utf-8'
    );
    data = JSON.parse(data);

    // Getting the images
    data.coach.dp = req.files.coachDp[0].filename;
    data.participants[0].dp = req.files.p1Dp[0].filename;
    data.participants[1].dp = req.files.p2Dp[0].filename;
    data.participants[2].dp = req.files.p3Dp[0].filename;

    await fs.writeFile(
      path.join(__dirname, `../uploads/${SECRET_KEY}.json`),
      JSON.stringify(data)
    );

    return res.status(201).json({ success: true, SECRET_KEY });
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.paymentInitiate = async (req, res) => {
  try {
    const SECRET_KEY = req.query.key;
    const payload = require('../data/paymentInit');
    const init = await sslcommerz.init_transaction(payload);

    let data = await fs.readFile(
      path.join(__dirname, `../uploads/${SECRET_KEY}.json`),
      'utf-8'
    );
    data = JSON.parse(data);
    data.transactionId = payload.tran_id;
    data.transactionSuccess = false;
    // Saving to Database
    const team = new Team(data);
    await team.save();

    // Deleting the Local data
    await fs.unlink(path.join(__dirname, `../uploads/${SECRET_KEY}.json`));

    return res.status(200).json({
      success: true,
      GatewayPageURL: init.GatewayPageURL,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.teamLogin = async (req, res) => {
  let { team, password } = req.body;

  team = team.toLowerCase().trim();
  password = password.toLowerCase().trim();

  const teamDetails = await Team.findOne({ team });

  if (teamDetails) {
    const isMatched = await bcrypt.compare(password, teamDetails.password);
    if (isMatched) {
      const accessToken = await jwt.sign(
        { id: teamDetails._id },
        process.env.JWT_SECRET,
        {
          expiresIn: '420h',
        }
      );

      return res.status(200).json({
        success: true,
        accessToken,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: 'Incorrect password',
      });
    }
  } else {
    return res.status(401).json({
      success: false,
      message: 'Team not found',
    });
  }
};

exports.teamInformation = async (req, res) => {
  return res.status(200).json({ success: true, team: req.team });
};

exports.updatePassword = async (req, res) => {
  try {
    const RB = req.body;

    // Validate Request Body
    const { error } = updatePasswordValidation(RB);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }

    // Checking the password
    if (RB.newPassword !== RB.confirmPassword) {
      return res.status(400).json({
        message: 'Password is not matching!',
      });
    }

    const team = await Team.findById(req.team._id);
    const isMatched = await bcrypt.compare(RB.previousPassword, team.password);
    if (isMatched) {
      // Hashing the password
      team.password = await bcrypt.hash(RB.newPassword, 10);
      await team.save();
      return res.status(200).json({
        success: true,
        team,
      });
    }
    return res.status(401).json({
      success: false,
      message: 'Incorrect previous password',
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
