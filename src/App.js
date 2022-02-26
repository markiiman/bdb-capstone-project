import './App.css';
import { networkProvider } from './provider'
import { useEffect, useState} from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './components/Login/Login'
import AddSeedPhrase from './components/SeedPhrase/AddSeedPhrase'
import EnterSeedPhrase from './components/SeedPhrase/EnterSeedPhrase'
import Home from './components/Home/Home'
import { ethers } from 'ethers'

function App() {
    const INFURA_ID = "e7cd066c2116417998171282cd502585"
    const [state, setState] = useState({
        provider: null,
    })

    useEffect(() => {
        _setState("provider", networkProvider("ropsten", INFURA_ID))
    }, [])

    // state updater
    const _setState = (name, value) => {
        setState(prevState => ({...prevState, [name]: value}))
    }
    
    return (
        <Router basename={process.env.PUBLIC_URL}>
            <div className="app h-100" style={{"backgroundColor": "rgb(244, 246, 248)"}}>
                <Switch>
                    <Route exact path="/" render={(props) => <Home ethers={ethers} provider={state.provider} {...props} />} />
                    <Route exact path="/login" render={(props) => <Login ethers={ethers} provider={state.provider} {...props} />} />
                    <Route exact path="/seedphrase" render={(props) => <AddSeedPhrase ethers={ethers} provider={state.provider} {...props} />} />
                    <Route exact path="/enter-seedphrase" render={(props) => <EnterSeedPhrase {...props} />} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
