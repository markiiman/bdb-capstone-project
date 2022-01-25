import './App.css';
import { BrowserRouter as Router } from 'react-router-dom'

function App() {
    return (
        <Router basename={process.env.PUBLIC_URL}>
            <div className="app" style={{"backgroundColor": "rgb(244, 246, 248)"}}>
                
            </div>
        </Router>
    );
}

export default App;
