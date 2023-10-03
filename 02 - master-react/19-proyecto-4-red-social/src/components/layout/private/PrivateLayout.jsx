import React from 'react';
import { Header } from './Header';
import { Navigate, Outlet } from 'react-router-dom';
import { Sidebar } from './sidebar';
import useAuth from '../../../hooks/useAuth';

export const PrivateLayout = () => {

  const { auth, loading } = useAuth();

  if(loading){
   return <h1>Cargando..</h1>
  }else{
    return (
      <>
        {/* Layout */}
          {/* Header */}
          <Header/>
  
          {/* Main content */}
          <section className="layout__content">
            {auth._id ?
              <Outlet/>
            :
            <Navigate to="/login"/>
            }
          </section>
  
          {/* Side bar */}
          <Sidebar/>
      </>
    )
  }
}
