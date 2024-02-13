import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/Korisnik.css";

const Korisnici = () => {
    const [korisnici, setKorisnici] = useState([]);
    const uloga = localStorage.getItem("uloga");
    const navigate = useNavigate();
    
    useEffect(() => {
        fetchKorisnici();
    }, []);

    const fetchKorisnici = async () => {
        try {
            const response = await axios.get("http://localhost:3001/api/korisnici/korisnici", {
                headers: {
                     Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setKorisnici(response.data);
        } catch (error) {
            console.error("Error occurred while fetching korisnici:", error);
        }
    };
        
    const handleToggleStatus = async (id, aktivan) => {
        try {
            await axios.put(`http://localhost:3001/api/korisnici/deaktiviraj/${id}`, { aktivan: !aktivan }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            fetchKorisnici();
        } catch (error) {
            console.error("Error occurred while toggling user status:", error);
        }
    };
    
    

    return (
        <div className="container">
            <h1 className="title">Korisnici</h1>
            <ul className="user-list">
                {korisnici.map((korisnik) => (
                <li key={korisnik._id} className="user-item">
                    {korisnik.korisnickoIme}{" "}
                    {uloga === "admin" && (
                    <button className="button" onClick={() => handleToggleStatus(korisnik._id, korisnik.aktivan)}>
                        {korisnik.aktivan ? 'Deaktiviraj' : 'Aktiviraj'}
                    </button>
                    )}
                </li>
                ))}
            </ul>
            <button className="button" onClick={() => navigate("/home")}>Back</button>
        </div>
    );
};

export default Korisnici;