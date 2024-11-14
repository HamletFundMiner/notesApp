package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.models.Nota;
import com.example.demo.models.Usuario;
import com.example.demo.repository.NotaRepository;
import com.example.demo.repository.UsuarioRepository;

@RestController
@RequestMapping("/api/notas")
public class NotaController {

    @Autowired
    private NotaRepository notaRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    // Endpoint para obtener las notas de un usuario
    @GetMapping("/{userId}")
    public ResponseEntity<List<Nota>> getNotasByUser(@PathVariable Long userId) {
        Usuario usuario = usuarioRepository.findById(userId).orElse(null);
        if (usuario == null) {
            return ResponseEntity.badRequest().build();
        }        System.out.println("usuario" + usuario);

        List<Nota> notas = notaRepository.findByOwnerId(usuario.getId());
        System.out.println("Notas" + notas);
        for (Nota nota : notas) {
            System.out.println(nota.getId() + " - " + nota.getTitulo());
        }
        return ResponseEntity.ok(notas);
    }


       @GetMapping("/search")
    public ResponseEntity<List<Nota>> searchNotas(@RequestParam String term) {
        List<Nota> notas = notaRepository.findByTituloOrContenido(term);
        return ResponseEntity.ok(notas);
    }
    
}