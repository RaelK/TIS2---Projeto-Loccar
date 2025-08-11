package com.loccar.performance.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "checklist")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Checklist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "veiculo_id", nullable = false)
    private Long veiculoId;

    @Column(name = "data_preenchimento", nullable = false)
    private LocalDateTime dataPreenchimento;

    @Column(name = "data_analise")
    private LocalDateTime dataAnalise;

    @Column(name = "necessita_reparo", nullable = false)
    private Boolean necessitaReparo;
}
