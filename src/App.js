import Navbar from './layout/Navbar';
import Home from './pages/Seances';
import { BrowserRouter as Router ,Routes,Route } from 'react-router-dom';
import AddSeance from "./seances/AddSeance";
import EditSeance from "./seances/EditSeance";
import MedecinOrdonnance from "./pages/Ordonnance";



function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/addseance" element={<AddSeance/>}/>
          <Route exact path="/editseance/:id" element={<EditSeance/>}/>
          <Route exact path="/ordonnance/:id" element={<MedecinOrdonnance/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
