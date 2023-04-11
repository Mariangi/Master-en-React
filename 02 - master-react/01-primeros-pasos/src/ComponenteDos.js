import React from 'react'

const ComponenteDos = () => {
    let libros = ["harry potter", "Juego de tronos", "las cronicas de Narnia"];
    // let libros = [];

    console.log(libros);

    return (
        <div>
        <h1>Listado de libros</h1>

        {/* esto es un if, el signo de pregunta indica que le sigue el resultado de que la condicion sea true */}
        {libros.length >= 1 ?
            // SI hay libros....
            (<ul>
                {libros.map((libro, indice) =>{
                    return <li key={indice}>{libro}</li>
                })}
                
            </ul>)
            :   //esto es un else
            // No hay libros....
            (<p>No hay libros</p>)
        }

        
    </div>
    );
}

export default ComponenteDos;