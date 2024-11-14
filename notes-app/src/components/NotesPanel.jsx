// src/components/NotesPanel.jsx

import React, { useState, useEffect } from 'react';
import './NotesPanel.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function NotesPanel({ note }) {
    const [editedContent, setEditedContent] = useState(note ? note.contenido : '');
    const [isContentChanged, setIsContentChanged] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (note) {
            setEditedContent(note.contenido);
            setIsContentChanged(false);
        }
    }, [note]);

    const handleContentChange = (e) => {
        setEditedContent(e.target.value);
        setIsContentChanged(e.target.value !== (note ? note.contenido : ''));
    };

    const handleSave = async () => {
        if (note) {
            try {
                const response = await axios.put(`http://localhost:8080/api/notas/edit/${note.id}`, {
                    titulo: note.titulo,
                    contenido: editedContent
                });
                if (response.status === 200) {
                    alert('Nota actualizada exitosamente');
                    setIsContentChanged(false);
                    window.location.reload();
                }
            } catch (error) {
                console.error('Error al actualizar la nota:', error);
                alert('Hubo un error al actualizar la nota, por favor intenta nuevamente.');
            }
        }
    };

    const handleDelete = async () => {
        if (note) {
            const confirmDelete = window.confirm('¿Seguro de borrar esta nota?');
            if (confirmDelete) {
                try {
                    const response = await axios.delete(`http://localhost:8080/api/notas/delete/${note.id}`);
                    if (response.status === 204) {
                        alert('Nota eliminada exitosamente');
                        window.location.reload();
                    }
                } catch (error) {
                    console.error('Error al eliminar la nota:', error);
                    alert('Hubo un error al eliminar la nota, por favor intenta nuevamente.');
                }
            }
        }
    };

    return (
        <div className="notes-panel">
            <h3>Bloc de Notas</h3>
            <div className="note-actions">
                <button onClick={handleSave} disabled={!isContentChanged}>Save</button>
                <button onClick={handleDelete}>Delete</button>
            </div>
            <div className="note-content">
                {note ? (
                    <>
                        <h4>{note.titulo}</h4>
                        <textarea
                            value={editedContent}
                            onChange={handleContentChange}
                            className="note-textarea full-width-textarea"
                        />
                    </>
                ) : (
                    <p>Selecciona una nota para verla o edítala aquí...</p>
                )}
            </div>
        </div>
    );
}

export default NotesPanel;
