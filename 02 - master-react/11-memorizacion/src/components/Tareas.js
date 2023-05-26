import React, { useMemo, useState } from 'react'

export const Tareas = () => {

    const [tareas, setTareas] = useState([]);
    const [contador, setContador] = useState(6300);

    const addTarea = e => {
        e.preventDefault();
        //esto agarra las tareas viejas y las vuelve a guardar en un array, pero a demas le agrega la nueva tarea
        setTareas( tarea => [...tarea, e.target.titulo.value]);
    }

    const eliminarTarea = (id) => {
        let tareas_filtradas = tareas.filter((tarea, indice) => indice !== id);
        setTareas(tareas_filtradas);
    }

    const sumarAlContador = e => {
        setContador(contador + 1);
    }

    const contadoresPasados = (acumulacion) =>{
        for(let i = 0; i <= acumulacion; i++){
            console.log("Ejecutando acumulacion de contadores pasados");
        }
        return `Contador manual de tareas:  ${acumulacion}`;
    }  

    const memoContadores = useMemo( () =>{
        contadoresPasados(contador);
        }, [contador]);

  return (
    <div className='wrap'>
        <h1>Mis Tareas</h1>

        <form onSubmit={ e => {addTarea(e)}}>
            <input type='text' name='titulo' placeholder='Titulo' autoComplete='off'/>

            <input type='submit' className='btn' value="Guardar"/>
        </form>

        <div>
            <h3>{memoContadores}</h3>
            <button onClick={sumarAlContador} className='btn'>Sumar</button>
        </div>

        <div>
            <h3>Listado de tareas</h3>
            <section>
                {tareas.map( (tarea, indice) => {
                    return(
                        <div className='fila' key={indice}>
                            <h4>{tarea}</h4>
                            <div className='btns'>
                                <button className='btn btn-eliminar' onClick={ () => {eliminarTarea(indice) }}>Eliminar</button>
                            </div>
                        </div>
                    )
                })}

            </section>
        </div>
    </div>
  )
}
