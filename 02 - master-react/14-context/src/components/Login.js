import React, { useContext } from 'react'
import { PruebaContext } from '../context/PruebaContext';

export const Login = () => {

  const {usuario, setUsuario} = useContext(PruebaContext);

  const guardarDatos = e => {
    e.preventDefault();

    const user = {
      nick: e.target.nick.value,
      nombre: e.target.nombre.value,
      email: e.target.email.value
    }
    setUsuario(user);

  }

  return (
    <div>
            <h2>Login</h2>
      <form onSubmit={guardarDatos}>
        <input type="text" name='nick' placeholder='Nickname'/>
        <input type="text" name='nombre' placeholder='Nombre'/>
        <input type="text" name='email' placeholder='Email'/>
        <input type="submit" className='btn' value='Enviar'/>
      </form>
    </div>
  )
}
