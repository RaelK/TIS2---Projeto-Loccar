package com.loccar.locacao.models;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

import com.loccar.gestao.Veiculo;
import com.loccar.models.Cliente;

@Entity
public class Contrato {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String customerName;
    private String document;
    private String email;
    private LocalDate startDate;
    private LocalDate endDate;
    private String totalValue;

    private String nomeGerenteFrota;
    private String observacoesEntrega;
    private Boolean checklistPreenchido;
    private Boolean termoAssinado;
    private String horaEntrega;

    private Boolean aceiteConfirmado;
    private LocalDateTime dataEntrega;
    private Boolean entregaConfirmada;
    private String status;

    @Lob
    private byte[] pdf;

    @ManyToOne
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;

    @ManyToOne
    @JoinColumn(name = "veiculo_id")
    private Veiculo veiculo;

    public Veiculo getVeiculo() {
        return veiculo;
    }

    public void setVeiculo(Veiculo veiculo) {
        this.veiculo = veiculo;
    }

    // Getters e Setters completos

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getDocument() {
        return document;
    }

    public void setDocument(String document) {
        this.document = document;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public String getTotalValue() {
        return totalValue;
    }

    public void setTotalValue(String totalValue) {
        this.totalValue = totalValue;
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

    public Boolean getChecklistPreenchido() {
        return checklistPreenchido;
    }

    public void setChecklistPreenchido(Boolean checklistPreenchido) {
        this.checklistPreenchido = checklistPreenchido;
    }

    public Boolean getTermoAssinado() {
        return termoAssinado;
    }

    public void setTermoAssinado(Boolean termoAssinado) {
        this.termoAssinado = termoAssinado;
    }

    public String getHoraEntrega() {
        return horaEntrega;
    }

    public void setHoraEntrega(String horaEntrega) {
        this.horaEntrega = horaEntrega;
    }

    public Boolean getAceiteConfirmado() {
        return aceiteConfirmado;
    }

    public void setAceiteConfirmado(Boolean aceiteConfirmado) {
        this.aceiteConfirmado = aceiteConfirmado;
    }

    public LocalDateTime getDataEntrega() {
        return dataEntrega;
    }

    public void setDataEntrega(LocalDateTime dataEntrega) {
        this.dataEntrega = dataEntrega;
    }

    public Boolean getEntregaConfirmada() {
        return entregaConfirmada;
    }

    public void setEntregaConfirmada(Boolean entregaConfirmada) {
        this.entregaConfirmada = entregaConfirmada;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public byte[] getPdf() {
        return pdf;
    }

    public void setPdf(byte[] pdf) {
        this.pdf = pdf;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

}