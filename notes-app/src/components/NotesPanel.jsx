// src/components/NotesPanel.jsx

import React from 'react';
import './NotesPanel.css';

function NotesPanel() {
    return (
        <div className="notes-panel">
            <h3>Bloc de Notas</h3>
            <div className="note-content">
                {/* Aquí puedes mostrar una nota seleccionada o permitir la creación de nuevas notas */}
                <p>Selecciona una nota para verla o edítala aquí...</p>
            </div>
        </div>
    );
}

export default NotesPanel;
