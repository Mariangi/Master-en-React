//importar de pendencias
const { connection } = require("./database/connection");
const express = require("express");
const cors = require("cors");

//mensaje de bienvenida
console.log("Api node para red social funcionando");

//conexion a la base de datos
connection();

//crear servidor node
const app = express();
const puerto = 3900;

//Configurar cors
app.use(cors());
//esto de un middleware se ejecuta antes que las rutas

//convertir los datos del body a objetos js
app.use(express.json());
//este middleware nos decodifica los datos del body en caso de llegar con un contentype de app-json , convertirlos a json
app.use(express.urlencoded({extended: true}));
//para decodificarlos en caso de que lleguen a travez de urlencode
//{extended :true} para decodificar de la misma manera todo lo que llegue en formato form-urlencode

//cargar conf rutas
const UserRoutes = require("./routes/user");
const PublicationRoutes = require("./routes/publication");
const FollowRoutes = require("./routes/follow");

app.use("/api/user", UserRoutes);
app.use("/api/publication", PublicationRoutes);
app.use("/api/follow", FollowRoutes);

//ruta de prueba
app.get("/ruta-prueba", (req,res) => {
    return res.status(200).json(
        {
            "id": 1,
            "nombre": "Maria",
            "apellido": "rasmussen"
        }
    )
})


//poner servidor a escuchar peticiones
app.listen(puerto, () => {
    console.log("Servidor de node corriendo en el puerto: " , puerto);
})