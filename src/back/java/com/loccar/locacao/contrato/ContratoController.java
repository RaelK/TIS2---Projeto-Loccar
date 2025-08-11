package com.loccar.locacao.contrato;

import com.loccar.dto.ClienteDTO;
import com.loccar.locacao.dto.ContratoDTO;
import com.loccar.locacao.models.Contrato;
import com.loccar.models.Cliente;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.List;

@RestController
@RequestMapping("/api/contratos")
public class ContratoController {

    @Autowired
    private ContratoService contratoService;

    // 🔍 Buscar contrato por ID
    @GetMapping("/{id}")
    public ResponseEntity<ContratoDTO> buscarContratoPorId(@PathVariable Long id) {
        Optional<Contrato> contrato = contratoService.findById(id);
        return contrato.map(value -> ResponseEntity.ok(new ContratoDTO(value)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // 🔍 Buscar contrato ativo por veículo
    @GetMapping("/veiculo/{veiculoId}")
    public ResponseEntity<ContratoDTO> buscarContratoPorVeiculo(@PathVariable Long veiculoId) {
        return contratoService.buscarContratoAtivoPorVeiculo(veiculoId)
                .map(contrato -> ResponseEntity.ok(new ContratoDTO(contrato)))
                .orElse(ResponseEntity.notFound().build());
    }

    // 🔍 Buscar contrato ativo por cliente
    @GetMapping("/ativo-cliente/{clienteId}")
    public ResponseEntity<ContratoDTO> buscarContratoAtivoPorCliente(@PathVariable Long clienteId) {
        return contratoService.buscarContratoAtivoPorCliente(clienteId)
                .map(contrato -> ResponseEntity.ok(new ContratoDTO(contrato)))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/ativos")
    public ResponseEntity<List<ContratoDTO>> listarContratosAtivos() {
        List<ContratoDTO> contratos = contratoService.listarContratosAtivos();
        return ResponseEntity.ok(contratos);
    }

    @GetMapping("/cliente-por-veiculo/{veiculoId}")
    public ResponseEntity<ClienteDTO> getClienteByVeiculo(@PathVariable Long veiculoId) {
        Cliente cliente = contratoService.getClienteByVeiculo(veiculoId);
        ClienteDTO dto = new ClienteDTO(
                cliente.getId(),
                cliente.getNome(),
                cliente.getEmail(),
                cliente.getTelefone(),
                cliente.getCpf());
        return ResponseEntity.ok(dto);
    }

}