import React, { useEffect, useState } from 'react'
import { Editar } from './Editar';

export const Listado = ({listadoState, setListadoState}) => {

    // const [listadoState, setListadoState] = useState([]);

    const [editar, setEditar] = useState(0);

    useEffect(() => {
        conseguirPeliculas();
    }, []);

    const conseguirPeliculas = () => {
        //de esta manera capturo el array de peliculas guardadas para poder mostrarlo
        //aca estoy sacando el array pelis de el localStorage para poder mostrarlo
        let peliculas = JSON.parse(localStorage.getItem("pelis"));
        
        setListadoState(peliculas);
        return peliculas;
    }

    const borrarPeli = (id) => {

        //Conseguir peliculas almacenas
        let pelis_almacenadas = conseguirPeliculas();

        //Filtrar las peliculas para que elimine del array las que no quiero
        let nuevo_array_pelis = pelis_almacenadas.filter(peli => peli.id !== parseInt(id));

        //Actualizar el estado del listado
        setListadoState(nuevo_array_pelis);

        //actualizar los datos en el local storage
        localStorage.setItem('pelis', JSON.stringify(nuevo_array_pelis))
    }


  return (
    <>
        {/* <!-- aca van las pelis --> */}
        {listadoState != null ? 
            listadoState.map(peli => {
                return(
                    <article key={peli.id} className="peli-item">
                        <h3 className="title">{peli.titulo}</h3>
                        <p className="description">{peli.descripcion}</p>

                        <button className="edit" onClick={() => setEditar(peli.id)}>Editar</button>
                        <button className="delete" onClick={() => borrarPeli(peli.id)}>Borrar</button>
                        {/* aparece formulario de editar */}
                        {/* esto es un if("{}") */}
                        {editar === peli.id && 
                            (<Editar    peli={peli} 
                                        conseguirPeliculas={conseguirPeliculas}
                                        setEditar={setEditar}
                                        setListadoState={setListadoState}/>) }
                    </article>
                );
            })
        : <h2>No hay peliculas para mostrar</h2>
        }
    </>
  )
}
