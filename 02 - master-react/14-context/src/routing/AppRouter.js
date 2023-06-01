import React, { useContext } from 'react';
import {Routes, Route, NavLink, BrowserRouter} from 'react-router-dom';
import { Inicio } from '../components/Inicio';
import { Acerca } from '../components/Acerca';
import { Articulos } from '../components/Articulos';
import { Login } from '../components/Login';
import { Contacto } from '../components/Contacto';
import { PruebaContext } from '../context/PruebaContext';

export const AppRouter = () => {

    const {usuario, setUsuario} = useContext(PruebaContext);

  return (
    <BrowserRouter>

        <header>
            <div className='logo'>
                React Context
            </div>
            <nav>
                <ul>
                    <NavLink to="/inicio"
                        className={({isActive}) => isActive ? "active" : ""}>
                            <li>Inicio</li>
                    </NavLink>
                    <NavLink to="/articulos"
                        className={({isActive}) => isActive ? "active" : ""}>
                            <li>Articulos</li>
                    </NavLink>
                    <NavLink to="/acerca"
                        className={({isActive}) => isActive ? "active" : ""}>
                            <li>Acerca</li>
                    </NavLink>
                    <NavLink to="/contacto"
                        className={({isActive}) => isActive ? "active" : ""}>
                            <li>Contacto</li>
                    </NavLink>         
                    {usuario.hasOwnProperty("nick") && usuario.nick !== null ? (
                        <>
                            <NavLink to="/"
                                className={({isActive}) => isActive ? "active" : ""}>
                                    <li>{usuario.nick}</li>
                            </NavLink>
                            <a href='#' onClick={ e => {e.preventDefault(); setUsuario({})}}>
                                <li>Logout</li>
                            </a>
                        </>
                    ): (
                        <NavLink to="/login"
                            className={({isActive}) => isActive ? "active" : ""}>
                                <li>Login</li>
                        </NavLink>
                    )}

                </ul>
            </nav>
        </header>
      
        <section className='content'>
            <Routes>
                <Route path='/' element={<Inicio/>}/>
                <Route path='/inicio' element={<Inicio/>}/>
                <Route path='/articulos' element={<Articulos/>}/>
                <Route path='/acerca' element={<Acerca/>}/>
                <Route path='/contacto' element={<Contacto/>}/>
                <Route path='/login' element={<Login/>}/>

                <Route path='*' element={<> <h1>ERRROR 404</h1></>}/>
            </Routes>
        </section>
    

    </BrowserRouter>
  )
}
