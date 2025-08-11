package com.loccar.locacao.dto;

import com.loccar.gestao.Veiculo;
import com.loccar.locacao.models.Contrato;
import com.loccar.models.Cliente;
import jakarta.validation.constraints.*;

import java.io.Serializable;

public class ContratoDTO implements Serializable {
    private static final long serialVersionUID = 1L;

    @NotBlank(message = "O nome do cliente é obrigatório")
    private String customerName;

    @NotBlank(message = "O documento é obrigatório")
    private String document;

    @NotBlank(message = "O e-mail é obrigatório")
    @Email(message = "Formato de e-mail inválido")
    private String email;

    @NotNull(message = "A data de início é obrigatória")
    private String startDate;

    @NotNull(message = "A data de término é obrigatória")
    private String endDate;

    @NotBlank(message = "O valor total é obrigatório")
    private String totalValue;

    // 🔥 Novos campos essenciais
    private Long veiculoId;
    private String veiculoModelo;
    private String veiculoPlaca;

    private Long clienteId;
    private String clienteNome;

    // 🔥 Construtor que recebe entidade Contrato
    public ContratoDTO(Contrato contrato) {
        this.customerName = contrato.getCustomerName();
        this.document = contrato.getDocument();
        this.email = contrato.getEmail();
        this.startDate = contrato.getStartDate() != null ? contrato.getStartDate().toString() : null;
        this.endDate = contrato.getEndDate() != null ? contrato.getEndDate().toString() : null;
        this.totalValue = contrato.getTotalValue();

        // 🚗 Dados do Veículo
        Veiculo v = contrato.getVeiculo();
        if (v != null) {
            this.veiculoId = v.getId();
            this.veiculoModelo = v.getModelo();
            this.veiculoPlaca = v.getPlaca();
        }

        // 👤 Dados do Cliente
        Cliente c = contrato.getCliente();
        if (c != null) {
            this.clienteId = c.getId();
            this.clienteNome = c.getNome();
        }
    }

    // 🔧 Construtor padrão
    public ContratoDTO() {
    }

    // ✅ Getters e Setters (adicione para todos os campos)

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

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public String getTotalValue() {
        return totalValue;
    }

    public void setTotalValue(String totalValue) {
        this.totalValue = totalValue;
    }

    public Long getVeiculoId() {
        return veiculoId;
    }

    public void setVeiculoId(Long veiculoId) {
        this.veiculoId = veiculoId;
    }

    public String getVeiculoModelo() {
        return veiculoModelo;
    }

    public void setVeiculoModelo(String veiculoModelo) {
        this.veiculoModelo = veiculoModelo;
    }

    public String getVeiculoPlaca() {
        return veiculoPlaca;
    }

    public void setVeiculoPlaca(String veiculoPlaca) {
        this.veiculoPlaca = veiculoPlaca;
    }

    public Long getClienteId() {
        return clienteId;
    }

    public void setClienteId(Long clienteId) {
        this.clienteId = clienteId;
    }

    public String getClienteNome() {
        return clienteNome;
    }

    public void setClienteNome(String clienteNome) {
        this.clienteNome = clienteNome;
    }
}