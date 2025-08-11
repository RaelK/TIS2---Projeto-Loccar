package com.loccar.feedback;

import com.loccar.models.Cliente;
import com.loccar.locacao.models.Contrato;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class FeedbackCliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = true)
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;

    @ManyToOne
    private Contrato contrato; // Opcional, usado no feedback inicial

    @Column(nullable = false)
    private Integer nota; // de 1 a 5

    @Column(length = 500)
    private String comentario;

    @Column(nullable = false)
    private String tipoFeedback; // "INICIAL" ou "GERAL"

    @Column(nullable = false)
    private LocalDateTime dataRegistro;

    // Constructors
    public FeedbackCliente() {
    }

    public FeedbackCliente(Long id, Cliente cliente, Contrato contrato, Integer nota, String comentario,
            String tipoFeedback, LocalDateTime dataRegistro) {
        this.id = id;
        this.cliente = cliente;
        this.contrato = contrato;
        this.nota = nota;
        this.comentario = comentario;
        this.tipoFeedback = tipoFeedback;
        this.dataRegistro = dataRegistro;
    }

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public Contrato getContrato() {
        return contrato;
    }

    public void setContrato(Contrato contrato) {
        this.contrato = contrato;
    }

    public Integer getNota() {
        return nota;
    }

    public void setNota(Integer nota) {
        this.nota = nota;
    }

    public String getComentario() {
        return comentario;
    }

    public void setComentario(String comentario) {
        this.comentario = comentario;
    }

    public String getTipoFeedback() {
        return tipoFeedback;
    }

    public void setTipoFeedback(String tipoFeedback) {
        this.tipoFeedback = tipoFeedback;
    }

    public LocalDateTime getDataRegistro() {
        return dataRegistro;
    }

    public void setDataRegistro(LocalDateTime dataRegistro) {
        this.dataRegistro = dataRegistro;
    }
}