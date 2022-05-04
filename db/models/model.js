require('dotenv').config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    gender:{
        type: String,
        // required: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
        required: true
    },
    notes: [
        {
            title: {
                type: String,
            },
            note: {
                type: String,
            },
            lastEdit: {
                type: Date,
                required: true,
                default: new Date
            },
            createdAt: {
                type: Date,
                required: true,
                default: new Date
            }
        }
    ],
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
})

userSchema.methods.generateAuthToken = async function () {
    try {
        const token = jwt.sign({ _id: this._id.toString() }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token });
        await this.save();
        return token;
    } catch (err) {
        console.log(err);
    }
}
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
        this.confirmPassword = await bcrypt.hash(this.password, 10);
        next();
    }
})
const userModel = new mongoose.model("userModel", userSchema);

module.exports = userModel;