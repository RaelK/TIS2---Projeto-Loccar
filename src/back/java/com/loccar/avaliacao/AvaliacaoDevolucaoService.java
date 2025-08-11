package com.loccar.avaliacao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class AvaliacaoDevolucaoService {

    @Autowired
    private AvaliacaoDevolucaoRepository repository;

    public AvaliacaoDevolucao salvar(AvaliacaoDevolucao avaliacao) {
        return repository.save(avaliacao);
    }

    public List<AvaliacaoDevolucao> listarTodas() {
        return repository.findAll();
    }

    public Optional<AvaliacaoDevolucao> buscarPorId(Long id) {
        return repository.findById(id);
    }

    public List<AvaliacaoDevolucao> listarPorVeiculo(Long veiculoId) {
        return repository.findByVeiculoId(veiculoId);
    }

    public List<AvaliacaoDevolucao> listarPorCliente(Long clienteId) {
        return repository.findByClienteId(clienteId);
    }

}