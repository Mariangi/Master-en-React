import React, {useState} from 'react';

export const MiPrimerEstado = () => {

    // Esta es la problematica wue no funciona
        // let nombre = "maria";

        // const cambiarNombre = (e) =>{
        //     nombre = "Angeles";
        // }


        const cambiarNombre = (e, nombreFijo) =>{
            setNombre(nombreFijo);
        }


    //   la variable  la funcion que me va 
     // donde guardo   a permitir acceder a 
        // los datos   ese estado y cambiarlo
    const [nombre,  setNombre] = useState("Maria")

  return (
    <div>
        <h3>Componente - MiPrimerEstado</h3>

        <strong>{nombre}</strong>
        &nbsp;
        <button onClick={e => cambiarNombre(e,"angeles")}>Cambiar a angeles</button>
        &nbsp;
        <input type='text' onKeyUp={e => cambiarNombre(e, e.target.value)} placeholder='Cambiar nombre'/>

    </div>
  )
}
