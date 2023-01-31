const { StatusCodes } = require('http-status-codes');
const ImageUpload = require("../models/image_model");


const saveQRCode = async (req, res) => {
    const saveModel = {
        qrType: req.body.qrType,
        qrData: req.body.qrData,
        owner: req.user.email,
        qrImage: req.body.qrImgUrl,
    }

    const result = await ImageUpload.create(saveModel);
    const savedData = result._doc;
    const year = result._doc.uploadTime.getUTCFullYear();
    const month = result._doc.uploadTime.getUTCMonth();
    const day = result._doc.uploadTime.getUTCDate();
    const fullDate = `${day}-${month}-${year}`;
    savedData.uploadTime = fullDate;

    res.status(StatusCodes.OK).json({ savedData });
}

const getAllQRCode = async (req, res) => {
    const results = await ImageUpload.find({ owner: req.user.email }).sort("uploadTime");
    res.status(StatusCodes.OK).json({ user_qr_data: results });
}

module.exports = { saveQRCode, getAllQRCode }
