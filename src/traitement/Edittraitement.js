import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "../css/EditPatient.css";



export default function Edittraitement() {

  const {id,patientId}=useParams()

  const[traitement,settraitement]=useState([]);
  const navigate=useNavigate();

  useEffect(()=>{
    axios.get(`http://localhost:8080/traitements/${id}`)
    .then(res=> settraitement(res.data))
    .catch(err=> console.log(err))

},[id]);




const onSubmit=async(e)=>{
  e.preventDefault();
  axios.put(`http://localhost:8080/traitements/${id}`,traitement)
  .then(
    res=>{ 
      alert("data updated successfully!");
      navigate(`/traitements/${patientId}`)
    }
  )
}



  return (
    <body class="edit-patient">
    <div className="container-edit"> 
      <div className="edit-form">
          <h3 className="titre-edit">Modifier le traitement </h3>
          <Form onSubmit={(e) => onSubmit(e)}>

          <Form.Group className="nom_traitement-edit" controlId="nom_traitement">
              <Form.Label>Nom du traitement :</Form.Label>
              <Form.Control type="text"   name="nom_traitement" value={traitement.nom_traitement} onChange={(e)=>settraitement({...traitement,nom_traitement:e.target.value})} />
            </Form.Group>

            <Form.Group className="tptal_paye-edit" controlId="total_paye">
              <Form.Label>Total à payer:</Form.Label>
              <Form.Control type="text"  name="total_paye" value={traitement.total_paye} onChange={(e)=>settraitement({...traitement,total_paye:e.target.value})} />
            </Form.Group>

            <Form.Group className="payment_recu-edit" controlId="payment_recu">
              <Form.Label>Payement reçu :</Form.Label>
              <Form.Control type="text"  name="payment_recu" value={traitement.payment_recu} onChange={(e)=>settraitement({...traitement,payment_recu:e.target.value})} />
            </Form.Group>

            <Form.Group className="reste-edit" controlId="reste">
              <Form.Label>Le reste :</Form.Label>
              <Form.Control type="text"  name="reste" value={traitement.reste} onChange={(e)=>settraitement({...traitement,reste:e.target.value})}/>
            </Form.Group>
             
            <div className="button-row">
                <button className="submit-button" type="submit">
                  Enregistrer
                </button>
                <button className="cancel-button" type="button" onClick={() => navigate(`/traitement/${patientId}`)}>
                  Annuler
                </button>
            </div>
            
        </Form>
        </div>
      </div>
    </body>
  );
}