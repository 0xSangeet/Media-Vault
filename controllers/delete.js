const File = require("../models/file");
const fs = require("fs");
const path = require("path");

async function handleDeleteVideo(req, res) {
    try {
        const video = await File.findOne({ _id: req.params.videoId }).populate("createdBy");

        if (!video) return res.status(404).send("Video not found");

        if ((req.user.username === video.createdBy.username) || (req.user.role === "admin")) {
            fs.unlink(path.resolve(`public/${video.path}`), async (err) => {
                if (err) return res.status(500).send("Failed to delete video");

                await video.deleteOne();
                return res.send("Video deleted");
            });
        } else {
            return res.status(403).send("Unauthorized");
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send("Internal server error");
    }
}

module.exports = handleDeleteVideo;