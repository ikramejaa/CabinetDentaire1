import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import '../css/HomeTraitement.css';

export default function Hometraitement() {
  const { patientId } = useParams();
  const [traitements, setTraitement] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadTraitement();
  }, []);

  const loadTraitement = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/traitements/patient/${patientId}`);
      const traitementsData = response.data;
      setTraitement(traitementsData);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTraitement = async (id) => {
    await axios.delete(`http://localhost:8080/traitements/${id}`);
    loadTraitement();
  };

  const goBack = () => {
    navigate('/'); // Navigate back to the previous page
  };

  return (
    <body className="body-treatment">
      <div className="container-treatment">
        <h2>traitements</h2>
        <button className="back-button" onClick={goBack}></button>
        <Link className="add-button" to={`/Addtraitement/${patientId}`}>
          +
        </Link>

        <div className="py-4">
          <table className="table-treatment">
            <thead>
              <tr>
                <th scope="col">id</th>
                <th scope="col">Traitement</th>
                <th scope="col">Total à payer</th>
                <th scope="col">Payement reçu</th>
                <th scope="col">Le reste</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {traitements.map((traitement) => (
                <tr key={traitement.id}>
                  <th scope="row">{traitement.id}</th>
                  <td>{traitement.nom_traitement}</td>
                  <td>{traitement.total_paye}</td>
                  <td>{traitement.payment_recu}</td>
                  <td>{traitement.reste}</td>
                  <td>
                    <Link to={`/Seance/${patientId}/${traitement.id}`} className="view-treatment"></Link>
                    <Link to={`/Edittraitement/${traitement.id}/${patientId}`} className="edit-treatment"></Link>
                    <button className="button-treatment" onClick={() => deleteTraitement(traitement.id)}></button>
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
