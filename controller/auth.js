const User = require('../models/user_model')
const { StatusCodes } = require('http-status-codes')
const { BadRequest, Unauthenticated } = require("../errors");

const register = async (req, res) => {
    const user = await User.create({ ...req.body });
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({ ...{ name: user.name, token: token } })
}

const login = async (req, res) => {
    const { email, password } = req.body //* auth middleware'i tarafından set edilmişti zaten 

    if (!email || !password) {
        throw new BadRequest("email and password have to be provided")
    }
    const user = await User.findOne({ email })
    if (!user) {
        throw new Unauthenticated("invalid credantials plase provide exist user info")
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
        throw new Unauthenticated("invalid credentials")
    }

    const token = user.createJWT()
    res.status(StatusCodes.OK).json({ ...{ name: user.name, token: token } })
}

module.exports = {
    register,
    login
}
