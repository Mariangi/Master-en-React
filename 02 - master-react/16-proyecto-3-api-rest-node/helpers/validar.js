const validator = require("validator");

const validarArticulo = (parametros) => {
    try {
        let validar_titulo = !validator.isEmpty(parametros.titulo) && validator.isLength(parametros.titulo, {min: 2, max: undefined});
        let validar_contenido = !validator.isEmpty(parametros.contenido);

        if(!validar_titulo || ! validar_contenido){
            throw new Error("No se ha podido validar la informacion");
        }
        
    } catch (error){
        console.log(error);
        return res.status(400).json({
            status: "error",
            mensaje: "Faltan datos por enviar"
        });
        
    }

}

module.exports = {
    validarArticulo
}