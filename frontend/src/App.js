import './App.css';
import bounceLogo from './assets/icon.svg'
import NavBar from './components/NavBar.js'

function App() {
  return (
    <div className="App">
    <NavBar />
      <div className='logo-wrapper'>
        <header className="App-header">
        
          <div>
            <div className='shoe-wrapper'>
              <img src={bounceLogo} className='shoe' alt='Bounce Logo'></img>
            </div>
            <p className='name montserrat-subrayada-regular' >
              bounce
            </p>
            <p className='slogan raleway' >
              Elevate your game
            </p>
          </div>
          
        </header>
      </div>
      
    </div>
  );
}

export default App;
