package com.loccar.dto;

import com.fasterxml.jackson.annotation.JsonAlias;

public class ClienteDTO {

    private String nome;
    private String email;
    private String telefone;
    private Long id;

    @JsonAlias("cpf") // aceita JSON com "cpf" como sendo o campo "documento"
    private String documento;

    public ClienteDTO() {
    }

    public ClienteDTO(Long id, String nome, String email, String telefone, String documento) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
        this.documento = documento;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getDocumento() {
        return documento;
    }

    public void setDocumento(String documento) {
        this.documento = documento;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}