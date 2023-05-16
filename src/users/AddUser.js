import React ,{useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/AddUser.css";


export default function AddUser() {

  let navigate=useNavigate()
  const[patient,setPatient]=useState({
    nom:"",
    prenom:"",
    email:"",
    mobile:"",
    cne:"",
    sexe:"",
    dateNaissance:"",
    assurance:"",
    maladies:""
    
  })

  const{nom,prenom,email,mobile,cne,sexe,dateNaissance,assurance,maladies}=patient
  
  const onInputChange=(e)=>{
    setPatient({...patient,[e.target.id]:e.target.value})
  }
  const onSubmit=async(e)=>{
    e.preventDefault();
    axios.post("http://localhost:8080/add", patient)
    .then(res=>{
      alert("Data added successfully!");
      navigate("/");
    })
    
  }

  return (
    <div className="container-add container"> 
      <div className="row-add">
        <div className="div-add col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="titre-add">Ajouter un patient</h2>
          <Form onSubmit={(e) => onSubmit(e)}>
            <Form.Group className="nom-add" controlId="nom">
              <Form.Label>Nom:</Form.Label>
              <Form.Control type="text"  placeholder="Entrez le nom" name="nom" value={nom} onChange={(e)=>onInputChange(e)} />
            </Form.Group>

            <Form.Group className="prenom-add" controlId="prenom">
              <Form.Label>Prénom:</Form.Label>
              <Form.Control type="text" placeholder="Entrez le prenom" name="prenom" value={prenom} onChange={(e)=>onInputChange(e)} />
            </Form.Group>

            <Form.Group className="email-add" controlId="email">
              <Form.Label>E-mail:</Form.Label>
              <Form.Control type="text" placeholder="Entrez l'email" name="email" value={email} onChange={(e)=>onInputChange(e)} />
            </Form.Group>

            <Form.Group className="mobile-add" controlId="mobile">
              <Form.Label>Mobile:</Form.Label>
              <Form.Control type="text" placeholder="Entrez le mobile" name="mobile" value={mobile} onChange={(e)=>onInputChange(e)} />
            </Form.Group>
            <Form.Group className="cne-add" controlId="cne">
              <Form.Label>CNE:</Form.Label>
              <Form.Control type="text" placeholder="Entrez le cne" name="cne" value={cne} onChange={(e)=>onInputChange(e)} />
            </Form.Group>

            <Form.Group className="sexe-add" controlId="sexe">
              <Form.Label>Sexe:</Form.Label>
              <Form.Control type="text" placeholder="Entrez le sexe" name="sexe" value={sexe} onChange={(e)=>onInputChange(e)} />
            </Form.Group>

            <Form.Group className="dateNaissance-add" controlId="dateNaissance">
              <Form.Label>Date de Naissance:</Form.Label>
              <Form.Control type="date" placeholder="Entrez la date de naissance" name="dateNaissance" value={dateNaissance} onChange={(e)=>onInputChange(e)} />
            </Form.Group>

            <Form.Group className="assurance-add" controlId="assurance">
              <Form.Label>Assurance:</Form.Label>
              <Form.Control type="text" placeholder="Entrez l'assurance" name="assurance" value={assurance} onChange={(e)=>onInputChange(e)} />
            </Form.Group>

            <Form.Group className="maladies-add" controlId="maladies">
              <Form.Label>Maladies:</Form.Label>
              <Form.Control type="text" placeholder="Entrez les maladies et les medocs" name="maladies" value={maladies} onChange={(e)=>onInputChange(e)} />
            </Form.Group>

            
            <Button variant="primary" type="submit" className="mt-3">
          Enregistrer
        </Button>
            
        </Form>
      </div>
    </div>
    </div>
  )
}
