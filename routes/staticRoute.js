const { Router } = require("express");
const { renderHomepage, renderSignUpPage, renderSignInPage, handleUserSignUp, handleUserSignIn, renderUploadPage, handleUserLogout } = require("../controllers/staticControllers")

const router = Router();

router.get("/", renderHomepage);

router.get("/signup", renderSignUpPage)
router.get("/signin", renderSignInPage)

router.post("/signup", handleUserSignUp)
router.post("/signin", handleUserSignIn)

router.get("/upload", renderUploadPage)

router.get("/logout", handleUserLogout)

module.exports = router;