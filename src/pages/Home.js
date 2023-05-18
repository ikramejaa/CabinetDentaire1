import React, { useState, useEffect } from 'react';
import axios from "axios";
import {Link} from "react-router-dom";

export default function Home() {
  const [traitements, settraitements] = useState([]);

  useEffect(() => {
    loadtraitements();
  }, []);

  const loadtraitements = async () => {
    const result = await axios.get("http://localhost:8080/traitements");
    settraitements(result.data);
  };

  const deletetraitement = async (id) => {
    await axios.delete(`http://localhost:8080/traitement/${id}`);
    loadtraitements();
  };
  

  return (
    <div className='container'>
      <div className='py-4 d-flex justify-content-between align-items-center'>
        <h1>Liste des Traitements</h1>

        <Link button className='btn btn-outline-primary' to="/Addtraitement">
          Ajouter Traitement
          </Link>
      </div>

      <table className='table border shadow'>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Traitement</th>
            <th scope='col'>Total Paye</th>
            <th scope='col'>Paiement Recu</th>
            <th scope='col'>Reste</th>
            <th scope='col'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {traitements.map((traitement, index) => (
            <tr key={index}>
              <th scope='row'>{index + 1}</th>
              <td>{traitement.traitement}</td>
              <td>{traitement.total_paye}</td>
              <td>{traitement.payment_recu}</td>
              <td>{traitement.reste}</td>
              <td>
                
                <Link 
                className='btn btn-outline-primary mx-2'
                to={`/Edittraitement/${traitement.id}`}
                >
                  Edit
                </Link>
                <button className='btn btn-danger mx-2'
                onClick={()=>deletetraitement(traitement.id)}
                >
                  Delete
                  </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
