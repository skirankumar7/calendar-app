// import logo from './logo.svg';
import './App.css';
import MainComponent from './components/MainComponent';
// import 'bootstrap/dis'
// import 'bootstrap/dist/js/popper.min.js';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
        </a>
      </header> */}
          <MainComponent />
    </div>
  );
}

export default App;
