package com.loccar.locacao.controllers;

import com.loccar.locacao.dto.EntregaDTO;
import com.loccar.locacao.models.Entrega;
import com.loccar.locacao.services.EntregaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/entregas")
public class EntregaController {

    @Autowired
    private EntregaService entregaService;

    @PostMapping
    public ResponseEntity<Entrega> registrarEntrega(@RequestBody EntregaDTO dto) {
        Entrega novaEntrega = entregaService.registrarEntrega(dto);
        return ResponseEntity.ok(novaEntrega);
    }

    @PostMapping("/{contratoId}/confirmar")
    public ResponseEntity<Void> confirmarEntrega(@PathVariable Long contratoId, @RequestBody EntregaDTO dto) {
        dto.setContratoId(contratoId); // OK manter
        entregaService.confirmarEntrega(contratoId, dto); // ALTERE AQUI
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<List<Entrega>> listarTodas() {
        return ResponseEntity.ok(entregaService.listarTodas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Entrega> buscarEntrega(@PathVariable Long id) {
        return ResponseEntity.ok(entregaService.buscarEntrega(id));
    }

    @GetMapping("/contrato/{contratoId}")
    public ResponseEntity<Entrega> buscarPorContratoId(@PathVariable Long contratoId) {
        return ResponseEntity.ok(entregaService.buscarPorContratoId(contratoId));
    }
}