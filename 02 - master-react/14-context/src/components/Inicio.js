import React, { useContext } from 'react'
import { PruebaContext } from '../context/PruebaContext'

export const Inicio = () => {

  const compartida = useContext(PruebaContext);

  return (
    <div>
      <h1>Inicio</h1>
      <p>Info compartida con useContext: {compartida.usuario.nombre}</p>
    </div>
  )
}
