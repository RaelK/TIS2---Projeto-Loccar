package com.loccar.locacao.services;

import com.loccar.locacao.dto.EntregaDTO;
import com.loccar.locacao.models.Contrato;
import com.loccar.locacao.models.Entrega;
import com.loccar.locacao.contrato.ContratoRepository;
import com.loccar.locacao.repositories.EntregaRepository;
import com.loccar.gestao.StatusVeiculo;
import com.loccar.gestao.Veiculo;
import com.loccar.gestao.VeiculoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import jakarta.transaction.Transactional;

@Service
public class EntregaService {

    @Autowired
    private EntregaRepository entregaRepository;

    @Autowired
    private ContratoRepository contratoRepository;

    @Autowired
    private VeiculoRepository veiculoRepository; // ✅ AGORA está dentro da classe

    public Entrega registrarEntrega(EntregaDTO dto) {
        Contrato contrato = contratoRepository.findById(dto.getContratoId())
                .orElseThrow(() -> new RuntimeException("Contrato não encontrado"));

        Entrega entrega = new Entrega();
        entrega.setContrato(contrato);
        entrega.setDataEntrega(LocalDate.now());
        entrega.setHoraEntrega(LocalTime.now().format(DateTimeFormatter.ofPattern("HH:mm")));
        entrega.setNomeGerenteFrota(dto.getNomeGerenteFrota());
        entrega.setObservacoesEntrega(dto.getObservacoesEntrega());
        entrega.setChecklistPreenchido(dto.isChecklistPreenchido());
        entrega.setTermoAssinado(dto.isTermoAssinado());
        entrega.setDataRegistro(LocalDateTime.now());
        entrega.setStatus("Ativa");
        entrega.setCustomerSignature(dto.getCustomerSignature());

        Entrega savedEntrega = entregaRepository.save(entrega);

        // ✅ Atualiza status do veículo
        Veiculo veiculo = contrato.getVeiculo();
        if (veiculo == null) {
            throw new RuntimeException("Contrato não possui veículo associado.");
        }
        veiculo.setStatus(StatusVeiculo.ALUGADO);
        veiculoRepository.save(veiculo);

        return savedEntrega;
    }

    @Transactional
    public Entrega confirmarEntrega(Long contratoId, EntregaDTO dto) {
        // Busca contrato
        Contrato contrato = contratoRepository.findById(contratoId)
                .orElseThrow(() -> new RuntimeException("Contrato não encontrado: " + contratoId));

        // Verifica se já existe entrega para o contrato
        Entrega entrega = entregaRepository.findByContratoId(contratoId)
                .orElse(new Entrega()); // se não existir, cria nova

        // Define os dados
        entrega.setContrato(contrato);
        entrega.setDataEntrega(LocalDateTime.now().toLocalDate());
        entrega.setHoraEntrega(dto.getHoraEntrega());
        entrega.setNomeGerenteFrota(dto.getNomeGerenteFrota());
        entrega.setObservacoesEntrega(dto.getObservacoesEntrega());
        entrega.setChecklistPreenchido(dto.isChecklistPreenchido());
        entrega.setTermoAssinado(dto.isTermoAssinado());
        entrega.setConfirmada(true);
        entrega.setStatus("CONFIRMADA");

        // Atualiza status do contrato
        contrato.setStatus("ENTREGUE");
        contrato.setEntregaConfirmada(true);

        // Atualiza status do veículo se necessário
        if (contrato.getVeiculo() != null) {
            contrato.getVeiculo().setStatus(StatusVeiculo.ALUGADO);
        }

        return entregaRepository.save(entrega);
    }

    public Entrega buscarEntrega(Long id) {
        return entregaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Entrega não encontrada: " + id));
    }

    public Entrega buscarPorContratoId(Long contratoId) {
        return entregaRepository.findByContratoId(contratoId)
                .orElseThrow(() -> new RuntimeException("Entrega não encontrada para o contrato: " + contratoId));
    }

    public List<Entrega> listarTodas() {
        return entregaRepository.findAll();
    }
}