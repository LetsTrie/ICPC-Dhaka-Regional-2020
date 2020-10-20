const jwt = require('jsonwebtoken')

exports.auth = async (req, res, next) => {
try {
  const token = req.header('x-auth-token')

  if (!token) {
    res.json({
      status: false,
      msg: 'Please log in to continue'
    })
  }
  
  const verified = jwt.verify(token, process.env.JWT_SECRET)
  if (!verified) {
    res.json({
      status: false,
      msg: 'Please log in to continue'
    })
  } else {
    req.user = verified.id
    next()
  }
} catch (err) {
  res.json({
    status: false,
    msg: err.message
  })
}
}