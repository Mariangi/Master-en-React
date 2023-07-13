import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Global } from '../../helpers/Global';
import { Peticion } from '../../helpers/Peticion';
import { Listado } from './Listado';


export const Articulos = () => {

  const [articulos, setArticulos] = useState([]);
  const [cargando, setCargando] = useState("true");

  useEffect(() => {
    conseguirArticulos();
  }, []);

  const conseguirArticulos = async() =>{

    let {datos, cargando} = await Peticion(Global.url + "articulos", "GET");

    if(datos.status == "success"){
      setArticulos(datos.articulos);
      setCargando(false);
    }
  }

  return (
    <>
      {cargando ? (<div className='box-cargando'><img className='cargando' src="https://cdn.pixabay.com/animation/2023/03/20/02/45/02-45-27-186_512.gif" alt="Cargando" /> <div className='piso-cargando'></div> </div>) : (
        articulos.length >= 1 ? 
          <Listado articulos={articulos} setArticulos={setArticulos}/>
        :
        (
           <div className='jumbo'>
            <h1>No hay articulos</h1>
            <Link to="/articulos" className='btn' >Reacargar</Link>
          </div>
        )
      )}      
    </>
  )
}
