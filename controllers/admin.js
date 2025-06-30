const Logs = require("../models/logs");
const Files = require("../models/file");

async function renderDashboard(req, res) {

    try {
        const logs = await Logs.find({});
        const videos = await Files.find({}).populate("createdBy", "username");
        return res.render("dashboard", {
            user: req.user,
            logs: logs,
            videos: videos,
        });
    } catch (error) {
        return res.end("Server error");
    }
}

module.exports = renderDashboard;