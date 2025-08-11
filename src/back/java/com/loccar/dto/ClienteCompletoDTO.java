package com.loccar.dto;

public class ClienteCompletoDTO {

    private String nome;
    private String cpf;
    private String cnh;
    private String endereco;
    private String cidade;
    private String estado;
    private String cep;
    private String telefone;
    private String email;
    private String formaPagamento;
    private boolean documentoVerificado;

    public ClienteCompletoDTO() {}

    // Getters e Setters

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getCpf() { return cpf; }
    public void setCpf(String cpf) { this.cpf = cpf; }

    public String getCnh() { return cnh; }
    public void setCnh(String cnh) { this.cnh = cnh; }

    public String getEndereco() { return endereco; }
    public void setEndereco(String endereco) { this.endereco = endereco; }

    public String getCidade() { return cidade; }
    public void setCidade(String cidade) { this.cidade = cidade; }

    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }

    public String getCep() { return cep; }
    public void setCep(String cep) { this.cep = cep; }

    public String getTelefone() { return telefone; }
    public void setTelefone(String telefone) { this.telefone = telefone; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getFormaPagamento() { return formaPagamento; }
    public void setFormaPagamento(String formaPagamento) { this.formaPagamento = formaPagamento; }

    public boolean isDocumentoVerificado() { return documentoVerificado; }
    public void setDocumentoVerificado(boolean documentoVerificado) { this.documentoVerificado = documentoVerificado; }
}