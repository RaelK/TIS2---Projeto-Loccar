### 3.3.4 Processo 5 – Vistoria Técnica de Veículos

**Nome:** Vistoria Técnica de Veículos

**Descrição do processo (passo a passo):**

1. **Funcionário agenda vistoria** (atividade do usuário - *User Task*).
2. **Veículo vistoriado** (atividade manual).
3. **Funcionário preenche checklist** (atividade do usuário - *User Task*).
4. **Gerente analisa checklist** (atividade do usuário - *User Task*).
5. **Gateway decisão: Necessita de reparos?**

   * Se **não**, veículo é liberado para uso.
   * Se **sim**, veículo é enviado para reparo.
6. **Fim do processo:** Veículo liberado ou enviado para reparo.

**Tipo das atividades:**

* **Atividades manuais:** Veículo vistoriado.
* **Atividades do usuário (User Tasks):** Funcionário agenda vistoria, Funcionário preenche checklist, Gerente analisa checklist.
* **Atividades automáticas:** (não aplicável neste processo).

---

**Oportunidades de melhoria:**

* Implementar checklist digital com integração direta ao sistema.
* Automatizar notificações para o gerente sobre resultados de vistorias.
* Integrar sistema de agendamento automático para otimizar tempo das vistorias.

---

### Modelo do Processo (BPMN)

![image](https://github.com/user-attachments/assets/cca151e5-22fa-4710-b431-1776bc4a7173)

---

### Detalhamento das atividades

**Atividade: Funcionário agenda vistoria**

| Campo              | Tipo           | Restrições  | Valor default |
| ------------------ | -------------- | ----------- | ------------- |
| Data da vistoria   | Data e Hora    | Obrigatório | Data atual    |
| Placa do veículo   | Caixa de Texto | Obrigatório |               |
| Motivo da vistoria | Área de texto  |             |               |

| Comandos | Destino            | Tipo    |
| -------- | ------------------ | ------- |
| Agendar  | Veículo vistoriado | default |

**Atividade: Funcionário preenche checklist**

| Campo             | Tipo          | Restrições         | Valor default |
| ----------------- | ------------- | ------------------ | ------------- |
| Estado dos pneus  | Seleção Única | Bom, Regular, Ruim | Bom           |
| Condições gerais  | Área de texto | Obrigatório        |               |
| Quilometragem     | Número        | Obrigatório        |               |
| Necessita reparos | Seleção Única | Sim, Não           | Não           |

| Comandos | Destino                   | Tipo    |
| -------- | ------------------------- | ------- |
| Salvar   | Gerente analisa checklist | default |

**Atividade: Gerente analisa checklist**

| Campo                  | Tipo          | Restrições          | Valor default |
| ---------------------- | ------------- | ------------------- | ------------- |
| Aprovação da vistoria  | Seleção Única | Aprovado, Reprovado | Aprovado      |
| Observações adicionais | Área de texto |                     |               |

| Comandos | Destino           | Tipo    |
| -------- | ----------------- | ------- |
| Aprovar  | Liberado para uso | default |
| Reprovar | Envio para reparo | default |

**Fim do processo:** Veículo liberado ou enviado para reparo.
