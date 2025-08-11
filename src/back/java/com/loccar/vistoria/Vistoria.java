package com.loccar.vistoria;

import com.loccar.gestao.Veiculo;
import com.loccar.funcionario.Funcionario;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Vistoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime dataVistoria;
    private String motivo;

    @ManyToOne
    @JoinColumn(name = "veiculo_id", nullable = false)
    private Veiculo veiculo;

    @ManyToOne
    @JoinColumn(name = "funcionario_id", nullable = false)
    private Funcionario funcionario;

    // Checklist
    private String estadoPneus;
    private String condicoesGerais;
    private Integer quilometragem;
    private Boolean necessitaReparos;

    // Análise do gerente
    private String aprovacao; // Aprovado | Reprovado
    private String observacoesGerente;
}