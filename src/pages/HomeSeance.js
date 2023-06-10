import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/HomeSeance.css';
import { Link, useNavigate, useParams } from 'react-router-dom';

function formatDate(date) {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${year}-${month}-${day}`;
}

export default function Seances() {
  const [seances, setSeances] = useState([]);
  const { patientId, traitementId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    loadSeances();
  }, []);

  const loadSeances = async () => {
    const result = await axios.get(`http://localhost:8080/seances/patient/${patientId}/traitement/${traitementId}`);
    const formattedSeances = result.data.map((seance) => ({
      ...seance,
      date: formatDate(seance.date),
    }));
    setSeances(formattedSeances);
  };

  const deleteSeance = async (id) => {
    await axios.delete(`http://localhost:8080/seance/${id}`);
    loadSeances();
  };

  const goBack = () => {
    navigate(`/traitement/${patientId}`); // Navigate back to the previous page
  };

  return (
    <body className="body-seance">
      <div className="container-seance">
        <h2>Seances</h2>
        <button className="back-button" onClick={goBack}></button>
        <Link className="add-button" to={`/Addseance/${patientId}/${traitementId}`}>
          +
        </Link>

        <div className="py-4">
          <table className="table-seance">
            <thead>
              <tr>
                <th scope="col">id</th>
                <th scope="col">Montant reçu</th>
                <th scope="col">Date</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
            {seances.map((seance) => (
  <tr key={seance.id}>
    <th scope="row">{seance.id}</th>
    <td>{seance.montantrecu}</td>
    <td>{seance.date}</td>
    <td>
      <Link
        to={`http://localhost:8080/ordonnances/${seance.id}/${patientId}/download`}
        className="ordonnance"
        target="_blank"
        download={`ordonnance_${seance.id}.pdf`}
      >
        Ordonnance
      </Link>
      <Link
        to={`/EditSeance/${seance.id}/${patientId}/${traitementId}`}
        className="edit-seance"
      ></Link>
      <button
        className="button-seance"
        onClick={() => deleteSeance(seance.id)}
      ></button>
    </td>
  </tr>
))}

            </tbody>
          </table>
        </div>
      </div>
    </body>
  );
}
