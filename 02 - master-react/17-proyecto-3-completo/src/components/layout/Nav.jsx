import React from 'react';
import { NavLink } from 'react-router-dom';

export const Nav = () => {
  return (
    <nav className="nav">
      <ul>
        <NavLink to="/inicio"
            className={({isActive}) => isActive ? "active" : ""}>
                <li>Inicio</li>
        </NavLink>
        <NavLink to="/articulos"
            className={({isActive}) => isActive ? "active" : ""}>
                <li>Articulos</li>
        </NavLink>
        <NavLink to="/crear"
            className={({isActive}) => isActive ? "active" : ""}>
                <li>Crear Articulo</li>
        </NavLink>
      </ul>
    </nav>

  )
}
