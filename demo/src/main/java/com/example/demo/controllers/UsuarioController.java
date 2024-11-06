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

    // Endpoint para iniciar sesión con clave de acceso
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody String claveAcceso) {
        Optional<Usuario> usuarioOptional = usuarioRepository.findByClaveAcceso(claveAcceso);
        if (usuarioOptional.isPresent()) {
            return ResponseEntity.ok(usuarioOptional.get());
        } else {
            return ResponseEntity.badRequest().body("Clave de acceso incorrecta");
        }
    }
}
