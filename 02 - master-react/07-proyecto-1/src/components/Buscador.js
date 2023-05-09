import React, { useState } from 'react'

export const Buscador = ({listadoState, setListadoState}) => {

  const [busqueda, setBusqueda] = useState("");
  const [noEncontrado, setNoEncontrado] = useState(false);

  const buscarPeli = e =>{
    //crear estado y actualizarlo
    setBusqueda(e.target.value);
    console.log(busqueda);

    // setBusqueda(e.target.value);
    // console.log(busqueda);

    //filtrar para buscar concidencias
    let pelis_encontradas = listadoState.filter(peli =>{
      return peli.titulo.toLowerCase().includes(busqueda.toLocaleLowerCase());
    });

    console.log(pelis_encontradas);

    //si el buscador solo tienen una letra devuelvo el listado completo sin filtrar
    if(busqueda.length <= 1 || pelis_encontradas <= 0 ){
      pelis_encontradas = JSON.parse(localStorage.getItem("pelis"));
      setNoEncontrado(true);
    }else{
      setNoEncontrado(false);
    }

    //Actualizar el estado del listado principal con lo que he logrado filtrar
    setListadoState(pelis_encontradas);

  } 

  return (
    <div className="search">
        <h3 className="title">Buscar</h3>
        {(noEncontrado === true && busqueda.length > 1 )&& (
           <span className='no-encontrado'>No se han enconontrado coincidencias</span>
        )}
       
        <form>
            <input  type="text" 
                    id='search_field' 
                    name='busqueda'
                    autoComplete='off'
                    // value={busqueda}
                    onChange={buscarPeli}/>
            <button id='search'>Buscar</button>
        </form>
    </div>
  )
}
