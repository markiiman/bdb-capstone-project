import './App.css';
import { BrowserRouter as Router } from 'react-router-dom'
import Login from './components/Login/Login'
import AddSeedPhrase from './components/SeedPhrase/AddSeedPhrase'
import Home from './components/Home/Home'

function App() {
    return (
        <Router basename={process.env.PUBLIC_URL}>
            <div className="app h-100" style={{"backgroundColor": "rgb(244, 246, 248)"}}>
                <Home />
            </div>
        </Router>
    );
}

export default App;
