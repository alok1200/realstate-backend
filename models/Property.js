const mongoose = require('mongoose')

const PropertySchema = new mongoose.Schema({
    title: {type: String, require: true},
    description:{type: String, require: true},
    price: {type: String, require: true},
    crimeRate: {type: String, require: true},
    population:{type: Number, require: true},
    address: {
      city: {type: String, require: true},
      area: {type: String, require: true},
      cord: {
        latitude: {type: Number, require: false},
        longitude: {type: Number, require: false}
      }
    },
    size: {type: String, require: true},
    category: {type: String, require: true},
    Image: {type: String, require: true},
})

const Property = mongoose.model("Property", PropertySchema)

module.exports = Property;
