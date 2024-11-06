// src/components/Home.jsx

import React from 'react';
import Navbar from './Navbar';
import HierarchyNotesPanel from './HierarchyNotesPanel';
import NotesPanel from './NotesPanel';
import './Home.css';

function Home() {
    return (
        <div className="home-page">
            <Navbar />
            <div className="home-content">
                <HierarchyNotesPanel />
                <NotesPanel />
            </div>
        </div>
    );
}

export default Home;
