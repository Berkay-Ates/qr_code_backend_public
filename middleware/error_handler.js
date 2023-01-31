const { StatusCodes } = require("http-status-codes")

const errorHandlerMiddleware = (err, req, res, next) => {
    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || "Something went wrong please try again later"
    }

    if (err.name == "Validation Error") {
        customError.msg = Object.values(err.errors).map((item) => { item.message }).join(', ');
    }

    if (err.code === 11000) {
        customError.msg = 'Duplicate error please choose another email';
        customError.statusCode = 400;
    }

    if (err.name === 'CastError') {
        customError.msg = `There is no object with this id ${err.value}`;
        customError.statusCode = StatusCodes.NOT_FOUND;
    }
    return res.status(customError.statusCode).json({ msg: customError.msg });
}

module.exports = errorHandlerMiddleware;