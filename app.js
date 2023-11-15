const express = require('express')
const routeUser = require('./src/routes/usuario.routes')
const app = express()
const port = process.env.PORT||3000;

app.use(express.json());

app.use('/socios/v1/users',routeUser);

app.listen(port,()=>{
    console.log("Servidor corriendo en el puerto: ",port);
})