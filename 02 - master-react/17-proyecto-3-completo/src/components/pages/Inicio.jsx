import React from 'react'
import { Link } from 'react-router-dom'

export const Inicio = () => {
  return (
    <div className='jumbo'>
      <h1>Bienvenido al blog con React</h1>
      <p>Blog desarrollado con el <span className='importantLetter'>MERN</span> Stack (<span className='importantLetter'>M</span>ongo, <span className='importantLetter'>E</span>xpress, <span className='importantLetter'>R</span>eact y <span className='importantLetter'>N</span>odeJS)</p>
      <Link to="/articulos" className='btn' >Ver los articulos</Link>
    </div>
  )
}
