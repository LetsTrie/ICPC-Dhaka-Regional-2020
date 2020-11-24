const { admin } = require('../config/adminCredentials')

exports.adminAccess = async (req, res, next) => {
  if (req.user && req.user == admin.id) {
    next()
  } else {
    res.json({
      status: false,
      msg: 'Admin access required to perform the attempted operation'
    })
  }
}