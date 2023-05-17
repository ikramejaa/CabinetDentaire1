import React, { useState } from 'react'
import "../css/addseance.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AddSeance() {

    let navigate = useNavigate();

    const [seance,setSeance]=useState({
        traitementid:"",
        patientid:"",
        montantrecu:"",
        ord_path:"",
        date:""
        });

    const{traitementid,patientid,montantrecu,ord_path,date}=seance;

    const onInputChange=(e)=>{
        setSeance({...seance,[e.target.name]:e.target.value});
    };

    const onSubmit=async(e)=>{
        e.preventDefault();
        await axios.post("http://localhost:8080/add",seance);
        navigate("/");
    }

    return (
        <div className="add-seance-container">
          <div className="add-seance-form">
            <h2>Ajouter une séance</h2>
            <form onSubmit={onSubmit}>
              <div className="form-row">
                <label>Traitement num</label>
                <input
                  type="text"
                  name="traitementid"
                  value={traitementid}
                  onChange={onInputChange}
                />
              </div>
              <div className="form-row">
                <label>Patient id</label>
                <input
                  type="text"
                  name="patientid"
                  value={patientid}
                  onChange={onInputChange}
                />
              </div>
              <div className="form-row">
                <label>Montant reçu</label>
                <input
                  type="text"
                  name="montantrecu"
                  value={montantrecu}
                  onChange={onInputChange}
                />
              </div>
              <div className="form-row">
                <label>Ord Path</label>
                <input
                  type="text"
                  name="ord_path"
                  value={ord_path}
                  onChange={onInputChange}
                />
              </div>
              <div className="form-row">
                <label>Date</label>
                <input
                  type="date"
                  name="date"
                  value={date}
                  onChange={onInputChange}
                />
              </div>
              <div className="button-row">
                <button className="submit-button" type="submit">
                  Enregistrer
                </button>
                <button className="cancel-button" type="button" onClick={() => navigate('/')}>
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    }