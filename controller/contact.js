const { contactValidation } = require('../validations/contact');
const ContactModel = require('../models/contact');
const excelToJson = require('convert-excel-to-json')
const path = require('path')
const { sendEmail } = require('../config/sendMail')

exports.receiveMessage = async (req, res, next) => {
  categoryAddress = new Map()
  categoryAddress['Registration Fee Related'] = 'reg.icpc@cse.du.ac.bd'
  categoryAddress['Contest Related'] = 'icpc@cse.du.ac.bd'
  categoryAddress['Others'] = 'office@cse.du.ac.bd'
  try {
    const { error } = contactValidation(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }
  const { name, email, category, message } = req.body
  const query_id = await sendEmail(categoryAddress[category], req.body)
    return res.status(201).json({ success: true, query_id });
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

exports.getFAQ = async (req, res) => {
  try {
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
  } catch (error) {
    res.json({
      success: false
    })
  }
}
