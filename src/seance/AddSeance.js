import React, { useState } from 'react';
import "../css/AddPatient.css";
import { Form } from "react-bootstrap";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function AddSeance() {

    let navigate = useNavigate();

    const {patientId,traitementId}=useParams();


    const [seance,setSeance]=useState({
        montantrecu:"",
        date:""
        });

    const{montantrecu,date}=seance;

    const onInputChange=(e)=>{
        setSeance({...seance,[e.target.name]:e.target.value});
    };

    const onSubmit=async(e)=>{
        e.preventDefault();
        await axios.post(`http://localhost:8080/seances/patient/${patientId}/traitement/${traitementId}`,seance);
        navigate(`/Seance/${patientId}/${traitementId}`);
    }

    return (
      <body class="add-patient">
      <div className="container-add "> 
      <div className="add-form">
          <h3 className="titre-add">Ajouter une séance</h3>
  
            <Form onSubmit={(e) => onSubmit(e)}>
              <Form.Group className="montantrecu-add" controlId="montantrecu">
                <Form.Label>Le montant reçu :</Form.Label>
                <Form.Control type="text"  placeholder="Entrez le montant" name="montantrecu" value={montantrecu} onChange={(e)=>onInputChange(e)} />
              </Form.Group>
  
              <Form.Group className="date-add" controlId="date">
              <Form.Label>Date de la séance :</Form.Label>
              <Form.Control type="date" placeholder="Entrez la date" name="date" value={date} onChange={(e)=>onInputChange(e)} />
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