// src/components/Navbar.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar({ onSelectNote }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showUserDropdown, setShowUserDropdown] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Obtiene el correo del usuario desde localStorage
        const email = localStorage.getItem('userEmail');
        if (email) {
            setUserEmail(email);
        }
    }, []);

    const handleSearch = async (e) => {
        const value = e.target.value;
        setSearchTerm(value);
    
        if (value.trim() === '') {
            setSearchResults([]);
            return;
        }
    
        const userId = localStorage.getItem('userId');
    
        try {
            const response = await axios.get(`http://localhost:8080/api/notas/search`, {
                params: {
                    userId: userId,
                    keyword: value
                }
            });
            setSearchResults(response.data);
        } catch (error) {
            console.error('Error al buscar las notas:', error);
        }
    };
    

    const toggleUserDropdown = () => {
        setShowUserDropdown((prev) => !prev);
    };

    const handleLogout = () => {
        // Borra el userId y el email del localStorage
        localStorage.removeItem('userId');
        localStorage.removeItem('userEmail');
        // Redirige al usuario a la página de login
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <h2 className="navbar-title">Notes App</h2>
                <div className="search-container">
                    <input
                        type="text"
                        className="search-bar"
                        placeholder="Buscar notas..."
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    {searchResults.length > 0 && (
                        <ul className="search-results">
                            {searchResults.map((nota) => (
                                <li
                                    key={nota.id}
                                    onClick={() => {
                                        onSelectNote(nota);
                                        setSearchTerm('');
                                        setSearchResults([]);
                                    }}
                                >
                                    <strong>{nota.titulo}</strong> - {new Date(nota.createdAt).toLocaleDateString()}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="user-info">
                    {userEmail && <p className="user-greeting">Hola, {userEmail}</p>}
                </div>
                <div className="user-menu" style={{ position: 'relative' }}>
                    <button className="user-button" onClick={toggleUserDropdown}>👤</button>
                    {showUserDropdown && (
                        <div className="user-dropdown floating-dropdown" style={{ position: 'absolute', top: '100%', right: '0', zIndex: 1000 }}>
                            <ul>
                                <li onClick={handleLogout}>Log Out</li>
                                <li>Settings</li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
