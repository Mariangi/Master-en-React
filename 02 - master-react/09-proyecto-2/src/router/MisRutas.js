import React from 'react';
import { Route, Routes, BrowserRouter, Navigate,  } from 'react-router-dom';
import { Inicio } from '../components/Inicio';
import { Contacto } from '../components/Contacto';
import { Curriculum } from '../components/Curriculum';
import { Portafolio } from '../components/Portafolio';
import { Servicios } from '../components/Servicios';
import { Footer } from '../components/layout/Footer';
import { HeaderNav } from '../components/layout/HeaderNav';
import { Proyecto } from '../components/Proyecto';

export const MisRutas = () => {
  return (
    <BrowserRouter>
        {/* header - nav */}
        <HeaderNav/>

        {/* section */}
        <section className='content'> 
          <Routes>
              <Route path='/' element={<Navigate to="/inicio"/>}/>
              <Route path='/inicio' element={<Inicio/>}/>
              <Route path='/portafolio' element={<Portafolio/>}/>
              <Route path='/proyecto/:id' element={<Proyecto/>}/>
              <Route path='/servicios' element={<Servicios/>}/>
              <Route path='/curriculum' element={<Curriculum/>}/>
              <Route path='/contacto' element={<Contacto/>}/>

              <Route path='*' element={<div className='page'> <h2>Error 404</h2></div>}/>
          </Routes>
        </section>

        {/* footer */}
        <Footer/>
    </BrowserRouter>
  )
}
