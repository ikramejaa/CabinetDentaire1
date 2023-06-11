import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/Register.css';
import moyeneImage from '../assets/log.jpg';

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Vérification de l'email
    if (!email.endsWith('@gmail.com')) {
      setErrorMessage('Email must end with @gmail.com');
      return;
    }

    // Vérification de la confirmation du mot de passe
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    try {
      // Envoi des données d'inscription au backend
      await axios.post('http://localhost:8080/user/signup', {
        firstName,
        lastName,
        email,
        password,
      });

      setRedirectToLogin(true);
    } catch (error) {
      setErrorMessage('email used already');
    }
  };

  if (redirectToLogin) {
    navigate('/Login');
  }

  return (
    <div className="register-container">
      
      <form onSubmit={handleSubmit} className="register-form">
      <h2>Sign Up</h2>
      {errorMessage && <p>{errorMessage}</p>}
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input type="text" id="firstName" value={firstName} onChange={handleFirstNameChange} />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input type="text" id="lastName" value={lastName} onChange={handleLastNameChange} />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={email} onChange={handleEmailChange} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={handlePasswordChange} />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </div>
        <button type="submit">Sign Up</button>
        <img src={moyeneImage} alt="" className="milieu-image" />
        <label >You already have account?
            <a href="/Login">Login</a>
            </label>
      </form>
    </div>
  );
};

export default SignUp;
