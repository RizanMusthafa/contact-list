module.exports = function(req, res, next) {
  try {
    if (!req.body.user.isAdmin) throw new Error('You have no permission');
    next();
  } catch (ex) {
    res.status(403).send({ error: 'Access Denied: ' + ex.message });
  }
};
