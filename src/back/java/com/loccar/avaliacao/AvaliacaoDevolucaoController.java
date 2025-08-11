package com.loccar.avaliacao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api/avaliacoes")
public class AvaliacaoDevolucaoController {

    @Autowired
    private AvaliacaoDevolucaoService service;

    @PostMapping
    public ResponseEntity<AvaliacaoDevolucao> criar(@RequestBody AvaliacaoDevolucao avaliacao) {
        return ResponseEntity.ok(service.salvar(avaliacao));
    }

    @GetMapping
    public List<AvaliacaoDevolucao> listar() {
        return service.listarTodas();
    }

    @GetMapping("/{id}")
public ResponseEntity<Map<String, Object>> buscar(@PathVariable Long id) {
    return service.buscarPorId(id)
            .map(avaliacao -> {
                Map<String, Object> response = new HashMap<>();
                response.put("id", avaliacao.getId());
                response.put("dataHoraDevolucao", avaliacao.getDataHoraDevolucao());
                response.put("descricaoDanos", avaliacao.getDescricaoDanos());
                response.put("possuiDanos", avaliacao.getPossuiDanos());
                response.put("cliente", avaliacao.getVeiculo().getContrato().getCliente().getNome()); // <-- Nome do cliente
                return ResponseEntity.ok(response);
            })
            .orElse(ResponseEntity.notFound().build());
}


    @GetMapping("/por-veiculo/{veiculoId}")
    public List<AvaliacaoDevolucao> listarPorVeiculo(@PathVariable Long veiculoId) {
        return service.listarPorVeiculo(veiculoId);
    }

    @GetMapping("/por-cliente/{clienteId}")
    public List<AvaliacaoDevolucao> listarPorCliente(@PathVariable Long clienteId) {
        return service.listarPorCliente(clienteId);
    }
}