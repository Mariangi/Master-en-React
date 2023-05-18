import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { trabajos } from '../data/trabajos';

export const Proyecto = () => {

    const [proyecto, setProyecto] = useState({});
    const params = useParams();

    useEffect( () => {
        let proyecto = trabajos.filter((trabajo) => trabajo.id == params.id);
        setProyecto(proyecto[0]);
    }, []);

  return (
    <div className='page wrap-proyecto'>
        <div>
            <div className='wrap-proyecto-info'>
                <h1>{proyecto.nombre}</h1>
                <h3 className='category'>{proyecto.categorias}</h3>
                <h2 className='technologies'>{proyecto.tecnologias}</h2>
                <p className='description'>{proyecto.descripcion}</p>
                <a href={proyecto.url} className='btn' target='_blank'>Ver Proyecto</a>
            </div>
            <div className='mask'>
            <   img src={'/images/' + proyecto.id + '.jpg' }/>
            </div>
        </div>
        
    </div>
  )
}
