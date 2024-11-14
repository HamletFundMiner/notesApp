// src/components/Home.jsx

import React, { useState } from 'react';
import Navbar from './Navbar';
import HierarchyNotesPanel from './HierarchyNotesPanel';
import NotesPanel from './NotesPanel';
import './Home.css';

function Home() {
    const [selectedNote, setSelectedNote] = useState(null);

    const handleSelectNote = (nota) => {
        setSelectedNote(nota);
    };

    return (
        <div className="home-page">
            <Navbar />
            <div className="home-content">
                <HierarchyNotesPanel onSelectNote={handleSelectNote} />
                <NotesPanel note={selectedNote} />
            </div>
        </div>
    );
}

export default Home;
