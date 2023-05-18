import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Addtraitement() {
  let navigate = useNavigate();

  const [traitement, settraitement] = useState({
    traitement: "",
    total_paye: "",
    payment_recu: "",
    reste:""
  });

  const { Traitement, total_paye, payment_recu, reste} = traitement;

  const onInputChange = (e) => {
    settraitement({ ...traitement, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/traitement", traitement);
    navigate("/");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Inscrire Traitement</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="traitement" className="form-label">
                Traitement
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Entrer traitement"
                name="traitement"
                value={Traitement}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="total_paye" className="form-label">
               Total Paye
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Entrer total paye"
                name="total_paye"
                value={total_paye}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="payment_recu" className="form-label">
                Payment Recu
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Entrer  payment recu"
                name="payment_recu"
                value={payment_recu}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="reste " className="form-label">
                Reste
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Entrer Reste"
                name="reste"
                value={reste}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <button type="submit" className="btn btn-outline-primary">
              Enregistrer
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/">
              Annuler
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}