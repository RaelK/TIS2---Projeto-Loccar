package com.loccar.performance.service;

import com.loccar.gestao.StatusVeiculo;
import com.loccar.gestao.VeiculoRepository;
import com.loccar.performance.repository.ChecklistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class PerformanceIndicatorsService {

    private final VeiculoRepository veiculoRepository;
    private final ChecklistService checklistService;
    private final ChecklistRepository checklistRepository;

    public Map<String, Object> getIndicators() {
        Map<String, Object> indicators = new HashMap<>();

        // 🔧 Dados da frota
        long totalVehicles = veiculoRepository.count();
        long rentedVehicles = veiculoRepository.countByStatus(StatusVeiculo.ALUGADO);
        long availableVehicles = veiculoRepository.countByStatus(StatusVeiculo.DISPONIVEL);
        long maintenanceVehicles = veiculoRepository.countByStatus(StatusVeiculo.MANUTENCAO);

        double utilizationRate = totalVehicles == 0 ? 0.0 :
                (double) rentedVehicles / totalVehicles * 100.0;

        // 🔧 Dados das inspeções
        long totalInspections = checklistRepository.count();
        long vehiclesNeedingRepair = checklistRepository.countByNecessitaReparoTrue();

        double repairPercentage = checklistService.calcularPercentualVeiculosReparo();
        double averageAnalysisTime = checklistService.calcularTempoMedioChecklist();

        // 📊 Populando os indicadores
        indicators.put("vehiclesNeedingRepair", vehiclesNeedingRepair);
        indicators.put("totalInspections", totalInspections);
        indicators.put("repairPercentage", arredondar(repairPercentage));

        indicators.put("averageAnalysisTime", arredondar(averageAnalysisTime));
        indicators.put("vehicleUtilizationRate", arredondar(utilizationRate));

        indicators.put("totalVehicles", totalVehicles);
        indicators.put("rentedVehicles", rentedVehicles);
        indicators.put("availableVehicles", availableVehicles);
        indicators.put("maintenanceVehicles", maintenanceVehicles);

        return indicators;
    }

    private double arredondar(double valor) {
        return new BigDecimal(valor)
                .setScale(2, RoundingMode.HALF_UP)
                .doubleValue();
    }
}