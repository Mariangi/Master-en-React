import logo from './logo.svg';
import './App.css';
import MiComponente from './MiComponente.js';
import ComponenteDos from './ComponenteDos';

function App() {
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
        </div>
      </header>
    </div>
  );
}

export default App;
