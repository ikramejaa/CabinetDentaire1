
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./layout/Navbar";
import Home from "./pages/Home";
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Addtraitement  from './traitements/Addtraitement';
import Edittraitement from './traitements/Edittraitement';

function App() {
  return (
    <div className="App">
      <Router>
      <Navbar/>

      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/Addtraitement" element={<Addtraitement/>}/>
        <Route exact path="/Edittraitement/:id" element={<Edittraitement/>}/>
      </Routes>
      </Router>
      

      
    </div>
  );
}

export default App;
