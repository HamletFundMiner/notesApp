// src/components/Home.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import HierarchyNotesPanel from './HierarchyNotesPanel';
import NotesPanel from './NotesPanel';
import './Home.css';

function Home() {
    const [selectedNote, setSelectedNote] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Verifica si el usuario no está autenticado
        const userId = localStorage.getItem('userId');
        if (!userId) {
            // Redirige al login si no hay un usuario logueado
            navigate('/login');
        }
    }, [navigate]);

    const handleSelectNote = (nota) => {
        setSelectedNote(nota);
    };

    return (
        <div className="home-page" >
            <Navbar className="nav-bar" onSelectNote={handleSelectNote} />
            <div className="home-content">
                <HierarchyNotesPanel onSelectNote={handleSelectNote} />
                <NotesPanel note={selectedNote} />
            </div>
        </div>
    );
}

export default Home;
