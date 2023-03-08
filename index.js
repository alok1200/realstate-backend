const express = require('express')
const connectToMongo = require("./db.js")
const User = require('./models/User.js')
const cors = require('cors')
const Property = require('./models/Property.js')
const e = require('express')
const { default: mongoose } = require('mongoose')
const app = express()
app.use(express.json())
app.use(cors())
connectToMongo()

app.get("/",(req, res) => {
  res.status(200).json("hello world")

})

// app.get("/temp",async (req, res) => {
//   try {
//     console.log("hemloo")
//     const ress = await Property.updateMany({}, {$set: {"address.cord.latitude": 19.234324, "address.cord.longitude" : 72.854659 }})
//     res.json(ress)
//   } catch (error) {
//     console.log(error)
//   }
// })

app.use("/auth", require('./routes/auth.js'))
app.use('/property', require("./routes/Property.js"))

app.listen(4000, () => {
              console.log("surver is running on port 4000")
})