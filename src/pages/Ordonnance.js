import React, { useState } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';


export default function Ordonnance() {

  const [patientName, setPatientName] = useState('');
  const [ordonnance, setOrdonnance] = useState('');

  const [formData, setFormData] = useState({
    nom: '',
    ordonnancepara: ''
  });
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      // Generate the PDF
      const doc = new jsPDF();
      doc.text(formData.ordonnancepara, 10, 10); // Use the value from the text area
      const pdfBlob = doc.output('blob');
  
      // Download the PDF
      saveAs(pdfBlob, 'ordonnance.pdf');
    } catch (error) {
      // Handle any errors that occur during PDF generation or downloading
      console.error(error);
      // Display an error message to the user
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };
  
  

  return (
    <div>
      <h2>Ordonnance</h2>
      <form onSubmit={handleSubmit}>
        <label>Nom du patient</label>
        <input type="text" name="nom" value={formData.nom} onChange={handleInputChange} />
        <label>Ordonnance</label>
        <textarea name="ordonnancepara" value={formData.ordonnancepara} onChange={handleInputChange} />
        <button className="submit-button" type="submit">
          Enregistrer
        </button>
        <button className="cancel-button" type="button">
          Annuler
        </button>
      </form>
    </div>
  );
}  
