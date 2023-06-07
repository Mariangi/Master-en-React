import React, { useId } from 'react'

export const MiComponente = () => {

    const id = useId();

  return (
    <div>
        <h1>Hook useId</h1>
        <p>{id}</p>
        <input id='id' name='nombre' placeholder='Nombre'/>
    </div>
  )
}
