import React from 'react'
import { useForm } from '../hooks/useForm';

export const MiFormulario = () => {

    const {estado, enviado, cambiado} = useForm({});

  return (
    <div>
         
        <h1>Formulario</h1>
        <p>Formulario para guardar curso</p>
        <p>Curso guardado:</p>
        <pre className='show'>{JSON.stringify(estado)}</pre>

        <form onSubmit={enviado}>
            <input type='text' name='titulo' onChange={cambiado} placeholder='Titulo'/>
            <input type='number' name='anio' onChange={cambiado} placeholder='Año de publicacion'/>
            <textarea name='descripcion' onChange={cambiado} placeholder='Descripcion'/>
            <input type='text' name='autor' onChange={cambiado} placeholder='Autor'/>
            <input type='email' name='email' onChange={cambiado} placeholder='Correo de contacto'/>

            <input type='submit' className='btn' value="Enviar"/>
        </form>
    </div>
  )
}
