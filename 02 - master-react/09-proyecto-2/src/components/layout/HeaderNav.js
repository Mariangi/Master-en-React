import React from 'react'
import { NavLink } from 'react-router-dom'

export const HeaderNav = () => {
  return (
    <header className='header'>
        <div className='logo'>
            <div className='icon'>
                <div className='square square1'></div>
                <div className='square square2'></div>
            </div>
            {/* <span>M</span> */}
            <h1>Maria Rasmussen</h1>
        </div>

        <nav>
            <ul>
                <NavLink to="/inicio"
                    className={({isActive}) => isActive ? "active" : ""}>
                        <li>Inicio</li>
                </NavLink>
                <NavLink to="/portafolio"
                    className={({isActive}) => isActive ? "active" : ""}>
                        <li>Portafolio</li>
                </NavLink>
                <NavLink to="/servicios"
                    className={({isActive}) => isActive ? "active" : ""}>
                        <li>Servicios</li>
                </NavLink>
                <NavLink to="/Curriculum"
                    className={({isActive}) => isActive ? "active" : ""}>
                        <li>Curriculum</li>
                </NavLink>         
                <NavLink to="/contacto"
                    className={({isActive}) => isActive ? "active" : ""}>
                        <li>Contacto</li>
                </NavLink>
            </ul>
        </nav>

    </header>


  )
}
