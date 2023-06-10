import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../css/informationspatient.css';
import { useNavigate, useParams } from 'react-router-dom';

export default function Informationspatient() {

    const [patients, setPatients]=useState([]);

    const {patientId}=useParams();

    const navigate = useNavigate();

    useEffect(() => {
        loadPatients();
      }, []);
    
      const loadPatients = async () => {
  try {
    const response = await axios.get(`http://localhost:8080/patients/${patientId}`);
    const patientData = response.data; // Assuming the response is a single patient object
    setPatients([patientData]); // Wrap the patient object in an array
  } catch (error) {
    console.error(error);
  }
};



  return (
    <div>
         <body className="informations-body-home">
    <div className="informations-home container">
    <h4>Informations du Patient</h4>
        <div className='py-4'>
        <table className="informations-table-home ">
  <thead>
    <tr>
      <th scope="col">Nom</th>
      <th scope="col">Prénom</th>
      <th scope="col">Maladies</th>
      <th scope="col">Assurance</th>
    </tr>    
  </thead>
  <tbody>
          {patients.map((patient,id)=>(
            <tr key={id}>
            <td>{patient.nom}</td>
            <td>{patient.prenom}</td>
            <td>{patient.maladies}</td>
            <td>{patient.assurance}</td>
          </tr>

          ))
          }
  </tbody>
</table>
        </div>
    </div>
    </body>
        
    </div>
  )
}
