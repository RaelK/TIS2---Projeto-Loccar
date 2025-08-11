package com.loccar.locacao.contrato;

import com.loccar.gestao.StatusVeiculo;
import com.loccar.gestao.Veiculo;
import com.loccar.gestao.VeiculoRepository;
import com.loccar.locacao.dto.ContratoDTO;
import com.loccar.locacao.models.Contrato;
import com.loccar.models.Cliente;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ContratoService {

    @Autowired
    private ContratoRepository contratoRepository;

    @Autowired
    private VeiculoRepository veiculoRepository;

    public Optional<Contrato> buscarContratoAtivoPorVeiculo(Long veiculoId) {
        return contratoRepository.findByVeiculoIdAndStatus(veiculoId, StatusContrato.ATIVO);
    }

    public Optional<Contrato> buscarContratoAtivoPorCliente(Long clienteId) {
        return contratoRepository.findContratoAtivoPorCliente(clienteId);
    }

    public List<ContratoDTO> listarContratosAtivos() {
        List<Contrato> contratos = contratoRepository.findAllContratosAtivos();
        return contratos.stream()
                .map(ContratoDTO::new)
                .toList();
    }

    public Optional<Contrato> findById(Long id) {
        return contratoRepository.findById(id);
    }

    private Contrato getContratoOrThrow(Long id) {
        return contratoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Contrato não encontrado com ID: " + id));
    }

    @Transactional
    public Contrato confirmarAceite(Long id) {
        Contrato contrato = getContratoOrThrow(id);
        contrato.setAceiteConfirmado(true);
        contrato.setStatus("ACEITO");
        return contratoRepository.save(contrato);
    }

    @Transactional
    public Contrato agendarEntregaCompleta(Long id, LocalDateTime dataEntrega, String horaEntrega,
            String nomeGerenteFrota, String observacoesEntrega,
            boolean checklistPreenchido, boolean termoAssinado) {
        Contrato contrato = getContratoOrThrow(id);
        contrato.setDataEntrega(dataEntrega);
        contrato.setHoraEntrega(horaEntrega);
        contrato.setNomeGerenteFrota(nomeGerenteFrota);
        contrato.setObservacoesEntrega(observacoesEntrega);
        contrato.setChecklistPreenchido(checklistPreenchido);
        contrato.setTermoAssinado(termoAssinado);
        contrato.setStatus("AGENDADO");
        return contratoRepository.save(contrato);
    }

    @Transactional
    public Contrato confirmarEntrega(Long id) {
        Contrato contrato = getContratoOrThrow(id);
        contrato.setEntregaConfirmada(true);
        contrato.setStatus("ENTREGUE");
        return contratoRepository.save(contrato);
    }

    @Transactional
    public Contrato finalizarContrato(Long id) {
        Contrato contrato = getContratoOrThrow(id);
        contrato.setStatus("FINALIZADO");
        return contratoRepository.save(contrato);
    }

    @Transactional
    public Contrato atribuirVeiculo(Long contratoId, Long veiculoId) {
        Contrato contrato = contratoRepository.findById(contratoId)
                .orElseThrow(() -> new RuntimeException("Contrato não encontrado"));

        Veiculo veiculo = veiculoRepository.findById(veiculoId)
                .orElseThrow(() -> new RuntimeException("Veículo não encontrado"));

        if (!veiculo.getStatus().equals(StatusVeiculo.DISPONIVEL)) {
            throw new RuntimeException("Veículo não está disponível para atribuição.");
        }

        contrato.setVeiculo(veiculo);
        return contratoRepository.save(contrato);
    }

    public Cliente getClienteByVeiculo(Long veiculoId) {
        Contrato contrato = contratoRepository.findByVeiculoIdAndStatus(veiculoId, StatusContrato.ATIVO)
                .orElseThrow(() -> new RuntimeException("Nenhum contrato ativo para este veículo"));
        return contrato.getCliente();
    }
}