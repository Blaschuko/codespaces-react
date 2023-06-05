import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src="Octocat.png" className="App-logo" alt="logo" />
        <p>
          GitHub Codespaces <span className="heart">♥️</span> React
        </p>
        <p className="small">
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </p>
      </header>
      <div className="bg-blue-500 text-white p-4">
            <h1 className="text-3xl font-bold">Hello, Tailwind!</h1>
            <p className="mt-2">Tailwind CSS is awesome!</p> 
        </div> 
    </div>
  );
}

export default App;
