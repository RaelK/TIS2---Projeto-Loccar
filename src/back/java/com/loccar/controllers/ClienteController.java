package com.loccar.controllers;

import com.loccar.models.Cliente;
import com.loccar.dto.ClienteCompletoDTO;
import com.loccar.services.ClienteService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/clientes")
public class ClienteController {

    private final ClienteService clienteService;

    public ClienteController(ClienteService clienteService) {
        this.clienteService = clienteService;
    }

    @PostMapping
    public ResponseEntity<?> adicionarCliente(@RequestBody ClienteCompletoDTO dto) {
        try {
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

            return ResponseEntity.ok(clienteService.salvarClienteSimples(cliente));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao acessar o banco de dados ao tentar salvar cliente: " + e.getMessage());
        }
    }

    @PostMapping(value = "/completo", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> cadastrarClienteCompleto(
            @RequestPart("cliente") ClienteCompletoDTO dto,
            @RequestPart("documento") MultipartFile documento
    ) {
        try {
            clienteService.adicionarCliente(dto, documento);
            return ResponseEntity.ok("Cliente completo cadastrado com sucesso.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao cadastrar cliente completo: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> listarClientes() {
        try {
            List<Cliente> clientes = clienteService.listarClientes();
            return ResponseEntity.ok(clientes);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao listar clientes: " + e.getMessage());
        }
    }
}