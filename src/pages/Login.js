import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/Login.css';
import petiteImage from '../assets/s.jpg';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {

    event.preventDefault();


    if (!email.endsWith('@gmail.com')) {
        setErrorMessage('Email must end with @gmail.com');
        return;
      }




    try {
      // Appel au backend pour vérifier l'utilisateur
      const response = await axios.post('http://localhost:8080/user/signin', {
        email,
        password,
      });

      // Récupération du rôle de l'utilisateur depuis la réponse du backend
      const userRole = response.data

      // Redirection en fonction du rôle
      switch (userRole) {
        case 'medecin':
          navigate('/Medecin');
          break;
        case 'secretaire':
          navigate('/Secretaire');
          break;
        case 'patient':
          navigate('/Patient');
          break;
        default:
          navigate('/'); // Redirection par défaut vers la page d'accueil
          break;
      }
    } catch (error) {
        setErrorMessage('email/password not correct');
      // Gestion des erreurs, par exemple, afficher un message d'erreur à l'utilisateur
    }
  };

  return (
    
    <div className="login-container">
      
      
      <form className="login-form" onSubmit={handleSubmit}>
      <h2>Login</h2>
      {errorMessage && <p>{errorMessage}</p>}
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={email} onChange={handleEmailChange} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={handlePasswordChange} />
        </div>
        <button type="submit">Login</button><br></br>
        <label>Don't have account?
            <a href="/Register">Register</a>
            </label>
        <img src={petiteImage} alt="" className="bottom-image" />
        
    

                    
      </form>
    </div>
    
  );
};

export default Login;
