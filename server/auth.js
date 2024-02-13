const jwt = require('jsonwebtoken');

module.exports = {
  authenticate: function (req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1]; // Bearer Token
    if (!token) return res.status(401).send('Access denied. No token provided.');

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.korisnik = decoded;
      next();
    } catch (ex) {
      res.status(400).send('Invalid token.');
    }
  },

  isAdmin: function (req, res, next) {
    if (req.korisnik && req.korisnik.uloga === 'admin') {
      next();
    } else {
      res.status(403).send('Access denied. Requires admin role.');
    }
  }
};