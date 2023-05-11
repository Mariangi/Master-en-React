import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

export const PanelControl = () => {
  return (
    <div className="panel">
        <h1 >Panel de control</h1>

        <nav>
            <ul>
                <NavLink to="/panel/inicio"
                    className={({isActive}) => isActive ? "activado" : ""}>
                    <li>Inicio</li>
                </NavLink>
                <NavLink to="/panel/crear-articulos"
                    className={({isActive}) => isActive ? "activado" : ""}>
                    <li>Crear articulos</li>
                </NavLink>
                <NavLink to="/panel/gestion-usuarios"
                    className={({isActive}) => isActive ? "activado" : ""}>
                    <li>Gestion usuarios</li>
                </NavLink>
                <NavLink to="/panel/acerca-de"
                    className={({isActive}) => isActive ? "activado" : ""}>
                    <li>Acerca de</li>
                </NavLink>
            </ul>
        </nav>

        <section>
            {/* componente de la subruta */}
            {/* esto carga mis componentes de subruta */}

            <Outlet/>
        </section>


    </div>
  )
}
