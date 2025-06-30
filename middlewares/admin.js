function isAdmin()  {
    return (req, res, next) => {
        if(req.user.role === "admin") return next();
        else res.end("Not admin");
    }
}

module.exports = isAdmin;