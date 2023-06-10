import "bootstrap/dist/css/bootstrap.min.css";
import '@fortawesome/fontawesome-free/css/all.css';
import Navbar from './layout/Navbar';
import HomePatient from './pages/HomePatient';
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Addpatient from './patient/AddPatient';
import EditPatient from './patient/EditPatient';
import Traitement from './pages/Hometraitement';
import Addtraitement  from './traitement/Addtraitement';
import Edittraitement from './traitement/Edittraitement';
import Seance from './pages/HomeSeance';
import Addseance from './seance/AddSeance';
import Editseance from './seance/EditSeance';
import Medecinpage from './pages/MedecinPage';
import Ordonnance from "./Medecin/Ordonnance";
import Informationspatient from "./Medecin/Informationspatient";




function App() {
  return (
    <main className="App">
    <Router>
      <Navbar />
        
            <Routes>
              <Route path="/" element={<HomePatient />} />
              <Route path="Addpatient" element={<Addpatient />} />
              <Route path="edit/:id" element={<EditPatient />} />
              <Route path="traitement/:patientId" element={<Traitement />} />
              <Route exact path="Addtraitement/:patientId" element={<Addtraitement/>}/>
              <Route exact path="Edittraitement/:id/:patientId" element={<Edittraitement/>}/>
              <Route exact path="Seance/:patientId/:traitementId" element={<Seance/>}/>
              <Route path="Addseance/:patientId/:traitementId" element={<Addseance/>} />
              <Route exact path="Editseance/:id/:patientId/:traitementId" element={<Editseance/>}/>
              <Route exact path="Medecinpage" element={<Medecinpage/>}/>
              <Route exact path="Ordonnance/:seanceId/:patientId" element={<Ordonnance/>}/>
              <Route exact path="Informationspatient/:patientId" element={<Informationspatient/>}/>
            </Routes>
    </Router>
  </main>
  );
}

export default App;
