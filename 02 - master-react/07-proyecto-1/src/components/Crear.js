import React, { useState } from 'react'
import { GuardarEnStorage } from '../helpers/GuardarEnStorage';

export const Crear = ({setListadoState}) => {

    const tituloComponente = "Añadir Pelicula";
    const [peliState, setPeliState] = useState({
        titulo:'',
        descripcion: ''
    });

    const {titulo, descripcion} = peliState;
     
    const conseguirDatosForm = e =>{
        // esto evita que se recargue la pagina
        e.preventDefault();

        //Capturar los datos del formulario
        let titulo = e.target.titulo.value;
        let descripcion = e.target.descripcion.value;

        //Guardar los datos en un objeto
        let peli = {
            id: new Date().getTime(),
            titulo: titulo,
            descripcion: descripcion
        };

        //Guardar estado
        setPeliState(peli);

        //actualizar el estado del listado principal
        setListadoState(elementos => {
            return [...elementos, peli];
        });

        //Guardar en el almacenamiento local
        GuardarEnStorage("pelis", peli);
    }


  return (
    <div className="add">
        <h3 className="title">{tituloComponente}</h3>
        {(titulo && descripcion) && "Has creado la pelicula: " + titulo}
        <form onSubmit={conseguirDatosForm}>
            <input  type="text"
                    id='titulo' 
                    name="titulo" 
                    placeholder="Titulo"
            />
            <textarea 
                    id="descripcion"
                    name='descripcion'
                    placeholder="Descripcion" 
                    cols="30" rows="10">
            </textarea>
            <input  type="submit"
                    id='save' 
                    value="Guardar"
            />
        </form>
    </div>
  )
}
