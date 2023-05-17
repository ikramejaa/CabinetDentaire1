import React, { useEffect, useState } from 'react'
import "../css/addseance.css"
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditSeance() {

    let navigate = useNavigate();

    const{id: seanceid}=useParams();

    const [seance,setSeance]=useState({
        montantrecu:"",
        date:""
        });

    const{montantrecu,date}=seance;

    const onInputChange=(e)=>{
        setSeance({...seance,[e.target.name]:e.target.value});
    };

    useEffect(()=>{
      loadSeance()
    },[]);

    const onSubmit=async(e)=>{
        e.preventDefault();
        await axios.put(`http://localhost:8080/seance/${seanceid}`,seance);
        navigate("/");
    }

    const loadSeance = async()=>{
      console.log(seanceid); // log the value of seanceid
      const result =await axios.get(`http://localhost:8080/seance/${seanceid}`);
      setSeance(result.data);
    }
    

    return (
        <div className="add-seance-container">
          <div className="add-seance-form">
            <h2>Modifier la séance</h2>
            <form onSubmit={onSubmit}>                
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