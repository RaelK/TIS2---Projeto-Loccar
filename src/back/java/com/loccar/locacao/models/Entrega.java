package com.loccar.locacao.models;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
public class Entrega {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate dataEntrega;
    private String horaEntrega;
    private String nomeGerenteFrota;
    private boolean termoAssinado;
    private boolean checklistPreenchido;

    @Column(length = 1000)
    private String observacoesEntrega;

    @Column(name = "confirmada") // <- AGORA DENTRO DA CLASSE
    private boolean confirmada;

    private LocalDateTime dataRegistro;
    private LocalDateTime dataHoraEntregaFinal;
    private String status;

    @ManyToOne
    @JoinColumn(name = "contrato_id", nullable = false)
    private Contrato contrato;

    @Column(name = "customer_signature", nullable = false)
    private String customerSignature;

    // Getters e Setters

    public Long getId() {
        return id;
    }

    public LocalDate getDataEntrega() {
        return dataEntrega;
    }

    public void setDataEntrega(LocalDate dataEntrega) {
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

    public boolean isTermoAssinado() {
        return termoAssinado;
    }

    public void setTermoAssinado(boolean termoAssinado) {
        this.termoAssinado = termoAssinado;
    }

    public boolean isChecklistPreenchido() {
        return checklistPreenchido;
    }

    public void setChecklistPreenchido(boolean checklistPreenchido) {
        this.checklistPreenchido = checklistPreenchido;
    }

    public String getObservacoesEntrega() {
        return observacoesEntrega;
    }

    public void setObservacoesEntrega(String observacoesEntrega) {
        this.observacoesEntrega = observacoesEntrega;
    }

    public Contrato getContrato() {
        return contrato;
    }

    public void setContrato(Contrato contrato) {
        this.contrato = contrato;
    }

    // ✅ Novos métodos exigidos pelo Service

    public LocalDateTime getDataRegistro() {
        return dataRegistro;
    }

    public void setDataRegistro(LocalDateTime dataRegistro) {
        this.dataRegistro = dataRegistro;
    }

    public LocalDateTime getDataHoraEntregaFinal() {
        return dataHoraEntregaFinal;
    }

    public void setDataHoraEntrega(LocalDateTime dataHoraEntregaFinal) {
        this.dataHoraEntregaFinal = dataHoraEntregaFinal;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public boolean isConfirmada() {
        return confirmada;
    }

    public void setConfirmada(boolean confirmada) {
        this.confirmada = confirmada;
    }

    public String getCustomerSignature() {
        return customerSignature;
    }

    public void setCustomerSignature(String customerSignature) {
        this.customerSignature = customerSignature;
    }

}