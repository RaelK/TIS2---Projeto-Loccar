package com.loccar.avaliacao;

import com.loccar.models.Cliente;
import com.loccar.gestao.Veiculo;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
public class AvaliacaoDevolucao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private LocalDateTime dataHoraDevolucao;

    private String comprovanteUrl;

    @ElementCollection
    private List<String> checklistDigital;

    @ElementCollection
    private List<String> fotosVeiculoUrls;

    @Column(length = 500)
    private String descricaoDanos;

    private Boolean possuiDanos;

    private String tipoReparo;

    private Double custoEstimado;

    private LocalDate dataPrevista;

    @NotNull
    private Integer avaliacaoCliente;

    @Column(length = 500)
    private String comentarioCliente;

    private String contratoAssinadoUrl;

    private String linkRelatorio;

    private String decisaoGerente;

    @Column(length = 200)
    private String comentarioGerente;

    @ManyToOne
    private Cliente cliente;

    @ManyToOne
    @JoinColumn(name = "veiculo_id")
    private Veiculo veiculo;

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getDataHoraDevolucao() {
        return dataHoraDevolucao;
    }

    public void setDataHoraDevolucao(LocalDateTime dataHoraDevolucao) {
        this.dataHoraDevolucao = dataHoraDevolucao;
    }

    public String getComprovanteUrl() {
        return comprovanteUrl;
    }

    public void setComprovanteUrl(String comprovanteUrl) {
        this.comprovanteUrl = comprovanteUrl;
    }

    public List<String> getChecklistDigital() {
        return checklistDigital;
    }

    public void setChecklistDigital(List<String> checklistDigital) {
        this.checklistDigital = checklistDigital;
    }

    public List<String> getFotosVeiculoUrls() {
        return fotosVeiculoUrls;
    }

    public void setFotosVeiculoUrls(List<String> fotosVeiculoUrls) {
        this.fotosVeiculoUrls = fotosVeiculoUrls;
    }

    public String getDescricaoDanos() {
        return descricaoDanos;
    }

    public void setDescricaoDanos(String descricaoDanos) {
        this.descricaoDanos = descricaoDanos;
    }

    public Boolean getPossuiDanos() {
        return possuiDanos;
    }

    public void setPossuiDanos(Boolean possuiDanos) {
        this.possuiDanos = possuiDanos;
    }

    public String getTipoReparo() {
        return tipoReparo;
    }

    public void setTipoReparo(String tipoReparo) {
        this.tipoReparo = tipoReparo;
    }

    public Double getCustoEstimado() {
        return custoEstimado;
    }

    public void setCustoEstimado(Double custoEstimado) {
        this.custoEstimado = custoEstimado;
    }

    public LocalDate getDataPrevista() {
        return dataPrevista;
    }

    public void setDataPrevista(LocalDate dataPrevista) {
        this.dataPrevista = dataPrevista;
    }

    public Integer getAvaliacaoCliente() {
        return avaliacaoCliente;
    }

    public void setAvaliacaoCliente(Integer avaliacaoCliente) {
        this.avaliacaoCliente = avaliacaoCliente;
    }

    public String getComentarioCliente() {
        return comentarioCliente;
    }

    public void setComentarioCliente(String comentarioCliente) {
        this.comentarioCliente = comentarioCliente;
    }

    public String getContratoAssinadoUrl() {
        return contratoAssinadoUrl;
    }

    public void setContratoAssinadoUrl(String contratoAssinadoUrl) {
        this.contratoAssinadoUrl = contratoAssinadoUrl;
    }

    public String getLinkRelatorio() {
        return linkRelatorio;
    }

    public void setLinkRelatorio(String linkRelatorio) {
        this.linkRelatorio = linkRelatorio;
    }

    public String getDecisaoGerente() {
        return decisaoGerente;
    }

    public void setDecisaoGerente(String decisaoGerente) {
        this.decisaoGerente = decisaoGerente;
    }

    public String getComentarioGerente() {
        return comentarioGerente;
    }

    public void setComentarioGerente(String comentarioGerente) {
        this.comentarioGerente = comentarioGerente;
    }

    // Getter
    public Veiculo getVeiculo() {
        return veiculo;
    }

    // Setter
    public void setVeiculo(Veiculo veiculo) {
        this.veiculo = veiculo;
    }

}