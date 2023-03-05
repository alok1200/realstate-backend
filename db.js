const mongoose = require("mongoose");
const MongoURI = "mongodb+srv://alok:alok1234@cluster0.4ps2204.mongodb.net/?retryWrites=true&w=majority";
mongoose.set("strictQuery", false);
const connectToMongo = () => {
  mongoose
    .connect(MongoURI, {autoIndex: true})
    .then(() => {
      console.log("mongodb connected");
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = connectToMongo;
