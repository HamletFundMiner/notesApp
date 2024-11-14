// src/components/Register.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css'; // Archivo de estilos CSS

function Register() {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [confirmarContrasena, setConfirmarContrasena] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        if (contrasena !== confirmarContrasena) {
            setError('Las contraseñas no coinciden');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/register', {
                nombre,
                email,
                contrasena,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.status === 201) {
                // Registro exitoso, redirigir al login
                localStorage.setItem('userId', response.data.id);
                localStorage.setItem('userEmail', usuario.email);

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
        <div className="register-page">
            <div className="register-container">
                <h1 className="app-title">Bloc de Notas</h1>
                <p className="app-subtitle">Inicia sesión o regístrate para empezar a organizar tus notas.</p>
                <form className="register-form" onSubmit={handleRegister}>
                    <h2 className="register-title">Regístrate</h2>
                    <label className="input-label">
                        Nombre de usuario:
                        <input
                            type="text"
                            className="input-field"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            placeholder="Elige un nombre de usuario"
                            required
                        />
                    </label>
                    <label className="input-label">
                        Correo Electrónico:
                        <input
                            type="email"
                            className="input-field"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Tu correo electrónico"
                            required
                        />
                    </label>
                    <label className="input-label">
                        Contraseña:
                        <input
                            type="password"
                            className="input-field"
                            value={contrasena}
                            onChange={(e) => setContrasena(e.target.value)}
                            placeholder="Elige una contraseña"
                            required
                        />
                    </label>
                    <label className="input-label">
                        Confirmar Contraseña:
                        <input
                            type="password"
                            className="input-field"
                            value={confirmarContrasena}
                            onChange={(e) => setConfirmarContrasena(e.target.value)}
                            placeholder="Confirma tu contraseña"
                            required
                        />
                    </label>
                    <button className="register-button" type="submit">Registrar</button>
                </form>
                {error && <p className="error-message">{error}</p>}
                <p className="login-link">¿Ya tienes cuenta? <a href="/login">Inicia sesión</a></p>
            </div>
        </div>
    );
}

export default Register;
