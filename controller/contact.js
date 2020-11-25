const { contactValidation } = require('../validations/contact');
const ContactModel = require('../models/contact');

exports.receiveMessage = async (req, res, next) => {
  try {
    const { error } = contactValidation(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const contact = new ContactModel(req.body);
    await contact.save();

    return res.status(201).json({ success: true });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};
