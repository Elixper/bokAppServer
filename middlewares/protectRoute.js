module.exports = function protectRoute(req, res, next) {
    if (req.session.currentUser) next();
    else res.status(401).json({message: "Unauthorized"})
}