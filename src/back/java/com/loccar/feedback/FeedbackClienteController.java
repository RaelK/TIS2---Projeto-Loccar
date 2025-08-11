package com.loccar.feedback;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feedback")
@CrossOrigin(origins = "*") // Permite chamadas do frontend
public class FeedbackClienteController {

    @Autowired
    private FeedbackClienteService service;

    @PostMapping
    public ResponseEntity<FeedbackCliente> criarFeedback(@RequestBody FeedbackCliente feedback) {
        FeedbackCliente salvo = service.salvar(feedback);
        return ResponseEntity.status(HttpStatus.CREATED).body(salvo);
    }

    @GetMapping("/cliente/{id}")
    public ResponseEntity<List<FeedbackCliente>> listarPorCliente(@PathVariable Long id) {
        return ResponseEntity.ok(service.listarPorCliente(id));
    }

    @GetMapping("/contrato/{id}")
    public ResponseEntity<List<FeedbackCliente>> listarPorContrato(@PathVariable Long id) {
        return ResponseEntity.ok(service.listarPorContrato(id));
    }
}
