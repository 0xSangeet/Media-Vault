const multer = require("multer");
const fs = require("fs");
const path = require("path");
const Logs = require("../models/logs");
const File = require("../models/file");
const mime = require("mime-types");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const userDir = path.join('./public/uploads', req.user._id);
        fs.mkdirSync(userDir, { recursive: true });
        cb(null, userDir)
    },
    filename: function (req, file, cb) {
        const uniquePrefix = Date.now();
        cb(null, uniquePrefix + '-' + file.originalname)
    }
})

const upload = multer({ storage: storage })


async function handleCreateNewVideo(req, res) {
    const video = await File.create({
        title: req.body.title,
        description: req.body.description,
        path: `uploads/${req.user._id}/${req.file.filename}`,
        createdBy: req.user._id,
    })
    await Logs.create({
        title: req.body.title,
        action: "upload",
        link: `/user/${req.params.username}/${video._id}`,
        createdBy: req.params.username,
        timestamp: Date.now(),
    })
    return res.json({
        message: "Upload successful",
        id: video._id,
    })
}

async function sendChunks(req, res) {
    try {
        const videoId = req.params.videoId;
        const video = await File.findById(videoId);

        const byteRange = req.headers['range'];
        let start = 0;
        let end = undefined;
        const fileSizeInBytes = fs.statSync(path.resolve(__dirname, `../public/${video.path}`)).size;
        const buffer = 10 ** 6;


        const info = mime.lookup(path.resolve(__dirname, `../public/${video.path}`));

        if (byteRange) {
            const range = byteRange.split('=')[1];
            const startStr = range.split('-')[0];
            start = parseInt(startStr);
            end = (start + buffer >= fileSizeInBytes) ? fileSizeInBytes - 1 : start + buffer;
        }
        const readStream = fs.createReadStream(path.resolve(__dirname, `../public/${video.path}`), { start, end });

        res.writeHead(206, {
            "Content-Range": `bytes ${start}-${end}/${fileSizeInBytes}`,
            "Accept-Ranges": "bytes",
            "Content-Length": end - start + 1,
            "Content-Type": `video/${info.split("/")[1]}`
        });

        readStream.pipe(res);
    } catch (err) {
        console.log("couldnt read file");
    }
}

async function renderVideoPage(req, res) {
    try {
        const video = await File.findById(req.params.videoId);
        await Logs.create({
            title: video.title,
            action: "stream",
            link: `/user/${req.params.username}/${req.params.videoId}`,
            createdBy: req.params.username,
            timestamp: Date.now(),
        })

        return res.render("video", {
            user: req.user,
            videoId: req.params.videoId
        })
    } catch (err) {
        return res.redirect("/");
    }
}

async function handleDeleteVideo(req, res) {
    try {
        if ((req.user.username === req.params.username) || req.user.role === "admin") {
            const video = await File.findOneAndDelete({ _id: req.params.videoId }).populate("createdBy");
            fs.unlink(path.resolve(`public/${video.path}`), (err) => {
                if (err) return res.end("Failed to delete video");
                return res.send("Video deleted");
            });
        } else {
            return res.end("Unauthorized");
        }
    } catch(err) {
        console.log("error while deleting video");
    }
}

module.exports = {
    upload,
    handleCreateNewVideo,
    renderVideoPage,
    sendChunks,
    handleDeleteVideo
}