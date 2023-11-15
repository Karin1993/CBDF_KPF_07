const bcrypt = require('bcryptjs')
const Usuario = require('../models/usuario.model')

exports.getAllUser = async(req,res)=>{
    try {
        const Usuarios = await Usuario.find()
        res.status(200).json({
            estado: 1,
            mensaje:"Usuarios encontrados",
            Usuarios : Usuarios
        })
    }catch(error){
        console.log(error)
        res.status(500).json({
            estado:0,
            mensaje: "Ocurrio un error desconocido"
            })
    }
}

exports.getAllUserByEmail = async(req,res)=>{
    try {
          const {correo} = req.params;
          const usuario = await Usuario.findOne({correo:correo}).exec();
            if(usuario){
                res.status(200).json({
                    estado:1,
                    mensaje:"Usuario encontrado",
                    usuario:usuario
                })
            }else{
                res.status(400).json({
                    estado:0,
                    mensaje:"Usuario no encontrado"
                })
            }
    }catch(error){
        res.status(500).json({
            estado:0,
            mensaje:"Ocurrió un error desconocido"
        })
        console.log(error);
    }
}

exports.addUser = async(req,res)=>{
    try {
          const{nombre, apellidos, usuario, correo, clave} = req.body;
          if(nombre== undefined || apellidos == undefined || usuario == undefined
            || correo == undefined || clave == undefined){
                res.status(400).json({
                    estado:0,
                    mensaje:"Faltan parametros"
                })
            }else{
                //Verificar si el usuario y/o correo ya existe
                const usuarioEncontrado = await Usuario.findOne({ $or: [{correo:correo},
                         {usuario:usuario}]}).exec();
                if(usuarioEncontrado){
                    res.status(200).json({
                        estado:0,
                        mensaje:"Usuario y/o correo ya existen"
                    })
                }else{
                //Encriptar la clave
                const salt = await bcrypt.genSalt(8);
                claveEncriptada = await bcrypt.hash(clave,salt);
                const nuevoUsuario = await Usuario.create({nombre, apellidos, usuario,
                    correo, clave})
                if(nuevoUsuario){
                    res.status(200).json({
                        estado:1,
                        mensaje:"Usuario creado con exito",
                        usuario:nuevoUsuario
                    })
                }else{
                    res.status(500).json({
                        estado:0,
                        mensaje:"Ocurrió un error desconocido"
                    })
                }
                } 
            }
    }catch(error){
        res.status(500).json({
            estado:0,
            mensaje:"Ocurrió un error desconocido"
        })
        console.log(error);
    }
}

exports.updateUser = async(req,res)=>{
    try {
        //Que datos actualizamos
        const {correo} = req.params;
        const {nombre, apellidos, clave} = req.body;
        if(nombre == undefined || apellidos == undefined
            || clave == undefined)
            {
                res.status(400).json({
                    estado:0,
                    mensaje:"Faltan parámetros"
                })
            }else{
                //Se requiere encriptar la nueva clave
                const salt = await bcrypt.genSalt(8);
                claveEncriptada = await bcrypt.hash(clave,salt);
                await Usuario.findOneAndUpdate({correo:correo},{nombre:nombre, 
                    apellidos:apellidos, clave:claveEncriptada})
                res.status(200).json({
                    estado:1,
                    mensaje:"El registro se actualizó correctamente"
                })
            }
    }catch(error){
        console.log(error);
        res.status(500).json({
            estado:0,
            mensaje:"Ocurrió un error desconocido"
        })
    }
}

exports.deleteUser = async(req,res)=>{
    try {
          const {correo} = req.params;
          const usuario = await Usuario.findOne({correo}).exec();
          if(usuario){
            await Usuario.deleteOne(usuario)
            res.status(200).json({
                estado:1,
                mensaje:"Usuario eliminado"
            })
          }else{
            res.status(500).json({
                estado:0,
                mensaje:"Usuario no encontrado"
            })
          }
    }catch(error){
        console.log(error);
        res.status(500).json({
            estado:0,
            mensaje:"Ocurrio un error desconocido"
        })
    }
}