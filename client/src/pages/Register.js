
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/Register.css';

const Register = () => {
  const [korisnickoIme, setKorisnickoIme] = useState('');
  const [email, setEmail] = useState('');
  const [lozinka, setLozinka] = useState('');
  const [potvrdiLozinku, setPotvrdiLozinku] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (lozinka !== potvrdiLozinku) {
        alert('Lozinka i potvrda lozinke se ne podudaraju. Molimo unesite iste lozinke.');
        return;
    }
    try {
      await axios.post('http://localhost:3001/api/korisnici/register', {
        korisnickoIme,
        email,
        lozinka,
      });
      navigate('/login');
    } catch (error) {
      console.error('Error occurred during registration:', error);
    }
  };

  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <div className='register-container'>
      <h1 className='register-title'>Registracija</h1>
      <input className='register-input'
        type="text" placeholder="Korisničko ime"
        value={korisnickoIme}
        onChange={(e) => setKorisnickoIme(e.target.value)} />
      <input className='register-input'
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input className='register-input'
        type="password"
        placeholder="Lozinka"
        value={lozinka}
        onChange={(e) => setLozinka(e.target.value)}
      />
      <input className='register-input'
        type="password"
        placeholder="Potvrdite lozinku"
        value={potvrdiLozinku}
        onChange={(e) => setPotvrdiLozinku(e.target.value)}
      />
      <button className='register-button' onClick={handleRegister}>Registracija</button>
      <button className='login-button' onClick={goToLogin}>Idi na login</button>
    </div>
  );
};

export default Register;
