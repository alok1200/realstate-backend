const route = require("express").Router()
const {  default: mongoose } = require("mongoose");
const Property = require("../models/Property.js");


route.post("/",async (req, res) => {
  const { limit, cat, search } = req.body.filter;
  let query = Property.find()
  console.log(search);
  if(limit) query.limit(limit)
  if(cat) query = Property.find({category:{ $regex: cat ,$options: "i"} })
  if(search) {
    query = Property.find({$or: [
      {title:{ $regex: search ,$options: "i"}},
      {description:{ $regex: search ,$options: "i"}},
      {category:{ $regex: search ,$options: "i"}},
      {"address.city":{ $regex: search ,$options: "i"}},
      {"address.area":{ $regex: search ,$options: "i"}},
  ]})
  }

    try {
      const properties = await query.exec();
      res.status(200).json(properties)  
    } catch (error) {
      console.log(error)
      res.status(500).json({message: "internal server error"})  
    }
})


route.put("/:id",async (req, res) => {
  const id = req.params.id;
  console.log({id})
  console.log(req.body)
  try {
    const ress = await  Property.findByIdAndUpdate(id, {
      $set: req.body
    },{new: true})
    res.status(200).json(ress)
  } catch (error) {
    console.log(error)
    res.status(500).json({message: "internal server errror"})
  }
})
route.delete("/:id",async (req, res) => {
  const id= req.params.id
  try {
    const ress = await Property.findByIdAndDelete(id)
    console.log(ress)
    res.status(200).json({messgae: "property successfully deleted"})
  }catch (error) {
    console.log(error)
    res.status(200).json({message: "internal server error"})
  }
})
route.post("/:id",async (req, res) => {
  const id= req.params.id
  try{
    const any = property.creat(req.body)
    console.log(any)
    res.status(200).json({message: "property successfully added"})
  } catch (error) {
      console.log(error)
      res.status(500).json({message: "internal server error"})
    
  }
})

route.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    if(!mongoose.isValidObjectId(id)){
      return res.status(403).json({message: "not a valid ID"})
    }
    const propertyRes = await Property.findById(id)
    res.status(200).json(propertyRes) 
  } catch (err) {
    console.log(err)
    res.status(500).json({message: "internal server error"})
  }
})





module.exports = route