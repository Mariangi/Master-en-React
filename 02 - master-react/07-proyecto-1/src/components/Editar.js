import React from 'react';

export const Editar = ({peli, conseguirPeliculas, setEditar, setListadoState}) => {

    const titulo_componente = "Editar";

    const guardarEdicion = (e , id) =>{
        e.preventDefault();
        //Conseguir el target del evento
        let target = e.target;

        //Buscar el indice del objeto de la pelicula a actualizar 
        const pelis_almacenadas = conseguirPeliculas();
        const indice = pelis_almacenadas.findIndex(peli => peli.id === id);

        //Crear objeto con id de ese indice y el titulo y la descripcion del formulario
        let peli_actualizada ={
            id: id,
            titulo: target.titulo.value,
            descripcion: target.descripcion.value
        }

        //actualizar el elemento con ese indice
        pelis_almacenadas[indice] = peli_actualizada;

        //Guardar el nuevo array de objetos en el localStorage
        localStorage.setItem("pelis", JSON.stringify(pelis_almacenadas))

        //y actualizar estados
        setListadoState(pelis_almacenadas);
        setEditar(0);

        // console.log(indice);
        // console.log(peli);

    }

  return (
    <div className='edit_form'>
        <hr/>
        <h3 className='title'>{titulo_componente}</h3>
        <form onSubmit={e => guardarEdicion(e ,peli.id)}>
            <input  type='text'
                    name='titulo'
                    className='titulo_editado'
                    defaultValue={peli.titulo}/>

            <textarea
                    name='descripcion'
                    className='descripcion_editada'
                    defaultValue={peli.descripcion}>
            </textarea>

            <input type='submit' className='editar' value="Actualizar"/>

        </form>
    </div>
  )
}