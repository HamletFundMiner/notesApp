// src/components/Login.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Agrega un archivo de estilo personalizado

function Login() {
    const [claveAcceso, setClaveAcceso] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/login', claveAcceso, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(response);
            if (response.status === 200) {
                // Guarda el userId en localStorage
                const usuario = response.data;
                localStorage.setItem('userId', usuario.id);
                // Redirige a la página de inicio si el login es exitoso
                navigate('/home');
            }
        } catch (error) {
            if (error.response) {
                setError(error.response.data);
            } else {
                setError('Error inesperado, por favor intente nuevamente.');
            }
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <h1 className="app-title">Notes App</h1>
                <form className="login-form" onSubmit={handleLogin}>
                    <label className="input-label">
                        Clave de Acceso:
                        <input
                            type="text"
                            className="input-field"
                            value={claveAcceso}
                            onChange={(e) => setClaveAcceso(e.target.value)}
                        />
                    </label>
                    <button className="login-button" type="submit">Iniciar Sesión</button>
                </form>
                {error && <p className="error-message">{error}</p>}
            </div>
        </div>
    );
}

export default Login;

