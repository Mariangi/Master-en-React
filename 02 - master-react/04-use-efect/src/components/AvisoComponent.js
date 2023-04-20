import React, { useEffect } from 'react'

export const AvisoComponent = () => {

  useEffect(()=>{
    //caundo se monta
    console.log("componente montado");
    //cuando se desmonta
    return()=>{
      console.log("componete desmontado");
    }
  },[]);

  return (
    <div>
        <h2>Saludos MARIA</h2>
        <button className='btn' onClick={e=>{
            alert("Saludos");
        }} >Mostrar alerta</button>
    </div>
  )
}
