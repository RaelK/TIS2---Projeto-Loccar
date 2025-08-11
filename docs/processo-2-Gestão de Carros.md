### 3.3.2 Processo 2 – Gestão de Carros

**Nome:** Gestão de Carros

**Descrição do processo (passo a passo):**

1. **Visualização dos carros** (atividade manual).
2. **Gateway decisão: O que deseja fazer?**

   * **Cadastro**: Funcionário cadastra veículo no sistema.
   * **Visualizar**: Visualizar carro.
3. **Funcionário cadastra veículo no sistema** (atividade do usuário - *User Task*).
4. **Funcionário registra manutenções preventivas/corretivas** (atividade manual).
5. **Veículo fica disponível para visualização** (atividade automática).
6. **Gateway decisão: Veículo pode ser alugado?**

   * Se **SIM**, funcionário atualiza disponibilidade dos veículos.
   * Se **NÃO**, funcionário atualiza situação e carro é reenviado para manutenção.
7. **Funcionário atualiza situação e carro é reenviado para manutenção** (atividade manual).
8. **Funcionário atualiza disponibilidade dos veículos** (atividade do usuário - *User Task*).
9. **Fim do processo:** Veículo cadastrado e atualizado.

**Tipo das atividades:**

* **Atividades manuais:** Visualização dos carros, registro de manutenções preventivas/corretivas, atualização da situação.
* **Atividades do usuário (User Tasks):** Cadastro do veículo no sistema, atualização da disponibilidade dos veículos.
* **Atividades automáticas:** Veículo fica disponível para visualização.

---

**Oportunidades de melhoria:**

* Implementar alertas automáticos para manutenções preventivas.
* Integrar sensores IoT para monitorar estado dos veículos em tempo real.

#### Modelo do Processo (BPMN)

O modelo atualizado está representado conforme o diagrama BPMN abaixo:

![image](https://github.com/user-attachments/assets/6ef0e127-f3eb-4b42-afe7-188b28511241)



**CRUD Relacionado:**

* Create: Cadastro do veículo
* Read: Visualização do veículo
* Update: Atualização de manutenção e status
* Delete: (não implementado)

#### Detalhamento das atividades

**Nome da atividade: Funcionário cadastra veículo no sistema**

| Campo             | Tipo           | Restrições                          | Valor default |
| ----------------- | -------------- | ----------------------------------- | ------------- |
| Placa             | Caixa de Texto | Formato válido (ex: ABC1D23)        |               |
| Modelo            | Seleção Única  | Lista pré-definida (ex: Sedan, SUV) |               |
| Data de Aquisição | Data           | Data passada ou atual               |               |
| KM Atual          | Número         | ≥ 0                                 |               |

| Comandos | Destino                                                 | Tipo    |
| -------- | ------------------------------------------------------- | ------- |
| Salvar   | Funcionário registra manutenções preventivas/corretivas | default |
| Cancelar | Visualização dos carros                                 | cancel  |

**Nome da atividade: Veículo fica disponível para visualização**

*Atividade automática (sistema).* Nenhuma interação do usuário.

**Gateway de Decisão: Veículo pode ser alugado?**

| Condição | Destino                                                           |
| -------- | ----------------------------------------------------------------- |
| SIM      | Funcionário atualiza disponibilidade dos veículos                 |
| NÃO      | Funcionário atualiza situação e carro é reenviado para manutenção |

**Nome da atividade: Funcionário atualiza disponibilidade dos veículos**

| Campo               | Tipo          | Restrições                      | Valor default |
| ------------------- | ------------- | ------------------------------- | ------------- |
| Status              | Seleção Única | Disponível, Alugado, Manutenção |               |
| Data de Atualização | Data e Hora   | Data atual automática           | Data atual    |

| Comandos  | Destino                         | Tipo    |
| --------- | ------------------------------- | ------- |
| Confirmar | Veículo cadastrado e atualizado | default |

**Fim do processo:** Veículo cadastrado e atualizado.
