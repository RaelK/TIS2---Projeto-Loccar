package com.loccar.gestao;

public class VeiculoDisponivelDTO {
    private Long id; // ✅ necessário para redirecionamento
    private String marca;
    private String placa;
    private Double diaria;
    private String categoria;

    public VeiculoDisponivelDTO(Long id, String marca, String placa, Double diaria, String categoria) {
        this.id = id;
        this.marca = marca;
        this.placa = placa;
        this.diaria = diaria;
        this.categoria = categoria;
    }

    public Long getId() {
        return id;
    }

    public String getMarca() {
        return marca;
    }

    public String getPlaca() {
        return placa;
    }

    public Double getDiaria() {
        return diaria;
    }

    public String getCategoria() {
        return categoria;
    }
}