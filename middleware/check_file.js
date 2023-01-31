const { BadRequest } = require("../errors")

const checkFileMiddleware = (req, res, next) => {
    const file = req.files;
    console.log(req.files);

    // if (!file) {
    //     throw new BadRequest("please provide an image file");
    // }
    next();
}

module.exports = { checkFileMiddleware }