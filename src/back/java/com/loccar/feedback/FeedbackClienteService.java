package com.loccar.feedback;

import com.loccar.locacao.models.Contrato;
import com.loccar.locacao.contrato.ContratoRepository;
import com.loccar.models.Cliente;
import com.loccar.repositories.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class FeedbackClienteService {

    @Autowired
    private FeedbackClienteRepository repository;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private ContratoRepository contratoRepository;

    public FeedbackCliente salvar(FeedbackCliente feedback) {
        if (feedback.getContrato() != null) {
            // Valida se o contrato existe
            Contrato contrato = contratoRepository.findById(feedback.getContrato().getId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Contrato não encontrado"));

            // Valida se o cliente foi informado
            if (feedback.getCliente() == null) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cliente é obrigatório quando há contrato.");
            }

            // Valida se o cliente existe
            Cliente cliente = clienteRepository.findById(feedback.getCliente().getId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cliente não encontrado."));

            // Valida se o contrato pertence ao cliente
            if (!contrato.getCliente().getId().equals(cliente.getId())) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "O cliente não corresponde ao contrato.");
            }
        }

        // Se não há contrato, cliente pode ser nulo (feedback geral)
        feedback.setDataRegistro(LocalDateTime.now());
        return repository.save(feedback);
    }

    public List<FeedbackCliente> listarPorCliente(Long clienteId) {
        return repository.findByClienteId(clienteId);
    }

    public List<FeedbackCliente> listarPorContrato(Long contratoId) {
        return repository.findByContratoId(contratoId);
    }
}