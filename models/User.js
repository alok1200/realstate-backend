const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
         name: {type: String, require: true},
         number: {type: Number, required: false},
         isAdmin: {type: Boolean, default: false},
         password: {type: String, required: true},
         email: {type: String, required: true, unique: true}
})

const User = mongoose.model("User", UserSchema)

module.exports = User;
