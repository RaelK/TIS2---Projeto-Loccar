package com.loccar.auth;

import com.loccar.funcionario.Funcionario;
import com.loccar.funcionario.FuncionarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private FuncionarioRepository funcionarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public void alterarSenha(Long funcionarioId, AlterarSenhaDTO dto) {
        Optional<Funcionario> funcionarioOpt = funcionarioRepository.findById(funcionarioId);

        if (funcionarioOpt.isEmpty()) {
            throw new RuntimeException("Funcionário não encontrado");
        }

        Funcionario funcionario = funcionarioOpt.get();

        if (!passwordEncoder.matches(dto.getSenhaAtual(), funcionario.getSenha())) {
            throw new RuntimeException("Senha atual incorreta");
        }

        funcionario.setSenha(passwordEncoder.encode(dto.getNovaSenha()));
        funcionarioRepository.save(funcionario);
    }
}
