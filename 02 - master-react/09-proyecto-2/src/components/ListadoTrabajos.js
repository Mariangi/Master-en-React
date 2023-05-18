import React from 'react';
import { trabajos } from '../data/trabajos';
import { Link } from 'react-router-dom';

export const ListadoTrabajos = ({limite}) => {
  return (
    <section>
    {
      trabajos.slice(0, limite).map(trabajo => {
        return(
          <Link to={"/proyecto/" + trabajo.id} key={trabajo.id}>
            <article className='card' >
              <div className='mask'>
                <img src={'/images/' + trabajo.id + '.jpg' }/>
              </div>
              <h3>{trabajo.nombre}</h3>
              <p className='category'>{trabajo.categorias}</p>
              <p className='technologies'>{trabajo.tecnologias}</p>
              <p className='description'>{trabajo.descripcion}</p>
            </article>
          </Link>
          
        )
      })
    }
  </section>
  )
}
