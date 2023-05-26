import React, { useCallback, useEffect, useState } from 'react';
import { Empleados } from './Empleados'; 

export const Gestion = () => {

  const [nombre, setNombre] = useState("");
  const [pagina, setpagina] = useState();

  useEffect( () => {
    console.log("vista actualizada");
  }, [nombre, pagina]);

  const asignarGestor = e => {
      setNombre(e.target.value);
  }

  const mostarMensaje = useCallback(() => {
    console.log("Recargo empleados");
  }, [pagina] );

  return (
    <div>
        <h1>Nombre del gestor: {nombre}</h1>
        <input type="text" onChange={asignarGestor}  placeholder='Ingrese nombre de Gestor'/>

        <h2>Listado de empleados: </h2>
        <p> los usuarios son gestionados por {nombre} y vienen de jasonplaceholder... </p>

        <Empleados pagina={pagina} mensaje={mostarMensaje}/>

        <button onClick={ () => { setpagina(1)}}> pagina 1</button>
      <button onClick={ () => { setpagina(2)}}> pagina 2</button>
    </div>
  )
}
