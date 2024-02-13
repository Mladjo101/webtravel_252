import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/PutovanjeDodaj.css';

const Putovanja = () => {
    const clear = {
        naziv: '',
        slika: '',
        opis: '',
        kategorija: '',
        polazak: '',
        povratak: ''
    }

    const [putovanje, setPutovanje] = useState([]);
    
    const [newPutovanje, setNewPutovanje] = useState({
        naziv: '',
        slika: '',
        opis: '',
        kategorija: '',
        polazak: '',
        povratak: ''
    });
    const uloga = localStorage.getItem('uloga');
    const navigate = useNavigate();



    useEffect(() => {
        svaPutovanja();
    }, []);

    const svaPutovanja = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/putovanja');
            setPutovanje(response.data);
        } catch (error) {
            console.error('Error fetching putovanje', error);
        }
    };
    
    const handlePromjenaUnosa = (event) => {
        const { name, value } = event.target;
        setNewPutovanje({ ...newPutovanje, [name]: value });
    };
    
    
    const dodajPutovanje = async () => {
        if (Object.values(newPutovanje).some(value => value === '')) {
            alert('Please fill out all fields.');
            return;
        }
        try {
            const token = await localStorage.getItem('token');
            await axios.post('http://localhost:3001/api/putovanja/dodaj', newPutovanje, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setNewPutovanje(clear);
            alert('Putovanje uspješno dodano');
        } catch (error) {
            console.error('Error adding new trip', error);
        }
    };

    return (
        <div className="trip-form-container">
          <h2>Dodaj putovanje</h2>
          <form onSubmit={dodajPutovanje}>
            <div className="form-group">
              <label htmlFor="naziv">Destinacija:</label>
              <input className='input-style'
                type="text"
                name="naziv"
                value={newPutovanje.naziv}
                onChange={handlePromjenaUnosa}
              />
            </div>
            <div className="form-group">
              <label htmlFor="slika">Slika URL:</label>
              <input className='input-style'
                type="text"
                name="slika"
                value={newPutovanje.slika}
                onChange={handlePromjenaUnosa}
              />
            </div>
            <div className="form-group">
              <label htmlFor="opis">Opis:</label>
              <textarea className='input-style'
                name="opis"
                value={newPutovanje.opis}
                onChange={handlePromjenaUnosa}
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="kategorija">Kategorija:</label>
                <select
                    className='input-style'
                    name="kategorija"
                    value={newPutovanje.kategorija}
                    onChange={handlePromjenaUnosa}
                >
                    <option value="more">More</option>
                    <option value="planine">Planine</option>
                    <option value="gradovi">Gradovi</option>
                    <option value="avantura">Avantura</option>
                </select>
            </div>
            <div className="form-group">
              <label htmlFor="polazak">Polazak:</label>
              <input className='input-style'
                type="date"
                name="polazak"
                value={newPutovanje.polazak}
                onChange={handlePromjenaUnosa}
              />
            </div>
            <div className="form-group">
              <label htmlFor="povratak">Povratak:</label>
              <input className='input-style'
                type="date"
                name="povratak"
                value={newPutovanje.povratak}
                onChange={handlePromjenaUnosa}
              />
            </div>
            <button className='dugme' type="submit">Dodaj putovanje</button>
          </form>
          <br/>
          <button className='dugme' onClick={() => navigate('/home')}>Back to Home</button>
        </div>
      );
    
}
export default Putovanja;