import React, { useEffect, useReducer } from 'react';
import { JuegoReducer } from '../reducers/JuegoReducer';

const init = () => {
    return JSON.parse(localStorage.getItem("juegos")) || [];
    //esto quiere dercir que la funcion init devuelve parseado el array juegos del localStorage. O (||), si no puede deolver eso, devuelve un array vacio.
}

export const JuegosMios = () => {

    const [juegos, dispatch] = useReducer(JuegoReducer, [], init);
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

        //aca creo un objeto y le guardo la palabra clave o accion para que entre en el swich y le agrego en payload el item que quiero agregar al estado
        const accion = {
            type: "crear",
            payload: juego
        };

        //aca "envio" ese objeto a el reducer para que entre por el swich t guarde un nuevo juego en el estado de juegos
        dispatch(accion);

    }

    const borramelo = (id) =>{
        const accion ={
            type: "borrar",
            payload: id
        };

        dispatch(accion);
        
    }

    const editar = (e, id) =>{
        let juego = {
            id,
            titulo: e.target.value,
            descripcion: e.target.value
        }

        const accion ={
            type: "editar",
            payload: juego
        };

        dispatch(accion);
    }

  return (
    <div>
        <h1>Estos son mis video juegos</h1>

        <p>Numero de video juegos: {juegos.length}</p>

        <section>
            {juegos.map( juego =>{
                    return(
                        <div className='fila' key={juego.id}>
                        <h4>{juego.titulo}</h4>
                        <div className='btns'>
                            <input  type='text' className=' input-editar' onBlur={ e => {editar(e, juego.id) }} onKeyPress={e => { if(e.key == "Enter"){editar(e, juego.id); console.log("enter")}}}/>
                            <button className='btn btn-guardar' >&#8226;</button>
                            <button className='btn btn-eliminar' onClick={ e => {borramelo(juego.id) }}>&times;</button>
                        </div>
                    </div>
                    );
                }
            )}

        </section>

        <h3>Agregar Juego</h3>

        <form onSubmit={conseguirDatosForm}>
            <input type='text' name='titulo' placeholder='Titulo' autoComplete='off' />
            <textarea name='descripcion' placeholder='Descripcion'></textarea>
            <input type='submit' value="Guardar" className='btn'/>
        </form>

    </div>
  )
}
