import React, { useState } from 'react'

export const FormulrioComponents = () => {

    const [usuario, setUsuario] = useState({});

    const conseguirDatosFormulario = e =>{
        // esto hace que la pagina no se recargue y llegue a enviarde la informacion
        e.preventDefault();
        let datos = e.target;
        let usuario = {
            nombre: datos.nombre.value,
            apellido: datos.apellido.value,
            signo: datos.signo.value,
            biografia: datos.biografia.value,
            enviar: datos.enviar.value 
        };

        setUsuario(usuario);
    }

    const cambiarDatos = e =>{
        let name_del_input = e.target.name;
        let usuario_para_modificar = usuario;

        // usuario_para_modificar[name_del_input] = e.target.value;
        // setUsuario(usuario_para_modificar);
        // setUsuario(usuario[e.target.name] = e.target.value); esto es una version abreviada

        setUsuario(estado_previo =>{
            //return del nuevo objeto
            return{
                // con estos tres puntitos capturo el estado previo y lo meto en "estado_previo" (spret y res en js)    
                ...estado_previo,
                //de esta manera le cambiamos al estado previo solo el valor 
                [name_del_input]: e.target.value
            }

        })

    }

  return (
    <div>

        <h1>Formularios con React</h1>

        {/* esto es un if dentro de un return */}
        { usuario.enviar
            && (<div className='info_usuario label'>
                <h2>{usuario.nombre}{" "}{usuario.apellido}</h2>
                {usuario.signo !== "" && <p>{usuario.signo}</p>}
                <p>{usuario.biografia}</p>
            </div>)}

        <form onSubmit={conseguirDatosFormulario}>

            <input type='text' onChange={cambiarDatos} name='nombre' placeholder='Nombre'/>
            <input type='text' onChange={cambiarDatos} name='apellido' placeholder='Apellido'/>
            <select onChange={cambiarDatos} name='signo' defaultValue={true}>
                {/* <option value='Selecciona'>Selecciona tu signo zodiacal</option> */}
                {/* el atriuto hidden hace que luego de selecionar una opcion del selec ya no puedas volver a seleccionar la opcion "selecciona tu (...)" */}
                <option value='' hidden={true} >Selecciona tu signo zodiacal</option>
                <option value='Aries'>Aries</option>
                <option value='Tauro'>Tauro</option>
                <option value='Geminis'>Geminis</option>
                <option value='Cancer'>Cancer</option>
                <option value='Leo'>Leo</option>
                <option value='Virgo'>Virgo</option>
                <option value='Libra'>Libra</option>
                <option value='Escorpio'>Escorpio</option>
                <option value='Sagitario'>Sagitario</option>
                <option value='Capricornio'>Capricornio</option>
                <option value='Acuario'>Acuario</option>
                <option value='Piscis'>Piscis</option> 
            </select>
            <textarea onChange={cambiarDatos} name='biografia' placeholder='Biografia...'></textarea>
            <input type='submit' name='enviar' value='Enviar' className='btn'/>
        </form>

    </div>
  )
}