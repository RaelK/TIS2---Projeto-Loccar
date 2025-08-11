package com.loccar.services;

import com.loccar.models.Cliente;
import com.loccar.dto.ClienteCompletoDTO;
import com.loccar.repositories.ClienteRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ClienteService {

    private final ClienteRepository clienteRepository;

    public ClienteService(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    public Cliente adicionarCliente(ClienteCompletoDTO dto, MultipartFile documento) {
        Cliente cliente = new Cliente();
        cliente.setNome(dto.getNome());
        cliente.setCpf(dto.getCpf());
        cliente.setCnh(dto.getCnh());
        cliente.setEndereco(dto.getEndereco());
        cliente.setCidade(dto.getCidade());
        cliente.setEstado(dto.getEstado());
        cliente.setCep(dto.getCep());
        cliente.setTelefone(dto.getTelefone());
        cliente.setEmail(dto.getEmail());
        cliente.setFormaPagamento(dto.getFormaPagamento());
        cliente.setDocumentoVerificado(dto.isDocumentoVerificado());

        if (documento != null && !documento.isEmpty()) {
            cliente.setNomeDocumentoAnexado(documento.getOriginalFilename());
        }

        cliente.setStatusCadastro("PENDENTE");
        cliente.setDataConfirmacao(LocalDateTime.now());
        cliente.setMotivoRecusa("");

        return clienteRepository.save(cliente);
    }

    public Cliente salvarClienteSimples(Cliente cliente) {
        if (cliente.getStatusCadastro() == null || cliente.getStatusCadastro().isBlank()) {
            cliente.setStatusCadastro("PENDENTE");
        }
        if (cliente.getDataConfirmacao() == null) {
            cliente.setDataConfirmacao(LocalDateTime.now());
        }
        if (cliente.getMotivoRecusa() == null) {
            cliente.setMotivoRecusa("");
        }
        return clienteRepository.save(cliente);
    }

    public List<Cliente> listarClientes() {
        return clienteRepository.findAll();
    }
}