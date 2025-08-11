package com.loccar.performance.service;

import com.loccar.performance.repository.ChecklistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChecklistService {

    private final ChecklistRepository checklistRepository;

    // Calcula o percentual de veículos que necessitam reparo
    public double calcularPercentualVeiculosReparo() {
        long totalChecklists = checklistRepository.count();
        long necessitaReparo = checklistRepository.countByNecessitaReparoTrue();

        if (totalChecklists == 0) {
            return 0.0;
        }

        return (double) necessitaReparo / totalChecklists * 100.0;
    }

    // Calcula o tempo médio de análise em horas
    public double calcularTempoMedioChecklist() {
        return checklistRepository.calcularTempoMedioHoras();
    }
}