
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from './layout/Navbar';
import Home from './pages/Home';
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import AddUser from './users/AddUser';
import EditUser from './users/EditUser';
import ViewUser from './users/ViewUser';


function App() {
  return (
    <main className="App">
      <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="adduser" element={<AddUser />}/>
        <Route path="edit/:id" element={<EditUser />}/>
        <Route path="view/:id" element={<ViewUser />}/>
      </Routes>
      </Router>
      
    </main> 
  );
}

export default App;
