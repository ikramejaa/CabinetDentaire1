import React ,{useState} from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/EditUser.css";

export default function EditUser() {
  
  const{id}=useParams();
  const[patient,setPatient]=useState([]);
  const navigate=useNavigate();

  useEffect(()=>{
    axios.get(`http://localhost:8080/patient/${id}`)
    .then(res=> setPatient(res.data))
    .catch(err=> console.log(err))

},[id]);




const onSubmit=async(e)=>{
  e.preventDefault();
  axios.put(`http://localhost:8080/patient/${id}`,patient)
  .then(
    res=>{ 
      alert("data updated successfully!");
      navigate("/")
    }
  )
}
  return (
    <div className="container-edit container"> 
      <div className="row-edit">
        <div className="div-edit col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="titre-edit">Enregistrer le patient</h2>
          <Form onSubmit={(e) => onSubmit(e)}>
          
            <Form.Group className="nom-edit" controlId="nom">
              <Form.Label>Nom:</Form.Label>
              <Form.Control type="text"   name="nom" value={patient.nom} onChange={(e)=>setPatient({...patient,nom:e.target.value})} />
            </Form.Group>

            <Form.Group className="prenom-edit" controlId="prenom">
              <Form.Label>Prénom:</Form.Label>
              <Form.Control type="text"  name="prenom" value={patient.prenom} onChange={(e)=>setPatient({...patient,prenom:e.target.value})} />
            </Form.Group>

            <Form.Group className="email-edit" controlId="email">
              <Form.Label>E-mail:</Form.Label>
              <Form.Control type="text"  name="email" value={patient.email} onChange={(e)=>setPatient({...patient,email:e.target.value})} />
            </Form.Group>

            <Form.Group className="mobile-edit" controlId="mobile">
              <Form.Label>Mobile:</Form.Label>
              <Form.Control type="text"  name="mobile" value={patient.mobile} onChange={(e)=>setPatient({...patient,mobile:e.target.value})}/>
            </Form.Group>
            <Form.Group className="cne-edit" controlId="cne">
              <Form.Label>CNE:</Form.Label>
              <Form.Control type="text"  name="cne" value={patient.cne}  onChange={(e)=>setPatient({...patient,cne:e.target.value})}/>
            </Form.Group>

            <Form.Group className="sexe-edit" controlId="sexe">
              <Form.Label>Sexe:</Form.Label>
              <Form.Control type="text"  name="sexe" value={patient.sexe}  onChange={(e)=>setPatient({...patient,sexe:e.target.value})}/>
            </Form.Group>

            <Form.Group className="dateNaissance-edit" controlId="dateNaissance">
              <Form.Label>Date de Naissance:</Form.Label>
              <Form.Control type="date"  name="dateNaissance" value={patient.dateNaissance}  onChange={(e)=>setPatient({...patient,dateNaissance:e.target.value})}/>
            </Form.Group>

            <Form.Group className="assurance-edit" controlId="assurance">
              <Form.Label>Assurance:</Form.Label>
              <Form.Control type="text"  name="assurance" value={patient.assurance} onChange={(e)=>setPatient({...patient,assurance:e.target.value})} />
            </Form.Group>

            <Form.Group className="maladies-edit" controlId="maladies">
              <Form.Label>Maladies:</Form.Label>
              <Form.Control type="text"  name="maladies" value={patient.maladies}  onChange={(e)=>setPatient({...patient,maladies:e.target.value})}/>
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
