package com.loccar.locacao.contrato;

import jakarta.persistence.*;

@Entity
@Table(name = "contrato")
public class ArquivoContrato {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String documento;
    private String email;
    private String dataInicio;
    private String dataFim;
    private String valorTotal;

    @Lob
    private byte[] pdf;

    public ArquivoContrato() {}

    public ArquivoContrato(String nome, String documento, String email, String dataInicio, String dataFim, String valorTotal, byte[] pdf) {
        this.nome = nome;
        this.documento = documento;
        this.email = email;
        this.dataInicio = dataInicio;
        this.dataFim = dataFim;
        this.valorTotal = valorTotal;
        this.pdf = pdf;
    }

    // Getters e Setters

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getDocumento() { return documento; }
    public void setDocumento(String documento) { this.documento = documento; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getDataInicio() { return dataInicio; }
    public void setDataInicio(String dataInicio) { this.dataInicio = dataInicio; }

    public String getDataFim() { return dataFim; }
    public void setDataFim(String dataFim) { this.dataFim = dataFim; }

    public String getValorTotal() { return valorTotal; }
    public void setValorTotal(String valorTotal) { this.valorTotal = valorTotal; }

    public byte[] getPdf() { return pdf; }
    public void setPdf(byte[] pdf) { this.pdf = pdf; }
}
