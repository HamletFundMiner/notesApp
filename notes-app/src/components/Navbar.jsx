// src/components/Navbar.jsx

import React, { useState } from 'react';
import './Navbar.css';

function Navbar() {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        // Aquí podrías manejar la lógica para buscar entre las notas
    };

    return (
        <nav className="navbar">
            <h2 className="navbar-title">Notes App</h2>
            <input
                type="text"
                className="search-bar"
                placeholder="Buscar notas..."
                value={searchTerm}
                onChange={handleSearch}
            />
        </nav>
    );
}

export default Navbar;
