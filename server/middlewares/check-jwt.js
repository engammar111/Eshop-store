const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = function (req, res, next) {
  let token = req.headers['authorization'];

  if (token) {
    jwt.verify(token, config.secret, function (err, decode) {
      if (err) {
        res.json({
          success: false,
          message: 'Failed to authenticate token',
        });
      } else {
        req.decode = decode;
        next();
      }
    });
  } else {
    res.status(403).json({
      success: false,
      message: 'No token provided',
    });
  }
};
