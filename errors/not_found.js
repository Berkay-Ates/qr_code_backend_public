const { StatusCodes } = require("http-status-codes")
const CustomApiError = require("./custom_api_error")

class NotFound extends CustomApiError {
    constructor(message) {
        super(message)
        this.statusCode = StatusCodes.NotFound
    }
}

module.exports = NotFound