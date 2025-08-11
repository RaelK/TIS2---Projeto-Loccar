package com.loccar.funcionario.dto;

public class AuthResponse {

    private Long id;
    private String nome;
    private String papel;

    public AuthResponse(Long id, String nome, String papel) {
        this.id = id;
        this.nome = nome;
        this.papel = papel;
    }

    // Getters
    public Long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public String getPapel() {
        return papel;
    }
}