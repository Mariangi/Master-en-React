import React, { useEffect, useState } from 'react';
import { AvisoComponent } from './AvisoComponent';

export const PruebasComponent = () => {

    const [usuario, setUsuario] = useState("Maria");
    const [fecha, setFecha] = useState("01-01-1998");
    const [contador, setContador] = useState(0);

    const modUsuario = e => {
        setUsuario(e.target.value);
    }

    const cambiarFecha = e =>{
        setFecha(Date.now());
    }

    //solo se ejecuta cuando se carga el componente
    useEffect(()=>{
        console.log("Has cargado el componente");
    },[]);
    // si yo como segundo parametro le pongo ",[]" el useEffect se ejecuta una sola vez
    //el useEffect es como un delator de cada cambio


     //solo se ejecuta se carga el componente y cuando cambia el usuario y la fecha
     useEffect(()=>{
        setContador(contador + 1);
        console.log("Has modificado el usuario: " + contador);
    },[fecha, usuario]);


  return (
    <div>
        <h1>El efecto - Hook useEffect</h1>
        <strong className={contador >=10 ? 'label-green' : 'label'}>{usuario}</strong>
        <strong className={contador >=10 ? 'label-green' : 'label'}>{fecha}</strong>
        <p>
            <input type='text' onChange={modUsuario} placeholder='Cambiar nombre'/>
            <button onClick={cambiarFecha} className='btn'>Cambiar fecha</button>
        </p>

        <hr/>

        {usuario == "MARIA" && <AvisoComponent/>}

    </div>
  )
}
