package com.loccar.locacao.services;

import com.loccar.locacao.dto.ContratoDTO;
import com.loccar.locacao.dto.EntregaDTO;
import com.loccar.locacao.models.Contrato;
import com.loccar.locacao.models.Entrega;
import com.loccar.locacao.contrato.ContratoRepository;
import com.loccar.locacao.repositories.EntregaRepository;
import com.loccar.locacao.contrato.ContratoPdfGenerator;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class LocacaoService {

    private final ContratoRepository contratoRepository;
    private final EntregaRepository entregaRepository;

    public LocacaoService(ContratoRepository contratoRepository, EntregaRepository entregaRepository) {
        this.contratoRepository = contratoRepository;
        this.entregaRepository = entregaRepository;
    }

    // ✅ Criar contrato com PDF simulado
    public Contrato criarContrato(ContratoDTO dto) {
        byte[] pdf = ContratoPdfGenerator.gerarContratoPdf(
                dto.getCustomerName(),
                dto.getDocument(),
                dto.getEmail(),
                dto.getStartDate(),
                dto.getEndDate(),
                dto.getTotalValue());

        Contrato contrato = new Contrato();
        contrato.setCustomerName(dto.getCustomerName());
        contrato.setDocument(dto.getDocument());
        contrato.setEmail(dto.getEmail());
        contrato.setStartDate(LocalDate.parse(dto.getStartDate()));
        contrato.setEndDate(LocalDate.parse(dto.getEndDate()));
        contrato.setTotalValue(dto.getTotalValue());
        contrato.setPdf(pdf);

        Contrato salvo = contratoRepository.save(contrato);
        enviarContratoSimulado(salvo);

        return salvo;
    }

    public Contrato buscarContrato(Long id) {
        return contratoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Contrato não encontrado"));
    }

    // ✅ Armazenar dados completos da entrega no banco
    public Entrega registrarEntrega(EntregaDTO dto) {
        Entrega entrega = new Entrega();
        entrega.setDataEntrega(dto.getDataEntrega().toLocalDate());
        entrega.setHoraEntrega(dto.getHoraEntrega());
        entrega.setNomeGerenteFrota(dto.getNomeGerenteFrota());
        entrega.setTermoAssinado(dto.isTermoAssinado());
        entrega.setChecklistPreenchido(dto.isChecklistPreenchido());
        entrega.setObservacoesEntrega(dto.getObservacoesEntrega());

        Contrato contrato = contratoRepository.findById(dto.getContratoId())
                .orElseThrow(() -> new RuntimeException("Contrato não encontrado"));
        entrega.setContrato(contrato);

        return entregaRepository.save(entrega);
    }

    public Entrega buscarEntrega(Long id) {
        return entregaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Entrega não encontrada"));
    }

    public List<Entrega> buscarEntregasPorContrato(Long contratoId) {
        return entregaRepository.findByContratoId(contratoId)
                .map(List::of)
                .orElseThrow(() -> new RuntimeException("Entrega não encontrada para o contrato ID: " + contratoId));
    }

    public void confirmarContrato(Long id) {
        System.out.println("Contrato ID " + id + " confirmado automaticamente.");
    }

    private void enviarContratoSimulado(Contrato contrato) {
        System.out.println("📧 Simulação de envio de contrato:");
        System.out.println("Para: " + contrato.getEmail());
        System.out.println("Assunto: Seu contrato de locação");
        System.out.println("Mensagem: Contrato gerado com sucesso.");

        if (contrato.getPdf() != null) {
            System.out.println("PDF: " + contrato.getPdf().length + " bytes");
        } else {
            System.out.println("⚠️ Nenhum PDF gerado.");
        }
    }
}