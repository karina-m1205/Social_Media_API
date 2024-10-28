const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    followers: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "users",
        default: [],
    },
    following: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "users",
        default: [],
    },
    blocks: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "users",
        default: [],
    },
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    };
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("users", userSchema);