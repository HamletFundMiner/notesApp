import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './HierarchyNotesPanel.css';

function HierarchyNotesPanel({ onSelectNote }) {
    const [notas, setNotas] = useState([]);
    const [notaSeleccionada, setNotaSeleccionada] = useState(null);

    useEffect(() => {
        // Obtén el userId de localStorage
        const userId = localStorage.getItem('userId');
        if (!userId) {
            console.error('No se encontró el userId en localStorage');
            return;
        }

        // Llama al endpoint para obtener las notas del usuario
        const fetchNotas = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/notas/${userId}`);
                // Ordenar las notas por updatedAt, las más recientes primero
                const notasOrdenadas = response.data.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
                setNotas(notasOrdenadas);
            } catch (error) {
                console.error('Error al obtener las notas:', error);
            }
        };

        // Llamada inicial para obtener las notas
        fetchNotas();

        // Configura un intervalo para obtener las notas cada 3 minutos
        const intervalId = setInterval(fetchNotas, 3 * 60 * 1000);

        // Limpia el intervalo cuando el componente se desmonta
        return () => clearInterval(intervalId);
    }, []);

    const handleSelectNote = (nota) => {
        setNotaSeleccionada(nota.id);
        onSelectNote(nota);
    };

    return (
        <div className="hierarchy-notes-panel">
            <h3>Mis Notas</h3>
            <ul className="notes-list">
                {notas.length > 0 ? (
                    notas.map((nota) => (
                        <li
                            key={nota.id}
                            onClick={() => handleSelectNote(nota)}
                            className={notaSeleccionada === nota.id ? 'selected-note' : ''}
                        >
                            {nota.titulo}
                        </li>
                    ))
                ) : (
                    <p>No hay notas disponibles</p>
                )}
            </ul>
        </div>
    );
}

export default HierarchyNotesPanel;
