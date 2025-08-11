package com.loccar.vistoria;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import com.loccar.gestao.StatusVeiculo;
import com.loccar.gestao.VeiculoService;
import java.util.List;
import java.util.Optional;

@Service
public class VistoriaService {

    @Autowired
    private VistoriaRepository repository;

    @Autowired
    private VeiculoService veiculoService;

    public List<Vistoria> listarTodas() {
        return repository.findAll();
    }

    public Optional<Vistoria> buscarPorId(Long id) {
        return repository.findById(id);
    }

    public Vistoria salvar(Vistoria vistoria) {
        if (vistoria.getFuncionario() == null || vistoria.getFuncionario().getId() == null) {
            throw new IllegalArgumentException("Funcionário não pode ser nulo.");
        }
        return repository.save(vistoria);
    }

    public void deletar(Long id) {
        repository.deleteById(id);
    }

    public Vistoria atualizarAprovacao(Long vistoriaId, String aprovacao, String observacoes) {
        Vistoria vistoria = repository.findById(vistoriaId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Vistoria não encontrada"));

        vistoria.setAprovacao(aprovacao);
        vistoria.setObservacoesGerente(observacoes);

        if ("Aprovado".equalsIgnoreCase(aprovacao)) {
            veiculoService.atualizarStatus(vistoria.getVeiculo().getId(), StatusVeiculo.DISPONIVEL);
        } else if ("Reprovado".equalsIgnoreCase(aprovacao)) {
            veiculoService.atualizarStatus(vistoria.getVeiculo().getId(), StatusVeiculo.MANUTENCAO);
        }

        return repository.save(vistoria);
    }
}