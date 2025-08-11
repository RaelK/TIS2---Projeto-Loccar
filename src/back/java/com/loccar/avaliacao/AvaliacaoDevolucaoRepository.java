package com.loccar.avaliacao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AvaliacaoDevolucaoRepository extends JpaRepository<AvaliacaoDevolucao, Long> {

    List<AvaliacaoDevolucao> findByVeiculoId(Long veiculoId);

    List<AvaliacaoDevolucao> findByClienteId(Long clienteId);
}
