//daegumxxw
//Sofaraway1

const{ model } = require("mongoose")

const mongoose = require('mongoose')
const uriRemota = "mongodb+srv://daegumxxw:Sofaraway1@cluster0.g1mqohu.mongodb.net/";

mongoose.connect(uriRemota)

module.exports=mongoose;