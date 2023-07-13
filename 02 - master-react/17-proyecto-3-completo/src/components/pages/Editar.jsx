import React from 'react';
import { useState, useEffect } from 'react';
import { useForm } from '../../hooks/useForm';
import { Peticion } from '../../helpers/Peticion';
import { Global } from '../../helpers/Global';
import { useParams } from 'react-router-dom';

export const Editar = () => {

  const { formulario, enviado, cambiado } = useForm({});
  const [resultado, setResultado] = useState("no_enviado");
  const [articulo, setArticulo] = useState({});
  const params = useParams();

  useEffect(() => {
    conseguirArticulo();
  }, []);


  const conseguirArticulo = async() =>{

    let {datos} = await Peticion(Global.url + "articulo/" + params.id, "GET");

    if(datos.status == "success"){
      setArticulo(datos.articulo);
    }
  }


  const editarArticulo = async(e) => {
    e.preventDefault();

    //recojer los datos del formulario
    let nuevoArticulo = formulario;

    //guardar articulo en el backend
    const { datos, cargando } = await Peticion(Global.url + "articulo/" + params.id, "PUT", nuevoArticulo);


    if(datos.status == "success"){
      setResultado("guardado");
    }
    else{
      setResultado("error");
    }

    const fileInput = document.querySelector("#file");


    if(datos.status == "success" && fileInput.files[0]){
      setResultado("guardado");
      console.log("hay veces que no quiero vivir");
      //cojer el valor
      const fromData = new FormData();
      fromData.append('file0',fileInput.files[0]);
      
      const subida = await Peticion(Global.url+"subir-imagen/" + datos.articulos._id, "POST", fromData, true);

      if(subida.datos.status == "success"){
        setResultado("guardado");
      }else{
        setResultado("error");
      }

    }

  }

  return (
    <div className='jumbo'>
      <h1>Editar articulo</h1>
      <p> Formulario para editar: {articulo.titulo}</p>
      <strong className='mensaje mensaje-success'>{resultado == "guardado" ? "Articulo guardado con exito": ""}</strong>
      <strong className='mensaje mensaje-error'>{resultado == "error" ? "Los datos proporcionados son incorrectos": ""}</strong>

      {/* montar un formulario */}
      <form className='formulario' onSubmit={editarArticulo}> 
      
        <div className='form-group'>
          <label htmlFor="titulo">Titulo</label>
          <input type="text" name='titulo' onChange={cambiado} defaultValue={articulo.titulo}/>
        </div>

        <div className='form-group'>
          <label htmlFor="contenido">Contenido</label>
          <textarea type="text" name='contenido' onChange={cambiado} defaultValue={articulo.contenido}/>
        </div>

        <div className='form-group'>
          <label htmlFor="file0">Imagen</label>
          <div className='mascara'>
            {articulo.imagen != "default.png" && articulo.imagen && (<img src={Global.url + "imagen/" + articulo.imagen} alt="imagen del articulo" />)}
            {articulo.imagen == "default.png" && (<img src="https://http.cat/images/100.jpg" alt="imagen del articulo" />)}
          </div>
          <input type="file" name='file0' id='file'/>
        </div>

        <input type="submit" value="Guardar" className='btn success' />

      </form>
    </div>
  )
}
