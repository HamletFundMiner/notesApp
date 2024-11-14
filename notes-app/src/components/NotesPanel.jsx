// src/components/NotesPanel.jsx

import React from 'react';
import './NotesPanel.css';

function NotesPanel({ note }) {
    return (
        <div className="notes-panel">
            <h3>Bloc de Notas</h3>
            <div className="note-content">
                {note ? (
                    <>
                        <h4>{note.titulo}</h4>
                        <div dangerouslySetInnerHTML={{ __html: note.contenido }} />
                    </>
                ) : (
                    <p>Selecciona una nota para verla o edítala aquí...</p>
                )}
            </div>
        </div>
    );
}

export default NotesPanel;
