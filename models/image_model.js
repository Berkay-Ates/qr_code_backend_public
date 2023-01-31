const mongoose = require("mongoose")

const ImageScheme = new mongoose.Schema({
    qrType: {
        type: String,
        enum: {
            values: ['text', 'contact', 'social', 'url', 'message', 'location', 'email', 'other'],
            message: '{VALUE} is not supported',
        }
    },
    qrData: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    qrImage: {
        type: String,
        required: true
    },
    uploadTime: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("QRCodes", ImageScheme)

