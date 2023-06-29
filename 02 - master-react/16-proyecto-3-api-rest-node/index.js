const { conexion } = require("./basedatos/conexion");
const express = require("express");
const cors = require("cors");

//Inicializar
console.log("Holis :D");

//Conectar a la base de datos
conexion();


//Crear servidor de node
const app = express();
const puerto = 3900;

//Configurar cors
app.use(cors());

//Convertir body a un objeto javascript para no tener que parsearlo en el futuro
app.use(express.json()); // recivir datos con content-type app/json
app.use(express.urlencoded({extended:true})); // decodifica los datos que me llegan, entonces despues los puedo parsear. usa form-urlencode

//Rutas
const rutas_articulo = require("./rutas/Articulos");

//cargo las rutas
app.use("/api", rutas_articulo);


// Rutas de prueba harcodeadas
app.get("/", (req, res) => {
    return res.status(200).send(`
    <h1>Empezando a crear una api rest con node</h1>
    `);
});


//Crear servidor y escuchar peticiones HTTP
app.listen(puerto, () =>{
    console.log("Servidor corriendo en el puerto "+ puerto);
});