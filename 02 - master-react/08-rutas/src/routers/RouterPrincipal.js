import React from 'react';
//importar todo esto es necesario para el funcionamiento del router
import { Routes, Route, NavLink, BrowserRouter, Navigate } from 'react-router-dom';
import { Articulos } from '../components/Articulos';
import { Contacto } from '../components/Contacto';
import { Index } from '../components/Index';
import { Error } from '../components/Error';
import { Persona } from '../components/Persona';
import { PanelControl } from '../components/PanelControl';
import { Inicio } from '../components/panel/Inicio';
import { Gestion } from '../components/panel/Gestion';
import { Crear } from '../components/panel/Crear';
import { Acerca } from '../components/panel/Acerca';


export const RouterPrincipal = () => {
  return (
    //esto es necesario para cargar las rutas
    <BrowserRouter>

      <header>
        <h1>Header</h1>
      </header>

      <nav>
        <ul>
        <NavLink to="/inicio"
          className={({isActive}) => isActive ? "activado" : ""}>
            <li>Inicio</li>
        </NavLink>
        <NavLink to="/articulos"
          className={({isActive}) => isActive ? "activado" : ""}>
            <li>Articulos</li>
        </NavLink>
        <NavLink to="/contacto"
          className={({isActive}) => isActive ? "activado" : ""}>
            <li>Contacto</li>
        </NavLink>
        <NavLink to="/panel"
          className={({isActive}) => isActive ? "activado" : ""}>
            <li>Panel control</li>
        </NavLink>

          {/* <li><NavLink to="/articulos">Articulos</NavLink></li>
          <li><NavLink to="/contacto">Contacto</NavLink></li> */}
        </ul>
      </nav>

      {/* aca podria ponerle el header y un nav y hacer una s.p.a y que solo vaya cambiando el contenido del centro de la pagina */}

      <section>
        <Routes>
          {/* //esta es la ruta  */}
          <Route path='/' element={<Index/>}/>
          <Route path='/inicio' element={<Index/>}/>
          <Route path='/Index' element={<Index/>}/>
          <Route path='/articulos' element={<Articulos/>}/>
          <Route path='/contacto' element={<Contacto/>}/>

          {/* ":algo" es un parametro que se pasa por la url hasta el componente */}
          <Route path='/persona' element={<Persona/>}/>
          <Route path='/persona/:nombre' element={<Persona/>}/>
          <Route path='/persona/:nombre/:apellido' element={<Persona/>}/>

          {/* esto sirve para redirigir al usuario */}
          <Route path='/redirigir' element={<Navigate to="/persona/Maria/Rasmus"/>}/>

          {/*Rutas de panel de control */}
          <Route path='/panel/*' element={<PanelControl/>}>
            <Route index element={<Inicio/>}/>
            <Route path='inicio' element={<Inicio/>}/>
            <Route path='crear-articulos' element={<Crear/>}/>
            <Route path='gestion-usuarios' element={<Gestion/>}/>
            <Route path='acerca-de' element={<Acerca/>}/>
          </Route>

          {/* el * indica cualquier ruta que no exista */}
          <Route path='*' element={<Error/>}/>
        </Routes>
      </section>

      <footer>
        footer
      </footer>

    </BrowserRouter>
  )
}
