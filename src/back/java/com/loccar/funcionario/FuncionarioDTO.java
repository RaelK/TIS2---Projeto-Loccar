package com.loccar.funcionario;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public class FuncionarioDTO {

    @NotBlank(message = "O nome é obrigatório.")
    private String nome;

    @NotBlank(message = "O CPF é obrigatório.")
    @Pattern(regexp = "\\d{11}", message = "O CPF deve conter 11 dígitos numéricos.")
    private String cpf;

    @NotBlank(message = "O email é obrigatório.")
    @Email(message = "Formato de email inválido.")
    private String email;

    private String telefone;

    @NotBlank(message = "O cargo é obrigatório.")
    private String cargo;

    private String dataAdmissao;

    @NotBlank(message = "O status é obrigatório.")
    private String status;

    @NotBlank(message = "A senha é obrigatória.")
    private String senha;

    // Getters e Setters
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getCpf() { return cpf; }
    public void setCpf(String cpf) { this.cpf = cpf; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getTelefone() { return telefone; }
    public void setTelefone(String telefone) { this.telefone = telefone; }

    public String getCargo() { return cargo; }
    public void setCargo(String cargo) { this.cargo = cargo; }

    public String getDataAdmissao() { return dataAdmissao; }
    public void setDataAdmissao(String dataAdmissao) { this.dataAdmissao = dataAdmissao; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getSenha() { return senha; }
    public void setSenha(String senha) { this.senha = senha; }
}