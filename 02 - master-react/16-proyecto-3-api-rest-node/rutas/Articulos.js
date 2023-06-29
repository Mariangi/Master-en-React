const express = require("express");
const multer = require("multer"); // esto es para poder guardar imagenes

const router = express.Router();

const ArticuloControlador = require("../controladores/Articulo");


// esto es para poder guardar imagenes
const almacenamiento = multer.diskStorage({
    //cb nos va apermitis decidir donde se subiran nuestros archivos
    destination: function(req, file, cb){
        // el primer parametro siempre es null y el segundo el destino
        cb(null, './imagenes/articulos');
    },

    filename: function(req, file, cb){
        // despues de null, le estoy indicando como quiero que se llame el archivo
        // en este caso se llamara archivo, luego la fecha y por ultimo el nombre original del archivo
        cb(null, "articulo" + Date.now() + file.originalname);
    }
}) 

const subidas = multer({storage: almacenamiento});


//Rutas de prueba
router.get("/ruta-de-prueba", ArticuloControlador.prueba);
router.get("/curso", ArticuloControlador.curso);


//Ruta util
router.post("/crear", ArticuloControlador.crear);
//si yo le pongo ? un signo de interrogacion, quiere decir que esse parametro es opcional
router.get("/articulos/:ultimos?", ArticuloControlador.listar);
router.get("/articulo/:id", ArticuloControlador.uno);
router.delete("/articulo/:id", ArticuloControlador.borrar);
router.put("/articulo/:id", ArticuloControlador.editar);
// en el medio van los midelware, se ejecutan antes de la funcion, en este caso , subir
router.post("/subir-imagen/:id",[subidas.single("file0")],ArticuloControlador.subir);
router.get("/imagen/:fichero",ArticuloControlador.imagen);
router.get("/buscar/:busqueda",ArticuloControlador.buscador);


module.exports = router;