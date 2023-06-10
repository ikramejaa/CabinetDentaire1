import React, { useState } from 'react';
import axios from 'axios';
import "../css/ordonnance.css"
import { useNavigate, useParams } from 'react-router-dom';

function Ordonnance() {
  const navigate = useNavigate();
  const { seanceId, patientId } = useParams();

  const [ordonnance, setOrdonnance] = useState({
    prescription: ''
  });

  const { prescription } = ordonnance;

  const handlePrescriptionChange = (event) => {
    setOrdonnance({ ...ordonnance, prescription: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post(`http://localhost:8080/ordonnances/${seanceId}/${patientId}`, ordonnance);
      console.log('Prescription enregistrée avec succès');
      navigate('/Medecinpage'); // Navigate to the desired page after successful submission
    } catch (error) {
      console.error('Une erreur s\'est produite lors de l\'enregistrement de la prescription', error);
    }
  };

  return (
    <div>
      <h5>Ordonnance</h5>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="label">Prescription:</label>
          <textarea className="textarea" name="prescription" value={prescription} onChange={handlePrescriptionChange} />
        </div>
        <button type="submit">Enregistrer la prescription</button>
      </form>
    </div>
  );
}

export default Ordonnance;
