package com.loccar.vistoria;

import lombok.Data;

@Data
public class AprovacaoDTO {
    private String aprovacao; // "Aprovado" ou "Reprovado"
    private String observacoesGerente;
}
