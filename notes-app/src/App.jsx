// src/App.jsx

import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Register from './components/Register'; // Importar el nuevo componente Register

function App() {
  const usuarioActivo = localStorage.getItem('userId'); // Verificar si hay un usuario en localStorage
  
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={usuarioActivo ? <Navigate to="/home" /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> {/* Nueva ruta para el registro */}
        <Route path="/home" element={<Home/>} />
      </Routes>
    </Router>
  );
}

export default App;
