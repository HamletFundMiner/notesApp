// src/main/java/com/tusnotas/notesapp/controller/UsuarioController.java

package com.example.demo.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.models.Usuario;
import com.example.demo.repository.UsuarioRepository;

import jakarta.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    // Endpoint para redirigir al login si no hay usuario activo
    @GetMapping("/")
    public ResponseEntity<String> home(HttpSession session) {
        Usuario usuarioActivo = (Usuario) session.getAttribute("usuarioActivo");
        if (usuarioActivo == null) {
            return ResponseEntity.status(302).header("Location", "/api/login").build();
        }
        return ResponseEntity.ok("Bienvenido, " + usuarioActivo.getNombre() + "!");
    }
    // Endpoint para iniciar sesión con email y contraseña
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Usuario loginRequest) {
        // Primero buscamos si el usuario con el correo proporcionado existe
        Optional<Usuario> usuarioOptional = usuarioRepository.findByEmail(loginRequest.getEmail());
    
        if (!usuarioOptional.isPresent()) {
            // Si el correo no está registrado, devolvemos un error correspondiente
            return ResponseEntity.badRequest().body("Correo no registrado");
        }
    
        Usuario usuario = usuarioOptional.get();
    
        // Si el correo existe, verificamos la contraseña
        if (!usuario.getContrasena().equals(loginRequest.getContrasena())) {
            // Si la contraseña es incorrecta, devolvemos un error correspondiente
            return ResponseEntity.badRequest().body("Contraseña incorrecta");
        }
    
        // Si todo está bien, retornamos el usuario
        return ResponseEntity.ok(usuario);
    }
}
