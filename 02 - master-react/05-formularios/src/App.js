import logo from './logo.svg';
import './App.css';
import { FormulrioComponents } from './components/FormulrioComponents';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      
        <FormulrioComponents/>

      </header>
    </div>
  );
}

export default App;
