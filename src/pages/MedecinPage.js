import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHospital } from '@fortawesome/free-solid-svg-icons';
import { faExclamationCircle  } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import '../css/Medecinpage.css'

function MedecinPage() {
  const [seances, setSeances] = useState([]);

  function formatDate(date) {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  }


  useEffect(() => {
    loadSeances();
  }, []);

  const loadSeances = async () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];
    const result = await axios.get(`http://localhost:8080/seances/date/${formattedDate}`);
        const formattedSeances = result.data.map((seance) => ({
      ...seance,
      date: formatDate(seance.date),
    }));
    setSeances(formattedSeances);
  };

  return (
    <div className='medecin-container'>
      <h3>Séances Aujourd'hui</h3>
      <table className="table-home ">
        <thead>
            <tr>
                <th scope="col">id</th>
                <th scope="col">Montant reçu </th>
                <th scope="col">Date</th>
                <th scope="col">Ordonnance</th>
                <th scope="col">Actions</th>
            </tr>    
        </thead>
        <tbody> 
            {seances.map((seance)=>(
            <tr key={seance.id}>
                <th scope="row">{seance.id}</th>
                <td>{seance.montantrecu}</td>
                <td>{seance.date}</td>
                <td>
                <Link to={`/Ordonnance/${seance.id}/${seance.patient.id}`} className="ordonnance">
                  <FontAwesomeIcon icon={faHospital} />
                </Link>
                </td>
                <td>
                <Link to={`/Informationspatient/${seance.patient.id}`} className="Informations">
                  <FontAwesomeIcon icon={faExclamationCircle}  style={{ color: 'red' }}/>
                </Link>
                </td>
            </tr>

            ))
            }
        </tbody>
      </table>
    </div>
  );
}  

export default MedecinPage;
