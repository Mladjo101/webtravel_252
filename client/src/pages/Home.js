import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/Putovanje.css';

const Home = () => {


    useEffect(() => {
          svaPutovanja();
    }, []);
   
    const navigate = useNavigate();
    const [putovanja, setPutovanja] = useState([]);
    const token = localStorage.getItem('token');
    const uloga = localStorage.getItem('uloga');
    
    
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('uloga');
        navigate('/login');
    };

    const svaPutovanja = async () => {
        try {
          const response = await axios.get('http://localhost:3001/api/putovanja');
          setPutovanja(response.data);
        } catch (error) {
          console.error('Error fetching', error);
        }
      };
    
    const obrisiPutovanje = async (putovanjeId) => {
        try {
            const token = await localStorage.getItem('token');
            await axios.delete(`http://localhost:3001/api/putovanja/${putovanjeId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            svaPutovanja(); 
        } catch (error) {
            console.error('Error deleting putovanje', error);
        }
    };

    const odaberiPutovanje = async (putovanjeId) => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.post(
            `http://localhost:3001/api/putovanja/odaberi/${putovanjeId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          
          alert('Uspjesno ste se prijavili na putovanje');
        } catch (error) {
          console.error('Error joining trip:', error);
        }
      };
      
    
    
    return (
        <div>
        <h1>Home</h1>
        <button className='komande' onClick={handleLogout}>Logout</button>
        {uloga === 'admin' && (
            <>
            <button className='komande' onClick={() => navigate('/korisnici')}>Upravljanje Korisnicima</button>
            <button className='komande' onClick={() => navigate('/putovanja')}>Upravljanje Putovanjima</button>
            </>
        )}
            <div className="putovanje-container">
            {putovanja.map(putovanje => (
                <div className="putovanje-card" key={putovanje._id}>
                    <img src={putovanje.slika} alt={putovanje.naziv} />
                    <div>
                    <h2>{putovanje.naziv}</h2>
                    <p>{putovanje.opis}</p>
                    <p>Kategorija: {putovanje.kategorija}</p>
                    <p>Polazak: {new Date(putovanje.polazak).toLocaleDateString()}</p>
                    <p>Povratak: {new Date(putovanje.povratak).toLocaleDateString()}</p>
                    </div>
                    {uloga === 'admin' && <> <button className='dugme-delete' onClick={() => obrisiPutovanje(putovanje._id)}>Obrisi</button></>}
                    {uloga === 'user' && <button className='dugme-join' onClick={() => odaberiPutovanje(putovanje._id)}>Odaberi</button>}
                    
                    
                </div>
            ))}
            </div>
        </div>
    );
};

export default Home;
