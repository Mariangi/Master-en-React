import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Global } from '../../helpers/Global';
import { Peticion } from '../../helpers/Peticion';

export const Articulo = () => {
  const [articulo, setArticulo] = useState({});
  const [cargando, setCargando] = useState("true");
  const params = useParams();

  useEffect(() => {
    conseguirArticulo();
  }, []);

  const conseguirArticulo = async() =>{

    let {datos, cargando} = await Peticion(Global.url + "articulo/" + params.id, "GET");

    if(datos.status == "success"){
      setArticulo(datos.articulo);
    }
    setCargando(false);
  }

  return (
    <>
      {cargando ? (<div className='box-cargando'><img className='cargando' src="https://cdn.pixabay.com/animation/2023/03/20/02/45/02-45-27-186_512.gif" alt="Cargando" /> <div className='piso-cargando'></div> </div>) : (
        <article>
          <article className="jumbo" >
            <div className='mascara'>
              {articulo.imagen != "default.png" && (<img src={Global.url + "imagen/" + articulo.imagen} alt="imagen del articulo" />)}
              {articulo.imagen == "default.png" && (<img src="https://http.cat/images/100.jpg" alt="imagen del articulo" />)}
            </div>
            <div className='datos'>
              <h3 className="title">{articulo.titulo}</h3>
              <p className="description">{articulo.contenido}</p>
            </div>
          </article>
        </article>
      )}      
    </>
  )
}
