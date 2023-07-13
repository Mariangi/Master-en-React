import React from 'react';
import { useState } from 'react';
import { useForm } from '../../hooks/useForm';
import { Peticion } from '../../helpers/Peticion';
import { Global } from '../../helpers/Global';

export const Crear = () => {

  const { formulario, enviado, cambiado } = useForm({});
  const [resultado, setResultado] = useState("no_enviado");

  const guardarArticulo = async(e) => {
    e.preventDefault();

    //recojer los datos del formulario
    let nuevoArticulo = formulario;

    //guardar articulo en el backend
    const { datos, cargando } = await Peticion(Global.url+"crear", "POST", nuevoArticulo);

    if(datos.status == "success"){
      setResultado("guardado");
    }
    else{
      setResultado("error");
    }

    const fileInput = document.querySelector("#file");


    if(datos.status == "success" && fileInput.files[0]){
      setResultado("guardado");

      //cojer el valor
      const fromData = new FormData();
      fromData.append('file0',fileInput.files[0]);  
         
      const subida = await Peticion(Global.url+"subir-imagen/" + datos.articulo._id, "POST", fromData, true);

      if(subida.datos.status == "success"){
        setResultado("guardado");
      }else{
        setResultado("error");
      }

    }
    else{
      setResultado("error");
    }
  }

  return (
    <div className='jumbo'>
      <h1>Crear articulo</h1>
      <p> Formulario para crear un articulo</p>
      <strong className='mensaje mensaje-success'>{resultado == "guardado" ? "Articulo guardado con exito": ""}</strong>
      <strong className='mensaje mensaje-error'>{resultado == "error" ? "Los datos proporcionados son incorrectos": ""}</strong>

      {/* montar un formulario */}
      <form className='formulario' onSubmit={guardarArticulo}> 
      
        <div className='form-group'>
          <label htmlFor="titulo">Titulo</label>
          <input type="text" name='titulo' onChange={cambiado}/>
        </div>

        <div className='form-group'>
          <label htmlFor="contenido">Contenido</label>
          <textarea type="text" name='contenido' onChange={cambiado}/>
        </div>

        <div className='form-group'>
          <label htmlFor="file0">Imagen</label>
          <input type="file" name='file0' id='file'/>
        </div>

        <input type="submit" value="Guardar" className='btn success' />

      </form>
    </div>
  )
}
