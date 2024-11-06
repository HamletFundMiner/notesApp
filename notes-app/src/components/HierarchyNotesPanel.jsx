// src/components/HierarchyNotesPanel.jsx

import React from 'react';
import './HierarchyNotesPanel.css';

function HierarchyNotesPanel() {
    return (
        <div className="hierarchy-notes-panel">
            <h3>Mis Notas</h3>
            <ul className="notes-list">
                <li>Nota 1</li>
                <li>Nota 2</li>
                <li>Nota 3</li>
                {/* Aquí podrías renderizar más notas */}
            </ul>
        </div>
    );
}

export default HierarchyNotesPanel;
