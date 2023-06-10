import React, { useEffect, useState } from 'react'
import "../css/EditPatient.css"
import axios from 'axios';
import { Form } from "react-bootstrap";
import { useNavigate, useParams } from 'react-router-dom';

export default function EditSeance() {

  const{id,patientId,traitementId}=useParams();
  const[seance,setSeance]=useState([]);
  const navigate=useNavigate();

  useEffect(()=>{
    axios.get(`http://localhost:8080/seances/${id}`)
    .then(res=> setSeance(res.data))
    .catch(err=> console.log(err))

},[id]);




const onSubmit=async(e)=>{
  e.preventDefault();
  axios.put(`http://localhost:8080/patients/${id}`,seance)
  .then(
    res=>{ 
      alert("data updated successfully!");
      navigate(`/seance/${patientId}/${traitementId}`)
    }
  )
}

    return (
      <body class="adit-patient">
      <div className="container-edit"> 
      <div className="edit-form">
          <h3 className="titre-edit">Modifier la séance</h3>
            <Form onSubmit={(e) => onSubmit(e)}>
                <Form.Group className="montantrecu-edit" controlId="montantrecu">
              <Form.Label>Le montant reçu :</Form.Label>
              <Form.Control type="text"  name="montantrecu" value={seance.montantrecu}  onChange={(e)=>setSeance({...seance,montantrecu:e.target.value})}/>
            </Form.Group>
              <Form.Group className="date-edit" controlId="date">
              <Form.Label>Date de séance:</Form.Label>
              <Form.Control type="date"  name="date" value={seance.date}  onChange={(e)=>setSeance({...seance,date:e.target.value})}/>
            </Form.Group>
            <div className="button-row">
                <button className="submit-button" type="submit">
                  Enregistrer
                </button>
                <button className="cancel-button" type="button" onClick={() => navigate(`/seance/${patientId}/${traitementId}`)}>
                  Annuler
                </button>
            </div>
            
        </Form>
          </div>
        </div>
        </body>  
      );
    }