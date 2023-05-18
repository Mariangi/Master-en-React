import React from 'react'

export const Contacto = () => {
  return (
    <div className='page wrap-contact'>
      <h2>Contacto</h2>
      <form className='contact' action='mailto:m.angeles.rasmussen@gmail.com'>
        <input type="text" placeholder='Nombre'/>
        <input type="text" placeholder='Apellido'/>
        <input type="text" placeholder='Email'/>
        <textarea placeholder='Motivo del contacto'/>
        <input type="submit" className='btn' value='Enviar'/>
      </form>
    </div>
  )
}
