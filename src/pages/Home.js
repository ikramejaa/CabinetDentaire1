import React ,{ useEffect, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import "../css/Home.css";


export default function Home() {
    const [patients, setPatients]=useState([]);
    useEffect(()=>{
        loadUsers();
    },[]);
    const loadUsers = async () => {
      try {
        const result = await axios.get("http://localhost:8080/getAll");
        setPatients(result.data);
      } catch (error) {
        console.error(error);
      }
    };
    const deletePatient=async(id)=>{
      await axios.delete(`http://localhost:8080/patient/${id}`)
      loadUsers();
    }

    

  return (
    <body className="body-home">
    <div className="container-home container">
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
      {
          patients.map((patient,id)=>(
            <tr>
            <th scope="row" key={id}>{id+1}</th>
            <td>{patient.nom}</td>
            <td>{patient.prenom}</td>
            <td>{patient.email}</td>
            <td>{patient.mobile}</td>
            <td>
                <Link to ={`/view/${patient.id} ` }className="view-home"></Link >
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
