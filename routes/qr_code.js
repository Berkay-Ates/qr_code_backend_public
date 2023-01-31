const express = require("express");
const router = express.Router();
const { saveQRCode, getAllQRCode } = require("../controller/qr_code")

router.post("/saveQRCode", saveQRCode);
router.get("/getAllQRCode", getAllQRCode);

module.exports = router
