import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './components/Login/Login'
import AddSeedPhrase from './components/SeedPhrase/AddSeedPhrase'
import EnterSeedPhrase from './components/SeedPhrase/EnterSeedPhrase'
import Home from './components/Home/Home'

function App() {
    return (
        <Router basename={process.env.PUBLIC_URL}>
            <div className="app h-100" style={{"backgroundColor": "rgb(244, 246, 248)"}}>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/seedphrase" component={AddSeedPhrase} />
                    <Route exact path="/enter-seedphrase" component={EnterSeedPhrase} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
