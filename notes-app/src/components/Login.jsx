// src/components/Login.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Agrega un archivo de estilo personalizado

function Login() {
    const [email, setEmail] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Verifica si el usuario ya está autenticado
        const userId = localStorage.getItem('userId');
        if (userId) {
            // Redirige a la página de inicio si ya hay un usuario logueado
            navigate('/home');
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();

        // Validación de formato de correo
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Por favor ingresa un correo electrónico válido.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/login', { email, contrasena }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 200) {
                // Guarda el userId en localStorage
                const usuario = response.data;
                localStorage.setItem('userId', usuario.id);
                localStorage.setItem('userEmail', usuario.email);

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
                <h1 className="app-title">Bloc de Notas</h1>
                <p className="app-subtitle">Inicia sesión o regístrate para empezar a organizar tus notas.</p>
                <form className="login-form" onSubmit={handleLogin}>
                    <label className="input-label">
                        Correo Electrónico:
                        <input
                            type="email"
                            className="input-field"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setError(''); // Limpiar el error al escribir de nuevo
                            }}
                            placeholder="Ingresa tu correo"
                        />
                    </label>
                    <label className="input-label">
                        Contraseña:
                        <input
                            type="password"
                            className="input-field"
                            value={contrasena}
                            onChange={(e) => {
                                setContrasena(e.target.value);
                                setError(''); // Limpiar el error al escribir de nuevo
                            }}
                            placeholder="Ingresa tu contraseña"
                        />
                    </label>
                    <button className="login-button" type="submit">Iniciar Sesión</button>
                </form>
                {error && <p className="error-message">{error}</p>}
                <p className="register-link">¿No tienes cuenta? <a href="/register">Regístrate aquí</a></p>
            </div>
        </div>
    );
}

export default Login;
