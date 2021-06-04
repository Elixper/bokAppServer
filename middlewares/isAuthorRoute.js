module.exports = function isAuthorRoute(req, res, next) {
    if (req.session.currentUser && req.session.currentUser.role === true)
      next();
    else res.redirect("/my-account");
  };
  