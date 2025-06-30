const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        path: {
            type: String,
            required: true,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
        },
    },
    {
        timestamps: true,
    }
)

const File = mongoose.model("files", fileSchema);

module.exports = File;