package com.loccar.performance.repository;

import com.loccar.performance.models.Checklist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ChecklistRepository extends JpaRepository<Checklist, Long> {

    // Contagem de checklists que necessitam reparo
    long countByNecessitaReparoTrue();

    // Contagem de checklists que não necessitam reparo (opcional)
    long countByNecessitaReparoFalse();

    // Contagem total de checklists
    long count();

    // Cálculo do tempo médio (em horas) entre preenchimento e análise
    @Query(value = """
        SELECT COALESCE(AVG(EXTRACT(EPOCH FROM (data_analise - data_preenchimento)) / 3600), 0)
        FROM checklist
        WHERE data_analise IS NOT NULL
        """, nativeQuery = true)
    double calcularTempoMedioHoras();
}