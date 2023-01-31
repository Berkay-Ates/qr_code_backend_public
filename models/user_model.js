require('dotenv').config();
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
        minlength: 3,
        maxlength: 50,
    },
    email: {
        type: String,
        requireed: [true, 'Please provide a email'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide an valid e mail'
        ],
        unique: true //*it makes email unique for us in the database ;
    },
    password: {
        type: String,
        required: [true, 'Please provide an valid e mail'],
        minlength: 6,
    }
});

UserSchema.pre("save", async function () {
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcryptjs.compare(candidatePassword, this.password);
    return isMatch;
};

UserSchema.methods.createJWT = function () {
    const token = jwt.sign({ userId: this._id, name: this.name, email: this.email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME });
    return token;
}

module.exports = mongoose.model('User', UserSchema);
