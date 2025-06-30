const { Router } = require("express");
const isUploader = require("../middlewares/uploaderChecker");
const { upload, handleCreateNewVideo, renderVideoPage, sendChunks, handleDeleteVideo } = require("../controllers/userController");

const router = Router();

router.post("/:username/upload", upload.single("video"), handleCreateNewVideo)

router.get("/:username/:videoId", isUploader(), renderVideoPage)
router.get("/:videoId", sendChunks)

router.get("/video/:videoId", handleDeleteVideo)

module.exports = router;