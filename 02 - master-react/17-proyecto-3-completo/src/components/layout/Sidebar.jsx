import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Sidebar = () => {
    const [buscar, setBuscar] = useState("");
    const navegar = useNavigate();

    const hacerBusqueda = async(e) => {
        e.preventDefault();
        let mi_busqueda = e.target.search_file.value;
        navegar("buscar/" + mi_busqueda, {replace: true});
    }
    
  return (
    <aside className="sidebar">
        <div className="search">
            <h3 className="title">Buscar</h3>
            <form onSubmit={hacerBusqueda}>
                <input type="text" name="search_file"/>
                <input type="submit" id='search' value="Buscar" />
            </form>
        </div>

        {/* <div className="add">
            <h3 className="title">Añadir Pelicula</h3>
            <form>
                <input type="text" name="" placeholder="Titulo"/>
                <textarea placeholder="Descripcion" id="" cols="30" rows="10"></textarea>
                <input type="submit" value="Guardar"/>
            </form>
        </div> */}
    </aside>
  )
}
