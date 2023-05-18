import React from 'react'
import { Link } from 'react-router-dom'
import { ListadoTrabajos } from './ListadoTrabajos'

export const Inicio = () => {
  return (
    <div className='home'>
      <h1>Hola, soy Maria de los Angeles Rasmussen y soy Desarrollador Web.
        Ofresco mis servicios de programación y desarrollo en todo tipo de proyectos web. <Link to="/contacto">Contacta conmigo.</Link> </h1>

      <h3>Te ayudo a crear tu sitio o applicaion web, tener más visivilidad y relevancia en internet.</h3>

      <section className='lasts-works'>
        <h2>Algunos de mis proyectos.</h2>
        <p>Estos son algunos de mis trabajos de desarrollo web. </p>
        <div className='page'>
          <ListadoTrabajos limite="2"/>
        </div>
      </section>


    </div>
  )
}
