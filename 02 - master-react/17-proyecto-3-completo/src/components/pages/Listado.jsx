import React from 'react';
import { Global } from '../../helpers/Global';
import { Peticion } from '../../helpers/Peticion';
import { Link } from 'react-router-dom';

export const Listado = ({articulos, setArticulos}) => {

  const eliminar = async(id) => {

    let {datos} = await Peticion(Global.url + "articulo/" + id, "DELETE");

    if(datos.status === "success"){
      let articulosActualizados = articulos.filter(articulo => articulo._id !== id);
      setArticulos(articulosActualizados);
    }



  }

  return (
    articulos.map(articulo => {
        return(
            <article className="articulo-item" key={articulo._id} >
          <Link to={"/articulo/" + articulo._id} >

              <div className='mascara'>
              {articulo.imagen != "default.png" && (<img src={Global.url + "imagen/" + articulo.imagen} alt="imagen del articulo" />)}
              {articulo.imagen == "default.png" && (<img src="https://http.cat/images/100.jpg" alt="imagen del articulo" />)}
              </div>
              </Link>
              <div className='datos'>
                <h3 className="title">{articulo.titulo}</h3>
                <p className="description">{articulo.contenido}</p>
      
                  <div className='btns'>
                    <Link className="edit btn" to={"/editar/" + articulo._id}>Editar</Link>
                    <button className="delete" onClick={() =>{eliminar(articulo._id)}}>Borrar</button>
                  </div>
                </div>
            </article>
         
          
        );
      })
  )
}
