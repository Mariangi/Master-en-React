import React, { useEffect, useReducer } from 'react'
import { JuegoReducer } from '../reducers/JuegoReducer';

const init = () => {
    return JSON.parse(localStorage.getItem("juegos")) || [{"hola":"hola"}];
    //esto quiere dercir que la funcion init devuelve parseado el array juegos del localStorage. O (||), si no puede deolver eso, devuelve un array vacio.
}

export const MisJuegos = () => {

    const [juegos, dispatch] = useReducer(JuegoReducer, [{"hola":"hola"}], init);
    //esto es como un useState. en los parametros le paso 1º el reducer, 2º un array bacio porque quiero que cuando comience no haya ningunnjyego guardado, 3º no se

    useEffect( () => {
        localStorage.setItem("juegos", JSON.stringify(juegos));
        // esto setea en el local storage lo que se enguentre en el estado juegos en un arreglo de strings
    },[juegos]);


    const conseguirDatosForm = e => {
        e.preventDefault();
        let juego = {
            id: new Date().getTime(),
            titulo: e.target.titulo.value,
            descripcion: e.target.descripcion.value
        }

    }

  return (
    <div>
        <h1>Estos son mis video juegos</h1>

        <p>Numero de video juegos: 15</p>

        <ul>
            <li>Gta</li>
            <li>Mortal Kombat</li>
            <li>Crash Badicoot</li>
        </ul>

        <h3>Agregar Juego</h3>

        <form onSubmit={conseguirDatosForm}>
            <input type='text' name='titulo' placeholder='Titulo' autoComplete='off' />
            <textarea name='descripcion' placeholder='Descripcion'></textarea>
            <input type='submit' value="Guardar" className='btn'/>
        </form>

    </div>
  )
}
