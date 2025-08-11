package com.loccar.auth;

public class AlterarSenhaDTO {

    private String senhaAtual;
    private String novaSenha;

    // Construtores
    public AlterarSenhaDTO() {
    }

    public AlterarSenhaDTO(String senhaAtual, String novaSenha) {
        this.senhaAtual = senhaAtual;
        this.novaSenha = novaSenha;
    }

    // Getters e Setters
    public String getSenhaAtual() {
        return senhaAtual;
    }

    public void setSenhaAtual(String senhaAtual) {
        this.senhaAtual = senhaAtual;
    }

    public String getNovaSenha() {
        return novaSenha;
    }

    public void setNovaSenha(String novaSenha) {
        this.novaSenha = novaSenha;
    }
}