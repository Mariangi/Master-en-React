const { Schema,  modelo, model } = require("mongoose");

const ArtuculoSchema = Schema({
    titulo: {
        type: String,
        require: true
    },
    contenido: {
        type: String,
        require: true
    },
    fecha: {
        type: Date,
        default: Date.now
    },
    imagen: {
        type: String,
        default: "default.png"
    }
});

//                 nombre de mi modelo
//                          |  el esquema que va a usar mi modelo 
//                          |             |  la colecion de la db a usar
//                          |             |             |
//                          v             v             v
module.exports = model("Articulo", ArtuculoSchema, "articulos");