import logo from './logo.svg';
import './App.css';
import { MiComponente } from './components/MiComponente';
import { PruebasCustom } from './components/PruebasCustom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <PruebasCustom/> */}
        <MiComponente/>
      </header>
    </div>
  );
}

export default App;
