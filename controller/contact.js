const { contactValidation } = require('../validations/contact');
const ContactModel = require('../models/contact');
const excelToJson = require('convert-excel-to-json')
const path = require('path')

exports.receiveMessage = async (req, res, next) => {
  categoryAddress = new Map()
  categoryAddress['Registration Fee Related'] = 'safwan.du16@gmail.com'
  categoryAddress['Contest Related'] = 'ifsan75@gmail.com'
  categoryAddress['Others'] = 'delowarfivdb@gmail.com'
  try {
    const { error } = contactValidation(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const contact = new ContactModel(req.body);
    const emailAddress = categoryAddress[req.body.category]
    console.log(emailAddress)
    // await contact.save();

    return res.status(201).json({ success: true });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

exports.getFAQ = async (req, res) => {
  const result = excelToJson({
    sourceFile: path.join(__dirname, '..', 'uploads', 'faq.xls'),
    header: {
      rows: 1
    },
    columnToKey: {
     'A': 'id',
     'B': 'title',
     'C': 'description'
  }
  }).allTeamsTable
  res.json({
    success: true,
    data: result
  })
}
