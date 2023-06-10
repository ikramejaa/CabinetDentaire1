import React ,{ useEffect, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import "../css/HomePatient.css";


export default function HomePatient() {
    const [patients, setPatients]=useState([]);

    useEffect(()=>{
        loadPatients();
    },[]);
    const loadPatients = async () => {
      try {
        const response = await axios.get("http://localhost:8080/patients");
        const patientsData = response.data;
        setPatients(patientsData);
      } catch (error) {
        console.error(error);
      }
    };
    const deletePatient=async(id)=>{
      await axios.delete(`http://localhost:8080/patients/${id}`)
      loadPatients();
    }

    

  return (
    <body className="body-home">
    <div className="container-home container">
    <h2>Patients</h2>
    <Link className="add-button" to="/Addpatient">
          +
    </Link>
        <div className='py-4'>
        <table className="table-home ">
  <thead>
    <tr>
      <th scope="col">id</th>
      <th scope="col">Nom</th>
      <th scope="col">Prénom</th>
      <th scope="col">E-mail</th>
      <th scope="col">Mobile</th>
      <th scope="col">Actions</th>
    </tr>    
  </thead>
  <tbody>
          {patients.map((patient,id)=>(
            <tr key={id}>
            <th scope="row">{id+1}</th>
            <td>{patient.nom}</td>
            <td>{patient.prenom}</td>
            <td>{patient.email}</td>
            <td>{patient.mobile}</td>
            <td>
                <Link to ={`/traitement/${patient.id} ` }className="view-home"></Link >
                <Link to ={`/edit/${patient.id} ` } className="edit-home"></Link >
                <button   className="button-home"
                onClick={()=>deletePatient(patient.id)}></button>
            </td>
          </tr>

          ))
          }
  </tbody>
</table>
        </div>
    </div>
    </body>

  );
  
}
