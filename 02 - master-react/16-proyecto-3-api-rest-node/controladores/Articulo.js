// este formato es de programacion funcional

const Articulo = require("../modelos/Articulo");
const { validarArticulo } = require("../helpers/validar");
const fs = require("fs"); //file sistem, es para borrar archivos
const path = require("path");

const prueba = (req, res) =>{

    return res.status(200).json({
        mensaje: "soy una accion de prueba en mi controlador de articulos"
    });
}

const curso = (req, res) =>{

    console.log("Se ha ejecutado el enpoint probando");
    return res.status(200).json([{
        curso: "master en react",
        autor: "Maria Ras"
    },
    {
        curso: "master en react",
        autor: "Maria Ras"
    }]);
}

const crear = async(req, res) =>{

    try{

        //recoger por parametro por post los datos a guardar
        let parametros =  req.body;
        
        //Validar los datos
        try {
            validarArticulo(parametros);
        } catch (error){
            console.log(error);
            return res.status(400).json({
                status: "error",
                mensaje: "Faltan datos por enviar"
            });
            
        }

        //Crear el objeto
        const articulo = await new Articulo(parametros); // poniendo "parametros" dentro de los parentecis al crear el objeto ya le estoy parando los valores de forma automatica

        //Asignar valores (manual o automatico)
        //articulo.titulo = parametros.titulo; // manera manual

        //Guardar el articulo en la base de datos
        const articuloGuardado = await articulo.save();
        // articulo.save((error, articuloGuardado) => {
        //     if(error || !articuloGuardado){
        //         return res.status(400).json({
        //             status: "error",
        //             mensaje: "No se ha guardado el articulo"
        //         });
        //     }

        if(articuloGuardado){
            //Devolver resultado
            return res.status(200).json({
                status: "success",
                mensaje: "Articulo guardado con exito",
                articulo: articuloGuardado,

            });
        }

  

    }catch(error){
        return res.status(400).json({
            status: "error",
            mensaje: "Algo fallo"
        });
    }
}


const listar = async(req,res) =>{
    try{
      

        // sort oredena los resultados si el criterio fecha esta en -1, eso quiere decir que los ordenara de manera desendente segun su fecha
        let consulta = await Articulo.find();

        if(req.params.ultimos){
            consulta = await Articulo.find().limit(req.params.ultimos).exec();
            //consulta.limit(req.params.ultimos).exec();
        }

        return res.status(200).json({
            status: "success",
            parametro: req.params.ultimos,
            contador: consulta.length,
            articulos: consulta
        });

    }catch(error){
        console.log(error);
        return res.status(400).json({
            status: "error",
            mensaje: "No se ha encontrado articulos"
        });
    }


    //esto es como un get de todo lo que hay en la base. el exec guarda la respuesta del find o un error

    // let consulta = Articulo.find({}).exec((error, articulos) => {
    //     if(error || articulos){
    //         return res.status(400).json({
    //             status: "error",
    //             mensaje: "No se ha encontrado articulos"
    //         });
    //     }

    //     return res.status(200).send({
    //         status: "success",
    //         articulos: articulos
    //     });


}


const uno = async(req,res) =>{

    try {
        //recojer el id por la url
        let id = req.params.id;

        //buscar el articulo
        let articulo_solicitado = await Articulo.findById(id);
        // console.log(articulo_solicitado);

        //si no existe devolver error
        if(articulo_solicitado){
            return res.status(200).json({
                status: "success",
                mensaje: "Articulo solicitado",
                articulo: articulo_solicitado
            });

        }
        //devolver resultado
        return res.status(404).json({
            status: "error",
            mensaje: "No existe un articulo con ese id"
        });
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            status: "error",
            mensaje: "No se ha encontrado el articulo solicitado"
        });
    }

}

const borrar = async(req,res) =>{

    try {

        let articulo_id = req.params.id;

        let articulo_ABorrar = await Articulo.findOneAndDelete({_id: articulo_id});
        
        if(articulo_ABorrar){
            return res.status(200).json({
                status: "success",
                mensaje: "Borrar",
                articulo: articulo_ABorrar
            });
        }

        return res.status(400).json({
            status: "error",
            mensaje: "No se pudo borrar el articulo"
        });

       

    } catch (error){
        console.log(error);
        return res.status(400).json({
            status: "error",
            mensaje: "No se ha podido borrar el articulo"
        });
    }
}



const editar = async(req,res) =>{
    try {

        //Recojer id
        let articuloId = req.params.id;

        //recojer datos del body
        let parametros = req.body;

        //validar datos
        try {
            validarArticulo(parametros);
        } catch (error){
            console.log(error);
            return res.status(400).json({
                status: "error",
                mensaje: "Faltan datos por enviar"
            });
            
        }

        //buscar y actualizar . cuando uso este metodo tambien se guarda en la bd sin que tenga que hacer nada extra
        //el primero es el criterio para encotrar el articulo que se desea editar. el segundo sol los datos nuevos y el tercero indica si quiero que me devuelva el articulo actualizado (true), o el articulo viejo (false)
        let articulo_nuevo = await Articulo.findOneAndUpdate({_id: articuloId}, parametros, {new: true});

        if(articulo_nuevo){
            //devolver respuesta
            return res.status(200).json({
                status: "success",
                mensaje: "Editar",
                articulos: articulo_nuevo
            });
        }

    } catch (error){
        console.log(error);
        return res.status(400).json({
            status: "error",
            mensaje: "No se ha podido editar el articulo"
        });
    }
}


const subir = async(req,res) =>{

    //configuirar multer 
    //el multer guarda la imagen solito

    //recojer el fichero de imagne subido
    if(!req.file && !req.files){
        return res.status(404).json({
            status: "error",
            mensaje: "Peticion invalida"
        });

    }

    //conseguir el nombre de la img
    let archivo = req.file.originalname;

    //extencion de la img
    // el split me divide un string y entre los parentecis le indico donde dividirlo. con el "\." (el slash y el punto) le indico que lo parta donde encuentre un punto. retorna un array
    let archivo_split = archivo.split("\.");

    //el ultimo casillero del array va a contener la extencion del archivo
    let extencion = archivo_split[(archivo_split.length - 1)];

    //comprovar extencion 
    if(extencion != "png" && extencion != "jpg" && 
    extencion != "jpeg" && extencion != "gif"){

        //borrar archivo y dar respuesta
        // try {
            //esto me borra un archivo si le doy el nombre del archivo
            //req.file.path te da el nombre del archivo

            fs.unlink(req.file.path, (error) => {
                console.log(error);
                return res.status(400).json({
                    status: "error",
                    mensaje: "extencion no permitida"
                });
            });
            
        // } catch (error){
        //     console.log(error);
        //     return res.status(400).json({
        //         status: "error",
        //         mensaje: "No se pudo eliminar el archivo con la extencion no permitida"
        //     });
        // }

    }else{
        //actualizar articulo
        let articuloId = req.params.id;

        let articulo_nuevo = await Articulo.findOneAndUpdate({_id: articuloId}, {imagen: req.file.filename}, {new: true});

        if(articulo_nuevo){
            //devolver respuesta
            return res.status(200).json({
                status: "success",
                mensaje: "Imagen agregada",
                articulos: articulo_nuevo
            });
        }

    }

}

const imagen = (req, res) => {
    let fichero = req.params.fichero;
    let ruta_fisica = "./imagenes/articulos/" + fichero;

    //acces me comprueba si tengo acceso a la ruta fisica y compruebo que exista
    fs.stat(ruta_fisica, (error, existe) =>{
        if(existe){
            //esto me permite enviar archivos
            //con path consigo el archivo fisico de la ruta fisica
            //esto te retorna la imagen en crudo
            return res.sendFile(path.resolve(ruta_fisica));

        }else{
            return res.status(404).json({
                status: "error",
                mensaje: "La imagen no existe"
            });
        }
    })
    
}

const buscador = async(req, res) => {
                                                // si algo viene por get lo atrapo con req.params y si viene por post con req.body
                                      
    try {
        //sacar el string de busqueda
        let busqueda = req.params.busqueda;

        //facer un find or 
        let articulosEncontrados = await Articulo.find({ "$or": [
            // options: i, quiere decir si incliye  el string busqueda dentro del titulo
            {"titulo": {"$regex": busqueda, "$options": "i"}}, // lo que esta dentro de {los corchetes} luego de titulo: ,es una exprecion regular 
            {"contenido": {"$regex": busqueda, "$options": "i"}} 
        ]})

        //sort
            .sort({fecha: -1})

        //execuatr consulta
            .exec();

        // dar respuesta
        if(articulosEncontrados.length > 0){
            return res.status(200).json({
                status: "success",
                mensaje: "Busqueda",
                articulos: articulosEncontrados
            });
        }else{
            return res.status(404).json({
                status: "error",
                mensaje: "No se ha encontrado articulos"
            });
        }
        
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            status: "error",
            mensaje: "No se ha encontrado articulos"
        });
        
    }                                            
    
}

module.exports = {
    prueba,
    curso,
    crear,
    listar,
    uno,
    borrar,
    editar, 
    subir,
    imagen,
    buscador
}