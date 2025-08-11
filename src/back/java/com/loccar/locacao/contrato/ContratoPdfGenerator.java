package com.loccar.locacao.contrato;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfWriter;

import java.io.ByteArrayOutputStream;

public class ContratoPdfGenerator {

    public static byte[] gerarContratoPdf(String nome, String documento, String email, String dataInicio, String dataFim, String valorTotal) {
        try {
            Document document = new Document();
            ByteArrayOutputStream out = new ByteArrayOutputStream();

            PdfWriter.getInstance(document, out);
            document.open();

            Font titleFont = new Font(Font.FontFamily.HELVETICA, 18, Font.BOLD);
            Font fieldFont = new Font(Font.FontFamily.HELVETICA, 12);

            document.add(new Paragraph("Contrato de Locação de Veículo", titleFont));
            document.add(Chunk.NEWLINE);

            document.add(new Paragraph("Nome do Cliente: " + nome, fieldFont));
            document.add(new Paragraph("CPF/CNPJ: " + documento, fieldFont));
            document.add(new Paragraph("E-mail: " + email, fieldFont));
            document.add(new Paragraph("Data de Início: " + dataInicio, fieldFont));
            document.add(new Paragraph("Data de Término: " + dataFim, fieldFont));
            document.add(new Paragraph("Valor Total: R$ " + valorTotal, fieldFont));
            document.add(Chunk.NEWLINE);
            document.add(new Paragraph("Assinatura do Cliente: ____________________________", fieldFont));

            document.close();
            return out.toByteArray();
        } catch (Exception e) {
            throw new RuntimeException("Erro ao gerar o PDF do contrato", e);
        }
    }
}