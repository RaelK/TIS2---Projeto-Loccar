package com.loccar.gestao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/veiculos")
public class VeiculoController {

    @Autowired
    private VeiculoService veiculoService;

    // Cadastro de novo veículo
    @PostMapping
    public Veiculo cadastrar(@RequestBody Veiculo veiculo) {
        if (!veiculo.isVerificado()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Documentação do veículo não foi verificada.");
        }
        return veiculoService.salvar(veiculo);
    }

    // 🔍 GET /api/veiculos?status=ALUGADO → Lista veículos por status
    @GetMapping(params = "status")
    public List<Veiculo> listarPorStatus(@RequestParam StatusVeiculo status) {
        return veiculoService.buscarPorStatus(status);
    }

    // 📋 GET /api/veiculos → Lista todos os veículos (gestão geral)
    @GetMapping
    public List<Veiculo> listarTodos() {
        return veiculoService.listarTodos();
    }

    // 🔄 PUT /api/veiculos/{id}/status → Atualiza status do veículo
    @PutMapping("/{id}/status")
    public Veiculo atualizarStatus(@PathVariable Long id, @RequestBody AtualizacaoStatusDTO dto) {
        return veiculoService.atualizarStatus(id, dto.getStatus());
    }

    // 🛠 POST /api/veiculos/{id}/manutencao → Registra manutenção
    @PostMapping("/{id}/manutencao")
    public Veiculo registrarManutencao(@PathVariable Long id, @RequestBody Manutencao manutencao) {
        return veiculoService.registrarManutencao(id, manutencao);
    }

    // 🚘 GET /api/veiculos/disponiveis → Lista veículos disponíveis
    @GetMapping("/disponiveis")
    public List<VeiculoDisponivelDTO> listarDisponiveis() {
        return veiculoService.buscarDisponiveis().stream()
                .map(v -> new VeiculoDisponivelDTO(
                        v.getId(),
                        v.getMarca(),
                        v.getPlaca(),
                        v.getDiaria() != null ? v.getDiaria().doubleValue() : 0.0,
                        v.getCategoria()))
                .collect(Collectors.toList());
    }

    // 🔧 GET /api/veiculos/manutencoes/proximas → Manutenções agendadas
    @GetMapping("/manutencoes/proximas")
    public List<Manutencao> manutencoesProximas() {
        return veiculoService.listarManutencoesProximas();
    }

    // 🏷 GET /api/veiculos/categorias → Lista categorias existentes
    @GetMapping("/categorias")
    public List<String> listarCategorias() {
        return veiculoService.listarCategoriasExistentes();
    }

    // 🔍 GET /api/veiculos/{id} → Buscar veículo por ID
    @GetMapping("/{id}")
    public Veiculo buscarPorId(@PathVariable Long id) {
        return veiculoService.buscarPorId(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Veículo não encontrado"));
    }

    // 🔍 GET /api/veiculos/placa/{placa} → Buscar veículo pela placa
    @GetMapping("/placa/{placa}")
    public ResponseEntity<Veiculo> buscarPorPlaca(@PathVariable String placa) {
        return veiculoService.buscarPorPlaca(placa)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        veiculoService.excluir(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public Veiculo atualizar(@PathVariable Long id, @RequestBody Veiculo veiculoAtualizado) {
        return veiculoService.atualizar(id, veiculoAtualizado);
    }

}