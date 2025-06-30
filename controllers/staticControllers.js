const User = require("../models/user");
const File = require("../models/file");
const { createHmac, randomBytes } = require('node:crypto');
const { generateToken, validateToken } = require("../utils/auth")

async function renderHomepage(req, res) {
    try {
        const videos = await File.find({ createdBy:req.user._id })
        return res.render("home", {
            user: req.user,
            videos: videos
        });
    } catch(err) {
        return res.render("home")
    }
    
}

function renderSignUpPage(req, res) {
    try {
        return res.render("signup", {
            user: req.user
        });
    } catch (error) {
        return res.redirect("/");
    }
    
}

function renderSignInPage(req, res) {
    try {
        return res.render("signin", {
            user: req.user
        });
    } catch (err) {
        return res.redirect("/");
    }
}

async function handleUserSignUp(req, res) {
    try {
        const { username, password } = req.body || {};
        if (!username || !password) return res.json({ message: "One or more fields missing" });

        const salt = randomBytes(16).toString('hex');
        const hashedPassword = createHmac('sha256', salt)
            .update(password)
            .digest("hex");
        const user = await User.create({
            username,
            password: hashedPassword,
            salt
        })

        return res.redirect("/");

    } catch (err) {
        console.log("Signup error:", err);
        return res.status(500).json({ message: "Internal server error" });
    }

}

async function handleUserSignIn(req, res) {
    try {
        const { username, password } = req.body || {};
        if (!username || !password) return res.json({ message: "One or more fields missing" });

        const user = await User.findOne({username});
        
        if(!user) return res.redirect("/signin");

        const passwordToMatch = createHmac('sha256', user.salt)
            .update(password)
            .digest("hex");

        if(passwordToMatch === user.password) {
            const userObj = user.toObject();
            const token = generateToken(userObj);
            res.cookie("token", token).redirect("/");
        }
        
    } catch (err) {
        console.log(`error: ${err}`);
        return res.json({ message: "Signin error" })
    }
}

function renderUploadPage(req, res) {
    try {
        return res.render("upload", {
            user: req.user
        });
    } catch (err) {
        return res.redirect("/");
    }
}

function handleUserLogout(req, res) {
    try {
        res.clearCookie("token");
        return res.redirect("/signin");
    } catch (error) {
        return res.redirect("/");
    }

}

module.exports = {
    renderHomepage,
    renderSignUpPage,
    renderSignInPage,
    handleUserSignUp,
    handleUserSignIn,
    renderUploadPage,
    handleUserLogout
}