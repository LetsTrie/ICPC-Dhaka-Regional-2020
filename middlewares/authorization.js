const jwt = require('jsonwebtoken');
const Team = require('../models/team');

exports.verifyToken = async (req, res, next) => {
  const bearerHeader = req.headers.authorization;
  if (bearerHeader && bearerHeader.startsWith('Bearer')) {
    const accessToken = bearerHeader.split(' ')[1];
    if (!accessToken) {
      return res.status(401).json({
        success: false,
        message: 'UnAuthorized',
      });
    }

    try {
      const decoded = await jwt.verify(accessToken, process.env.JWT_SECRET);
      const team = await Team.findById(decoded.id);
      if (!team) {
        return res.status(401).json({
          success: false,
          message: 'Team not found',
        });
      }
      req.team = team;
      next();
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: 'Token Expired.',
      });
    }
  } else {
    return res.status(401).json({
      success: false,
      message: 'Invalid Token.',
    });
  }
};
