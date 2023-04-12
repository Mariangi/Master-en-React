import logo from './logo.svg';
import './App.css';
import MiComponente from './MiComponente.js';
import ComponenteDos from './ComponenteDos';
import { ComponenteTres } from './ComponenteTres';

function App() {

  const ficha_medica={
    altura: "159 cm",
    grupo: "0",
    estado: "resfriada",
    alergias: "desconocido"
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        {/* mi componente */}
        <div className='componentes'>
          <MiComponente/>
          <hr/>
          <ComponenteDos/>
          <hr/>
          <ComponenteTres nombre="maria" ficha={ficha_medica}/>
        </div>
      </header>
    </div>
  );
}

export default App;
