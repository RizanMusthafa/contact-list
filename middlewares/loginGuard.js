const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  const token = req.header('x-auth-token');
  try {
    if (!token) throw new Error('No token provided');
    const user = jwt.verify(token, 'jwtkey');
    if (!user) throw new Error('Invalid token');
    req.body.user = user;
    next();
  } catch (ex) {
    res.status(403).send({ error: ex.message });
  }
};
