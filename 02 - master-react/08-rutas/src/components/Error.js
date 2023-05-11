import React from 'react'
import { Link } from 'react-router-dom'

export const Error = () => {
  return (
    <>
      <h1 className='error'>ERROR</h1>
      <Link to="/inicio" className='btn btn-inicio'>Inicio</Link> 
    </>
  )
}
