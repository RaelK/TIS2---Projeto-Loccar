package com.loccar.locacao.dto;

import java.time.LocalDateTime;

public class EntregaDTO {
    private Long contratoId;
    private Long funcionarioId;
    private LocalDateTime dataEntrega;
    private String horaEntrega;
    private String nomeGerenteFrota;
    private String observacoesEntrega;
    private boolean checklistPreenchido;
    private boolean termoAssinado;
    private String customerSignature; // ✅ NOVO CAMPO

    public Long getContratoId() {
        return contratoId;
    }

    public void setContratoId(Long contratoId) {
        this.contratoId = contratoId;
    }

    public LocalDateTime getDataEntrega() {
        return dataEntrega;
    }

    public void setDataEntrega(LocalDateTime dataEntrega) {
        this.dataEntrega = dataEntrega;
    }

    public String getHoraEntrega() {
        return horaEntrega;
    }

    public void setHoraEntrega(String horaEntrega) {
        this.horaEntrega = horaEntrega;
    }

    public String getNomeGerenteFrota() {
        return nomeGerenteFrota;
    }

    public void setNomeGerenteFrota(String nomeGerenteFrota) {
        this.nomeGerenteFrota = nomeGerenteFrota;
    }

    public String getObservacoesEntrega() {
        return observacoesEntrega;
    }

    public void setObservacoesEntrega(String observacoesEntrega) {
        this.observacoesEntrega = observacoesEntrega;
    }

    public boolean isChecklistPreenchido() {
        return checklistPreenchido;
    }

    public void setChecklistPreenchido(boolean checklistPreenchido) {
        this.checklistPreenchido = checklistPreenchido;
    }

    public boolean isTermoAssinado() {
        return termoAssinado;
    }

    public void setTermoAssinado(boolean termoAssinado) {
        this.termoAssinado = termoAssinado;
    }

    public Long getFuncionarioId() {
        return funcionarioId;
    }

    public void setFuncionarioId(Long funcionarioId) {
        this.funcionarioId = funcionarioId;
    }

    public String getCustomerSignature() {
        return customerSignature;
    }

    public void setCustomerSignature(String customerSignature) {
        this.customerSignature = customerSignature;
    }
}