const { contactValidation } = require('../validations/contact');

exports.receiveMessage = async (req, res, next) => {
  const { name, email, message } = req.body;
  console.log(req.body);

  const { error } = contactValidation(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }
  const receiver = 'safwan.du16@gmail.com';
  const subject = 'Contact Us -ICPC Dhaka Regionals 2021';
  // sendClusterMail(receiver, subject, message)
  return res.status(200).json({ success: true });
};
