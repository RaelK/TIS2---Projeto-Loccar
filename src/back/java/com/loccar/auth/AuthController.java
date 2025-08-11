package com.loccar.auth;

import com.loccar.funcionario.Funcionario;
import com.loccar.funcionario.FuncionarioRepository;
import com.loccar.funcionario.dto.LoginRequest;
import com.loccar.funcionario.dto.AuthResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import com.loccar.funcionario.FuncionarioResponse;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private FuncionarioRepository funcionarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Optional<Funcionario> optionalFuncionario = funcionarioRepository.findByEmail(request.getEmail());

        if (optionalFuncionario.isEmpty() ||
                !passwordEncoder.matches(request.getSenha(), optionalFuncionario.get().getSenha())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciais inválidas");
        }

        Funcionario funcionario = optionalFuncionario.get();

        AuthResponse response = new AuthResponse(
                funcionario.getId(),
                funcionario.getNome(),
                funcionario.getCargo().name());

        return ResponseEntity.ok(response);
    }

    @PutMapping("/alterar-senha/{id}")
    public ResponseEntity<?> alterarSenha(@PathVariable Long id, @RequestBody AlterarSenhaDTO dto) {
        authService.alterarSenha(id, dto);
        return ResponseEntity.ok("Senha alterada com sucesso");
    }

    @GetMapping("/me/{email}")
    public ResponseEntity<?> getFuncionarioPorEmail(@PathVariable String email) {
        Funcionario funcionario = funcionarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Funcionário não encontrado"));

        return ResponseEntity.ok(new FuncionarioResponse(
                funcionario.getId(),
                funcionario.getNome(),
                funcionario.getCargo().name()));
    }

}