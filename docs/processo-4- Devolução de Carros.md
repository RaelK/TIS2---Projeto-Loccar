
### 3.3.4 Processo 4 – Avaliação de Devolução de Veículos

**Nome:** Avaliação de Devolução de Veículos

**Descrição da Organização:**  
Empresa de locação de veículos que atende clientes pessoa física e jurídica, realizando o processo de reserva, contrato e entrega de forma digital e presencial.

**Descrição do processo (passo a passo):**

1. **Cliente devolve o veículo** (*User Task – Cliente*).
2. **Funcionário realiza inspeção do veículo** (*User Task – Funcionário do Atendimento*).
3. **Gateway de decisão: Possui danos?**
   - **Não**: Cliente fornece feedback (*User Task*).
   - **Sim**: Funcionário registra danos (*User Task*).
4. **Carro é enviado para reparos** (*User Task – Gerente de Frota*).
5. **Cliente fornece feedback** (*User Task*).
6. **Funcionário registra feedback no sistema** (*User Task*).
7. **Relatório gerado automaticamente** (*Service Task – Sistema*).
8. **Gerente analisa relatórios** (*User Task – Gerente de Frota*).
9. **Fim do processo:** Avaliação concluída.

---

**Tipo das atividades:**

- **User Tasks:** Devolução do veículo, inspeção, registro de danos, envio para reparos, fornecimento de feedback, registro de feedback, análise dos relatórios.
- **Service Task:** Geração automática do relatório consolidado.
- **Gateways:** Decisão baseada na inspeção do veículo (com ou sem danos).

---

**Oportunidades de melhoria:**

- Implementar checklist digital para inspeção.
- Automatizar geração e envio de relatórios de feedback.
- Integrar sistema de reparos e CRM ao fluxo.

---

### Modelo do Processo (BPMN)

O modelo está representado conforme o diagrama BPMN abaixo:

![image](https://github.com/user-attachments/assets/aea45214-1dd3-4c2c-89de-1923f8f3afeb)

---

### Detalhamento das atividades

**Atividade 1: Receber Veículo Devolvido**

| Campo        | Tipo      | Restrições                    | Valor default |
|--------------|-----------|-------------------------------|---------------|
| Data/Hora    | DataHora  | Obrigatório                   | Data atual    |
| Comprovante  | Arquivo   | Formato PDF ou imagem         |               |

---

**Atividade 2: Inspecionar Veículo**

| Campo              | Tipo    | Restrições                                   | Valor default |
|--------------------|---------|----------------------------------------------|---------------|
| Checklist Digital  | Tabela  | Item (ex: Pneus), Estado (Bom/Danificado)    |               |
| Fotos do Veículo   | Imagem  | Máximo 5 imagens JPG/PNG                     |               |
| Descrição de Danos | Texto   | Máx. 500 caracteres                          |               |

---

**Atividade 3: Encaminhar para Reparos**

| Campo           | Tipo         | Restrições                        | Valor default |
|------------------|--------------|-----------------------------------|---------------|
| Tipo de Reparo   | Seleção      | Urgente, Moderado, Preventivo     |               |
| Custo Estimado   | Número       | Decimal ≥ 0                       |               |
| Data Prevista    | Data         | Apenas datas futuras              |               |

---

**Atividade 4: Coletar Feedback do Cliente**

| Campo              | Tipo        | Restrições              | Valor default |
|--------------------|-------------|--------------------------|---------------|
| Avaliação (1-5)    | Número      | Inteiro de 1 a 5         |               |
| Comentários        | Texto       | Máx. 500 caracteres      |               |
| Contrato Assinado  | Arquivo     | PDF                      |               |

---

**Atividade 5: Gerar Relatório Automático**

| Campo              | Tipo    | Restrições                          | Valor default |
|--------------------|---------|-------------------------------------|---------------|
| Dados Consolidados | Tabela  | Veículo, Danos, Custo, Feedback     |               |
| Link do Relatório  | Link    | URL gerada pelo sistema             |               |

---

**Atividade 6: Análise do Gerente**

| Campo        | Tipo        | Restrições                 | Valor default |
|--------------|-------------|----------------------------|---------------|
| Decisão      | Seleção     | Aprovar Reparos, Rejeitar  |               |
| Comentários  | Texto       | Máx. 200 caracteres        |               |

**Fim do processo:** Avaliação concluída.
