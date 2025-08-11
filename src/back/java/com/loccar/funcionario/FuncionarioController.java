package com.loccar.funcionario;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import jakarta.validation.Valid;


import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/funcionarios")
public class FuncionarioController {

    @Autowired
    private FuncionarioService funcionarioService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping
    public List<Funcionario> listarTodos() {
        return funcionarioService.listarTodos();
    }

    @PostMapping
    public ResponseEntity<?> criar(@RequestBody @Valid FuncionarioDTO dto) {
        try {
            Funcionario funcionario = new Funcionario();
            Cargo cargoEnum = Cargo.valueOf(dto.getCargo().toUpperCase());
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");

            funcionario.setNome(dto.getNome());
            funcionario.setCpf(dto.getCpf().replaceAll("\\D", "")); // remove pontos, traços etc.
            funcionario.setEmail(dto.getEmail());
            funcionario.setTelefone(dto.getTelefone());
            funcionario.setCargo(cargoEnum);
            funcionario.setDataAdmissao(LocalDate.parse(dto.getDataAdmissao(), formatter));
            funcionario.setStatus(dto.getStatus());

            // Codificar senha antes de salvar
            funcionario.setSenha(passwordEncoder.encode(dto.getSenha()));

            return ResponseEntity.ok(funcionarioService.salvar(funcionario));

        } catch (DateTimeParseException e) {
            throw new IllegalArgumentException("Data de admissão em formato inválido. Use dd/MM/yyyy.");
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Valor de cargo inválido: '" + dto.getCargo() + "'. Valores permitidos: ADMINISTRADOR, FUNCIONARIO.");
        }
    }

    @GetMapping("/{id}")
    public Funcionario buscarPorId(@PathVariable Long id) {
        return funcionarioService.buscarPorId(id).orElse(null);
    }

    @GetMapping("/me")
public ResponseEntity<Funcionario> getFuncionarioLogado(Authentication authentication) {
    String email = authentication.getName();

    Funcionario funcionario = funcionarioService.buscarPorEmail(email)
            .orElseThrow(() -> new RuntimeException("Funcionário não encontrado com o e-mail: " + email));

    return ResponseEntity.ok(funcionario);
}

    @PutMapping("/{id}")
    public ResponseEntity<?> atualizar(@PathVariable Long id, @RequestBody @Valid FuncionarioDTO dto) {
        try {
            Cargo cargoEnum = Cargo.valueOf(dto.getCargo().toUpperCase());
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");

            return funcionarioService.buscarPorId(id).map(funcionario -> {
                funcionario.setNome(dto.getNome());
                funcionario.setCpf(dto.getCpf().replaceAll("\\D", ""));
                funcionario.setEmail(dto.getEmail());
                funcionario.setTelefone(dto.getTelefone());
                funcionario.setCargo(cargoEnum);
                funcionario.setDataAdmissao(LocalDate.parse(dto.getDataAdmissao(), formatter));
                funcionario.setStatus(dto.getStatus());

                // Atualizar senha se vier nova senha
                if (dto.getSenha() != null && !dto.getSenha().isBlank()) {
                    funcionario.setSenha(passwordEncoder.encode(dto.getSenha()));
                }

                return ResponseEntity.ok(funcionarioService.salvar(funcionario));
            }).orElse(ResponseEntity.notFound().build());

        } catch (DateTimeParseException e) {
            throw new IllegalArgumentException("Data de admissão em formato inválido. Use dd/MM/yyyy.");
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Valor de cargo inválido: '" + dto.getCargo() + "'. Valores permitidos: ADMINISTRADOR, FUNCIONARIO.");
        }
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        funcionarioService.deletar(id);
    }

    @GetMapping("/cargos")
    public List<String> listarCargosDisponiveis() {
        return Arrays.stream(Cargo.values())
                .map(Enum::name)
                .toList();
    }
}