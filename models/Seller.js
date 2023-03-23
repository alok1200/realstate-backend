const mongoose = require('mongoose')

const SellerSchema = new mongoose.Schema({
    name: {type: String, require: true},
    number: {type: Number, required: true},
    address: {type: String, require: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    isSeller: {type: Boolean, default: false},
},{timestamps: true})

const Seller = mongoose.model("Seller", SellerSchema)

module.exports = Seller;
