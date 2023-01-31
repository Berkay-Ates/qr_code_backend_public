const { StatusCodes } = require("http-status-codes")
const CustomApiError = require("./custom_api_error")

class Unauthenticated extends CustomApiError {
    constructor(message) {
        super(message)
        this.statusCode = StatusCodes.UnauthenticatedError;
    }
}

module.exports = Unauthenticated