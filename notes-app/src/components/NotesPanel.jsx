// src/components/NotesPanel.jsx

import React, { useState, useEffect } from 'react';
import './NotesPanel.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function NotesPanel({ note, onCreateNote }) {
    const [editedTitle, setEditedTitle] = useState(note ? note.titulo : '');
    const [editedContent, setEditedContent] = useState(note ? note.contenido : '');
    const [isContentChanged, setIsContentChanged] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (note) {
            setEditedTitle(note.titulo);
            setEditedContent(note.contenido);
            setIsContentChanged(false);
        }
    }, [note]);

    const handleTitleChange = (e) => {
        setEditedTitle(e.target.value);
        setIsContentChanged(e.target.value !== (note ? note.titulo : '') || editedContent !== (note ? note.contenido : ''));
    };

    const handleContentChange = (e) => {
        setEditedContent(e.target.value);
        setIsContentChanged(e.target.value !== (note ? note.contenido : '') || editedTitle !== (note ? note.titulo : ''));
    };

    const handleSave = async () => {
        if (note) {
            try {
                const response = await axios.put(`http://localhost:8080/api/notas/edit/${note.id}`, {
                    titulo: editedTitle,
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

    const handleCreate = async () => {
        // Obtén el userId de localStorage
        const userId = localStorage.getItem('userId');
        if (!userId) {
            console.error('No se encontró el userId en localStorage');
            return;
        }

        try {
            const response = await axios.post(`http://localhost:8080/api/notas/create`, {
                titulo: 'Nota Nueva',
                contenido: ''
            }, {
                params: { userId: parseInt(userId, 10) },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 200) {
                alert('Nota creada exitosamente');
                // Ejecuta el callback onCreateNote para actualizar el HierarchyNotesPanel y seleccionar la nueva nota
                onCreateNote(response.data);
            }
        } catch (error) {
            console.error('Error al crear la nota:', error);
            alert('Hubo un error al crear la nota, por favor intenta nuevamente.');
        }
    };

    return (
        <div className="notes-panel">
            <h3>Bloc de Notas</h3>
            <div className="note-actions">
                <button onClick={handleCreate} className="create-button">Crear Nota</button>
                <button onClick={handleSave} disabled={!isContentChanged} className="save-button">Guardar</button>
                <button onClick={handleDelete} className="delete-button">Eliminar</button>
            </div>

            <div className="note-content">
                {note ? (
                    <>
                        <input
                            type="text"
                            value={editedTitle}
                            onChange={handleTitleChange}
                            className="note-title-input"
                        />
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
