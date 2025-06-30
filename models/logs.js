const mongoose = require("mongoose");

const logSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        action: {
            type: String,
            enum: ["upload", "stream"],
            required: true,
        },
        link: {
            type: String,
            required: true,
        },
        createdBy: {
            type: String,
            required: true,
        },
        timestamp: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true,
    }
)

const Logs = mongoose.model("logs", logSchema);

module.exports = Logs;