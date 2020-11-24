const fs = require('fs')
const path = require('path')
const { validateContactUs } = require('../validations/contact')
const { sendClusterMail } = require('../config/sendMail')

exports.getNavbar = async (req, res) => {
  const navbar = JSON.parse(fs.readFileSync(path.resolve('data', 'navbar.json'), 'utf8'))
  res.json({
    status: true,
    msg: 'Navbar data fetched',
    data: navbar
  })
}

exports.contactUs = async (req, res) => {
  const {
    name,
    email,
    message
  } = req.body
  console.log(req.body)
  const {error} = validateContactUs(req.body)
  if (error) {
    res.json({
      status: false,
      msg: error.details[0].message
    })
  } else {
    const receiver = 'safwan.du16@gmail.com'
    const subject = 'ICPC Dhaka Regionals 2021 - Contact Us'
    // sendClusterMail(receiver, subject, message)
    return res.status(200).json({
      status: true,
      msg: 'Your message has been received. Thanks for the concern!'
    })
  }
}