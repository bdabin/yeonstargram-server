module.exports = function (req, res, next) {
  if (!req.isAuthenticated()) {
    console.log('xxxx');

  } else {
    return next();
  }
};