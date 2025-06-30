function isUploader() {
    return (req, res, next) => {
        if(req.user) {
            if((req.user.username === req.params.username) || req.user.role === "admin") return next();
        }
        return res.status(403).send("Forbidden");
    }
}

module.exports = isUploader;