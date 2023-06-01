import './App.css';
import { PruebaContext } from './context/PruebaContext';
import { AppRouter } from './routing/AppRouter';
import { useEffect, useState } from 'react';

function App() {

  const [usuario, setUsuario] = useState({});

  useEffect( () => {
    let usuario_local = JSON.parse(localStorage.getItem("usuario"));
    setUsuario(usuario_local);
    console.log(usuario_local);
  }, []);

  useEffect( () => {
    localStorage.setItem("usuario", JSON.stringify(usuario));
    console.log("cada vez que cambia usuario");
  }, [usuario]);

  return (
    <PruebaContext.Provider value={{usuario, setUsuario}}>
      <AppRouter/>
    </PruebaContext.Provider>
  );
}

export default App;
