const mongoose = require('../config/db')
const { Schema } = mongoose

//Estructura de la colección de usuarios
const usuarioSchema = new Schema({
    nombre:{
        type:String
    },
    apellidos:{
        type:String
    },
    usuario:{
        type:String,
        unique:true
    },
    correo:{
        type:String
    },
    clave:{
        type:String
    }
})

//Correspondencia en la base de datos
const Usuario = mongoose.model('Usuario', usuarioSchema)

module.exports=Usuario;