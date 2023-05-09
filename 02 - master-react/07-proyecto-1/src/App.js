import { useState } from "react";
import { Buscador } from "./components/Buscador";
import { Crear } from "./components/Crear";
import { Listado } from "./components/Listado";

function App() {

  const [listadoState, setListadoState] = useState([]);

  return (
    <div className="layout">
    <header className="header">
        <div className="logo">
            <div className="play"></div>
        </div>
        <h1>MisPelis</h1>
    </header>

    <nav className="nav" >
        <ul>
            <li><a href="/#"></a>Inicio</li>
            <li><a href="/#"></a>Peliculas</li>
            <li><a href="/#"></a>Blog</li>
            <li><a href="/#"></a>Inicio</li>
            <li><a href="/#"></a>Contacto</li>
        </ul>
    </nav>

    {/* <!-- Contenido principal --> */}
    <section className="content">
      <Listado listadoState={listadoState} setListadoState={setListadoState}/>
    </section>

    {/* <!-- Barra lateral --> */}
    <aside className="sidebar">
      <Buscador listadoState={listadoState} setListadoState={setListadoState}/>

      <Crear setListadoState={setListadoState}/>
    </aside>

    {/* <!-- Footer --> */}
    <footer className="footer">
        &copy; Master en React
    </footer>

</div>

  );
}

export default App;
