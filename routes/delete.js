const { Router } = require("express");
const handleDeleteVideo = require("../controllers/delete");

const router = Router();

router.post("/:username/:videoId", handleDeleteVideo);


module.exports = router;