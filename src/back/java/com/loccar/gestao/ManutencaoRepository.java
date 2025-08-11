package com.loccar.gestao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface ManutencaoRepository extends JpaRepository<Manutencao, Long> {

    @Query("SELECT m FROM Manutencao m WHERE m.tipo = 'PREVENTIVA' AND m.dataProgramada BETWEEN :hoje AND :limite")
    List<Manutencao> findPreventivasProximas(LocalDate hoje, LocalDate limite);
}
