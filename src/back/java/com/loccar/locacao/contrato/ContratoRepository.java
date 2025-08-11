package com.loccar.locacao.contrato;

import com.loccar.locacao.models.Contrato;
import com.loccar.models.Cliente;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ContratoRepository extends JpaRepository<Contrato, Long> {

    @Query("SELECT c FROM Contrato c WHERE c.cliente.id = :clienteId AND c.status = 'ATIVO'")
    Optional<Contrato> findContratoAtivoPorCliente(@Param("clienteId") Long clienteId);

    @Query("SELECT c FROM Contrato c WHERE c.veiculo.id = :veiculoId AND c.status = 'ATIVO'")
    Optional<Contrato> findContratoAtivoPorVeiculo(@Param("veiculoId") Long veiculoId);

    @Query("SELECT c FROM Contrato c WHERE c.status = 'ATIVO'")
    List<Contrato> findAllContratosAtivos();

    @Query("SELECT c.cliente FROM Contrato c WHERE c.veiculo.id = :veiculoId AND c.status = 'ATIVO'")
    Optional<Cliente> findClienteByVeiculoId(@Param("veiculoId") Long veiculoId);

    Optional<Contrato> findByVeiculoIdAndStatus(Long veiculoId, StatusContrato status);

}
