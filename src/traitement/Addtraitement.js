import axios from "axios";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import {useNavigate, useParams } from "react-router-dom";
import "../css/AddPatient.css";


export default function Addtraitement() {
  let navigate = useNavigate();
  let { patientId } = useParams();


  const [traitement, settraitement] = useState({
    nom_traitement: "",
    total_paye: "",
    payment_recu: "",
    reste:""
  });

  const { nom_traitement, total_paye, payment_recu, reste} = traitement;

  const onInputChange = (e) => {
    settraitement({ ...traitement, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`http://localhost:8080/traitements/patient/${patientId}`, traitement);
    navigate(`/traitement/${patientId}`);
  };

  return (
    <body class="add-patient">
    <div className="container-add"> 
    <div className="add-form">
        <h3 className="titre-add">Ajouter un traitement</h3>

          <Form onSubmit={(e) => onSubmit(e)}>
            <Form.Group className="nom_traitement-add" controlId="nom_traitement">
              <Form.Label>Traitement:</Form.Label>
              <Form.Control type="text"  placeholder="Entrez le nom du traitement" name="nom_traitement" value={nom_traitement} onChange={(e)=>onInputChange(e)} />
            </Form.Group>

            <Form.Group className="total_paye-add" controlId="total_paye">
              <Form.Label>Total à payer:</Form.Label>
              <Form.Control type="text" placeholder="Total à payer" name="total_paye" value={total_paye} onChange={(e)=>onInputChange(e)} />
            </Form.Group>

            <Form.Group className="payment_recu-add" controlId="payment_recu">
              <Form.Label>Payement reçu :</Form.Label>
              <Form.Control type="text" placeholder="Payement reçu" name="payment_recu" value={payment_recu} onChange={(e)=>onInputChange(e)} />
            </Form.Group>

            <Form.Group className="reste-add" controlId="reste">
              <Form.Label>Le reste:</Form.Label>
              <Form.Control type="text" placeholder="Le reste à payer" name="reste" value={reste} onChange={(e)=>onInputChange(e)} />
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