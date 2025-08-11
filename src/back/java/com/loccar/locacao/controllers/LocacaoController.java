package com.loccar.locacao.controllers;

import com.loccar.locacao.dto.EntregaDTO;
import com.loccar.locacao.models.Contrato;
import com.loccar.locacao.models.Entrega;
import com.loccar.locacao.services.LocacaoService;

import jakarta.validation.Valid;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/locacao")
public class LocacaoController {

    private final LocacaoService locacaoService;

    public LocacaoController(LocacaoService locacaoService) {
        this.locacaoService = locacaoService;
    }

    @PostMapping("/contrato")
    public ResponseEntity<Contrato> criarContrato(@RequestBody @Valid com.loccar.locacao.dto.ContratoDTO dto) {
        return ResponseEntity.ok(locacaoService.criarContrato(dto));
    }

    @GetMapping("/contrato/{id}")
    public ResponseEntity<Contrato> buscarContrato(@PathVariable Long id) {
        return ResponseEntity.ok(locacaoService.buscarContrato(id));
    }

    @PostMapping("/entrega")
    public ResponseEntity<Entrega> registrarEntrega(@RequestBody @Valid EntregaDTO dto) {
        return ResponseEntity.ok(locacaoService.registrarEntrega(dto));
    }

    @GetMapping("/entrega/{id}")
    public ResponseEntity<Entrega> buscarEntrega(@PathVariable Long id) {
        return ResponseEntity.ok(locacaoService.buscarEntrega(id));
    }

    @GetMapping("/entregas/contrato/{contratoId}")
    public ResponseEntity<List<Entrega>> listarEntregasPorContrato(@PathVariable Long contratoId) {
        return ResponseEntity.ok(locacaoService.buscarEntregasPorContrato(contratoId));
    }

    @PostMapping("/confirmar-contrato/{id}")
    public ResponseEntity<String> confirmarContrato(@PathVariable Long id) {
        locacaoService.confirmarContrato(id);
        return ResponseEntity.ok("Contrato confirmado automaticamente.");
    }
}