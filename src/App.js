
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import './App.css';
import Register from "./pages/Register.js";
import Login from "./pages/Login.js";
import Medecin from "./pages/Medecin";
import Patient from "./pages/Patient.js";
import Secretaire from "./pages/Secretaire.js";


function App() {
  return (
    <main className="App">
      <Router>
      <Routes>
      <Route path="/" element={<Register />}/>
        <Route path="Register" element={<Register />}/>
        <Route path="Login" element={<Login />}/>
        <Route path="Medecin" element={<Medecin />}/>
        <Route path="Secretaire" element={<Secretaire/>}/>
        <Route path="Patient" element={<Patient />}/>
      </Routes>
      </Router>
    </main>
  )
}

export default App;
