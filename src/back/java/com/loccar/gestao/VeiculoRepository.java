package com.loccar.gestao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VeiculoRepository extends JpaRepository<Veiculo, Long> {

    List<Veiculo> findByStatus(StatusVeiculo status);

    long countByStatus(StatusVeiculo status);

    Optional<Veiculo> findByPlaca(String placa);

    @Query(value = "SELECT marca, placa, diaria, categoria FROM veiculo WHERE status = 'DISPONIVEL'", nativeQuery = true)
    List<Object[]> buscarDisponiveis();

    @Query(value = "SELECT DISTINCT categoria FROM veiculo WHERE categoria IS NOT NULL", nativeQuery = true)
    List<String> listarCategoriasExistentes();

}
