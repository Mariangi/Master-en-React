const mongoose = require("mongoose");


const conexion = async() => {

    try{

        await mongoose.connect("mongodb://0.0.0.0:27017/mi_blog");

        // await mongoose.connect("mongodb://localhost:27017/mi_blog"); de esta manera no fuciona, no se porque
        

        // Parametros dentro de un objeto solo en caso de aviso
        //useNewUrlParser: true
        //useUnifiedTopology: true
        //useCreateIndex: true

        console.log("Conectado correctamente a la base de datos mi blog");

    }catch(error){
        console.log(error);
        throw new Error("NO se ha podido conectar al a base de datos");
    }
}

module.exports = {
    conexion
}