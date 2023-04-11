import React from 'react'

const ComponenteDos = () => {
    let libros = ["harry potter", "Juego de tronos", "las cronicas de Narnia"];
    // let libros = [];

    console.log(libros);

    return (
        <div>
        <h1>Listado de libros</h1>
        <ul>
            <li>{libros[0]}</li>
            <li>{libros[1]}</li>
            <li>{libros[2]}</li>
            
        </ul>
    </div>
    );
}

export default ComponenteDos;