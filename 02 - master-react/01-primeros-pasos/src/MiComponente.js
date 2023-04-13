// Importar modulos de react / dependencias
import React from "react";

// Funcion del componente
const MiComponente = () =>{
    let usuario = {
        nombre: "Maria",
        edad: 20
    }
    console.log(usuario);

    return ( <>
            <h2>Componente creado</h2>
            <h2>Datos del usuario</h2>
            <ul>
                <li>nombre: {usuario.nombre}</li>
                <li>edad: {usuario.edad}</li>
            </ul>

            <p>Este es mi primer componente</p>
            <ul>
                <li>vue</li>
                <li>angular</li>
            </ul>
        </>);
       
}

// Export
export default MiComponente;