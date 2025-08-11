package com.loccar.gestao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class VeiculoService {

    @Autowired
    private VeiculoRepository veiculoRepository;

    @Autowired
    private ManutencaoRepository manutencaoRepository;

    // Salva um novo veículo
    public Veiculo salvar(Veiculo veiculo) {
        if (veiculo.getStatus() == null) {
            veiculo.setStatus(StatusVeiculo.MANUTENCAO);
        }
        return veiculoRepository.save(veiculo);
    }

    // Lista todos os veículos
    public List<Veiculo> listarTodos() {
        return veiculoRepository.findAll();
    }

    public List<Veiculo> buscarPorStatus(StatusVeiculo status) {
        return veiculoRepository.findByStatus(status);
    }

    // Atualiza o status do veículo
    public Veiculo atualizarStatus(Long id, StatusVeiculo status) {
        Veiculo veiculo = veiculoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Veículo não encontrado com id: " + id));

        veiculo.setStatus(status);
        Veiculo atualizado = veiculoRepository.save(veiculo);

        System.out.println("Status do veículo ID " + id + " atualizado para: " + status);

        return atualizado;
    }

    // Registra manutenção
    public Veiculo registrarManutencao(Long id, Manutencao manutencao) {
        Veiculo veiculo = veiculoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Veículo não encontrado com id: " + id));

        manutencao.setVeiculo(veiculo);
        veiculo.getManutencoes().add(manutencao);
        veiculo.setStatus(StatusVeiculo.MANUTENCAO);
        return veiculoRepository.save(veiculo);
    }

    // Manutenções nos próximos 7 dias
    public List<Manutencao> listarManutencoesProximas() {
        LocalDate hoje = LocalDate.now();
        LocalDate limite = hoje.plusDays(7);
        return manutencaoRepository.findPreventivasProximas(hoje, limite);
    }

    // Retorna veículos disponíveis para locação
    public List<VeiculoDisponivelDTO> buscarDisponiveis() {
        return veiculoRepository.findByStatus(StatusVeiculo.DISPONIVEL)
                .stream()
                .map(v -> new VeiculoDisponivelDTO(
                        v.getId(),
                        v.getMarca(),
                        v.getPlaca(),
                        v.getDiaria() != null ? v.getDiaria().doubleValue() : 0.0,
                        v.getCategoria()))
                .collect(Collectors.toList());
    }

    // Lista categorias únicas de veículos
    public List<String> listarCategoriasExistentes() {
        return veiculoRepository.listarCategoriasExistentes();
    }

    // Busca um veículo por ID
    public Optional<Veiculo> buscarPorId(Long id) {
        return veiculoRepository.findById(id);
    }

    public Optional<Veiculo> buscarPorPlaca(String placa) {
        return veiculoRepository.findByPlaca(placa);
    }

    public void excluir(Long id) {
        Veiculo veiculo = veiculoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Veículo não encontrado com id: " + id));

        veiculoRepository.delete(veiculo);
    }

    public Veiculo atualizar(Long id, Veiculo dados) {
        Veiculo veiculo = veiculoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Veículo não encontrado com id: " + id));

        veiculo.setModelo(dados.getModelo());
        veiculo.setPlaca(dados.getPlaca());
        veiculo.setAno(dados.getAno());
        veiculo.setQuilometragem(dados.getQuilometragem());
        veiculo.setUltimaManutencao(dados.getUltimaManutencao());

        return veiculoRepository.save(veiculo);
    }

}