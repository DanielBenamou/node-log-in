import './App.css';
import {BrowserRouter as Router} from "react-router-dom";
import Login from './components/Login/Login';
function App() {
  return (
    <Router>
      <div className="App">
        <h1>React & Node </h1>
        <Login/>
        
      
      </div>


    </Router>
)}

export default App;
