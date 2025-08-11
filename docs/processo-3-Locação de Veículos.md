### 3.3.3 Processo 3 – Locação de Veículos

**Nome:** Locação de Veículos

**Descrição do processo (passo a passo):**

1. **Solicitação de locação** (atividade manual realizada pelo cliente).
2. **Verificar a disponibilidade de carros para o cliente escolher** (atividade do usuário - *User Task*).
3. **Gateway decisão: Cliente aceita carro disponível?**

   * Se **não**, informar indisponibilidade ao cliente.
   * Se **sim**, segue para criação de contrato digital.
4. **Funcionário gera contrato digital** (atividade do usuário - *User Task*).
5. **Cliente assina contrato digital** (atividade manual realizada pelo cliente).
6. **Funcionário registra locação no sistema** (atividade do usuário - *User Task*).
7. **Funcionário entrega veículo ao cliente** (atividade do usuário - *User Task*).
8. **Fim do processo:** Veículo alugado.

**Tipo das atividades:**

* **Atividades manuais:** Solicitação de locação, Cliente assina contrato digital.
* **Atividades do usuário (User Tasks):** Verificar disponibilidade, Geração do contrato digital, Registro da locação, Entrega do veículo.
* **Atividades automáticas:** (não aplicável neste processo).

---

**Oportunidades de melhoria:**

* Automatizar a verificação de disponibilidade dos veículos.
* Automatizar o envio e confirmação de contratos por assinatura digital.
* Implementar notificações automáticas sobre status da locação.

---

### Modelo do Processo (BPMN)

![image](https://github.com/user-attachments/assets/3a6bc365-1646-4492-ad36-f3dc5b53fa27)


---

### Detalhamento das atividades

**Atividade: Verificar a disponibilidade de carros para o cliente escolher**

| Campo                  | Tipo          | Restrições                               | Valor default |
| ---------------------- | ------------- | ---------------------------------------- | ------------- |
| Categoria do veículo   | Seleção Única | Obrigatório (Econômico, Executivo, Luxo) |               |
| Data inicial locação   | Data e Hora   | Obrigatório                              | Data atual    |
| Data final locação     | Data e Hora   | Obrigatório                              |               |
| Status disponibilidade | Seleção Única | Automático (Disponível, Indisponível)    | Disponível    |

| Comandos     | Destino                                   | Tipo    |
| ------------ | ----------------------------------------- | ------- |
| Disponível   | Funcionário gera contrato digital         | default |
| Indisponível | Cliente informado sobre indisponibilidade | default |

**Atividade: Funcionário gera contrato digital**

| Campo             | Tipo           | Restrições                  | Valor default |
| ----------------- | -------------- | --------------------------- | ------------- |
| Nome do cliente   | Caixa de Texto | Obrigatório                 |               |
| CPF ou CNPJ       | Número         | Obrigatório, formato válido |               |
| Veículo escolhido | Caixa de Texto | Obrigatório                 |               |
| Valor total       | Número         | Obrigatório                 |               |

| Comandos       | Destino                         | Tipo    |
| -------------- | ------------------------------- | ------- |
| Criar contrato | Cliente assina contrato digital | default |

**Atividade: Funcionário registra locação no sistema**

| Campo             | Tipo          | Restrições                      | Valor default |
| ----------------- | ------------- | ------------------------------- | ------------- |
| ID locação        | Número        | Automático                      | Sequencial    |
| Data registro     | Data e Hora   | Automático                      | Data atual    |
| Status da locação | Seleção Única | Obrigatório (Ativa, Finalizada) | Ativa         |

| Comandos          | Destino                                | Tipo    |
| ----------------- | -------------------------------------- | ------- |
| Registrar locação | Funcionário entrega veículo ao cliente | default |

**Atividade: Funcionário entrega veículo ao cliente**

| Campo                  | Tipo          | Restrições | Valor default |
| ---------------------- | ------------- | ---------- | ------------- |
| Data e Hora da entrega | Data e Hora   | Automático | Data atual    |
| Observações da entrega | Área de texto |            |               |

| Comandos          | Destino         | Tipo    |
| ----------------- | --------------- | ------- |
| Confirmar entrega | Veículo alugado | default |

**Fim do processo:** Veículo alugado.
