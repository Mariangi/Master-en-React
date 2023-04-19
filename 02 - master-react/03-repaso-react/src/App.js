import logo from './logo.svg';
import './App.css';
import { ComponenteDos } from './components/ComponenteDos';
import { ComponenteUno } from './components/ComponenteUno';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
        <div>
          <h1>Repaso</h1>
          <ComponenteUno/>
          <hr/>
          <ComponenteDos/>
        </div>

      </header>
    </div>
  );
}

export default App;
