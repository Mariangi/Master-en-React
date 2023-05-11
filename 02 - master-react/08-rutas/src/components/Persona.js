import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export const Persona = () => {

    // let {nombre = "M", apellido = "R"} = useParams();
    const {nombre, apellido} = useParams();
    const navegar = useNavigate();

    const enviar = e =>{
        e.preventDefault();
        let nombre = e.target.nombre.value;
        let apellido = e.target.apellido.value;

        if(nombre.lenght <= 0 && apellido.leght <= 0){
            navegar("/inicio");
        }else{
            //uso el useNavigate aca
            navegar(`/persona/${nombre}/${apellido}`);
        }

    }


  return (
    <>
        {/* <h1>Hi!, &nbsp;{nombre} {apellido}.</h1> */}
        {!nombre && <h1>No ha ingresado sus datos</h1>}
        {nombre && <h1>Hi! {nombre} {apellido}</h1>}

        <form onSubmit={enviar}>
            <input type='text' name='nombre' placeholder='Nombre' autoComplete='off'/>
            <input type='text' name='apellido' placeholder='Apellido' autoComplete='off'/>
            <input type='submit' className='btn' name='Enviar' value="Enviar"/>
        </form>
    </>
  )
}