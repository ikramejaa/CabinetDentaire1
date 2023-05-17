import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePrescription, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import '../css/seances.css';
import { Link, useParams } from 'react-router-dom';

function formatDate(date) {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${year}-${month}-${day}`;
}

export default function Seances() {
  const [seances, setSeances] = useState([]);

  const {seanceid}=useParams();

  useEffect(() => {
    loadSeances();
  }, []);

  const loadSeances = async () => {
    const result = await axios.get('http://localhost:8080/seances');
    const formattedSeances = result.data.map((seance) => ({
      ...seance,
      date: formatDate(seance.date),
    }));
    setSeances(formattedSeances);
  };

  const deleteSeance=async(seanceid)=>{
    await axios.delete(`http://localhost:8080/seance/${seanceid}`);
    loadSeances();
  }

  return (
    <div>
      <div className="header">
        <h2>Seances</h2>
        <Link className="add-button" to="/addseance">
          +
        </Link>
      </div>
      <table className="table">
      <thead>
        <tr>
          <th className="seance-header" scope="col">Seance</th>
          <th className="montant-header" scope="col">Montant recu</th>
          <th className="date-header" scope="col">Date</th>
          <th className="actions-header" scope="col">Actions</th>
        </tr>
      </thead>

        <tbody>
          {seances.map((seance, index) => (
            <tr key={index}>
              <td className="seance-cell">{index+1}</td>
              <td className="montant-cell">{seance.montantrecu}</td>
              <td className="date-cell">{seance.date}</td>
              <td className="actions-cell">
                <Link className="actions-button">
                  <FontAwesomeIcon icon={faFilePrescription} />
                </Link>
                <Link className="actions-button" to={`/editseance/${seance.seanceid}`}>
                  <FontAwesomeIcon icon={faEdit} />
                </Link>
                <button className="actions-button delete-button" onClick={()=>deleteSeance(seance.seanceid)}>
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}  