const mongoose = require("mongoose");

const connection = async() => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/my_socialmedia");
        //el parametro del metodo connection lo sacamos de mongodb. es la url que nos brinda para generar una coneccion
        //al final le agregamos un "/" (slash) y el nombre de nuestra base de datos en este caso "my_socialmedia" (la estamos creando sobre la marcha)
        console.log("Conecatado a mi_socialmedia");
    } catch (error) {
        console.log(error);
        throw new Error("Connection to database failed");
    }
}

module.exports = {
    connection
}