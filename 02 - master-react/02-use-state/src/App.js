import logo from './logo.svg';
import './App.css';
import { MiPrimerEstado } from './Components/MiPrimerEstado';
import {EjercicioComponent} from './Components/EjercicioComponent';

function App() {

  const fecha = new Date();
  const yearActual = fecha.getFullYear();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
 
 
        <h1>El estado en React - Hook useState</h1>
        <div>
          <MiPrimerEstado/>
          <hr/>
          <EjercicioComponent year={yearActual}/>
        </div>

      </header>
    </div>
  );
}

export default App;
