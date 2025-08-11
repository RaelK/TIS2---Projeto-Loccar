### 3.3.1 Processo 1 – Cadastro de Clientes

**Descrição do processo (passo a passo):**

1. **Cliente solicita cadastro** (atividade manual realizada pelo cliente).
2. **Cliente envia documentos pessoais** (atividade manual realizada pelo cliente).
3. **Funcionário confere documentação recebida** (atividade manual realizada pelo funcionário).
4. **Gateway decisão: Documentação correta?**

   * Se **não**, retorna para o cliente enviar novamente documentos pessoais.
   * Se **sim**, segue para cadastro no sistema.
5. **Funcionário realiza cadastro no sistema** (atividade do usuário - *User Task*).
6. **Sistema gera confirmação automática** (atividade automática realizada pelo sistema).
7. **Fim do processo:** Cliente cadastrado e recebe confirmação.

**Tipo das atividades:**

* **Atividades manuais:** Cliente solicita cadastro, Cliente envia documentos pessoais, Funcionário confere documentação recebida.
* **Atividades do usuário (User Tasks):** Funcionário realiza cadastro no sistema.
* **Atividades automáticas:** Sistema gera confirmação automática.

---

**Oportunidades de melhoria:**

* Aprimorar validação automática dos documentos.
* Utilizar reconhecimento automático de documentos para agilizar a inserção de dados.

#### Modelo do Processo (BPMN)

O modelo atualizado está representado conforme o diagrama BPMN abaixo:

![image](https://github.com/user-attachments/assets/77056f86-4c25-44d8-a073-dc9eba8be70f)


---

#### Detalhamento das atividades

**Nome da atividade: Funcionário realiza cadastro no sistema**

| Campo         | Tipo           | Restrições                  | Valor default |
| ------------- | -------------- | --------------------------- | ------------- |
| Nome completo | Caixa de Texto | Obrigatório                 |               |
| CPF/CNH       | Número         | Obrigatório, 11 dígitos     |               |
| Endereço      | Caixa de Texto | Obrigatório                 |               |
| Telefone      | Número         | Obrigatório, formato válido |               |
| E-mail        | Caixa de Texto | Obrigatório, formato válido |               |

| Comandos | Destino                                   | Tipo    |
| -------- | ----------------------------------------- | ------- |
| Salvar   | Sistema gera confirmação automática       | default |
| Voltar   | Funcionário confere documentação recebida | cancel  |

**Nome da atividade: Sistema gera confirmação automática**

*Atividade automática (sistema).* Nenhuma interação do usuário.

**Fim do processo:** Cliente cadastrado e recebe confirmação.

