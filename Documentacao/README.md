# Documentação do Projeto

## 1. Introdução
Partindo do pressuposto de automatização, eficiência, produtividade e otimização de processos de negócios locatários automotivos, a Loccar vem com uma ideia inovadora de sanar estes problemas com uma solução simples, descomplicada e efetiva. O planejamento e desenvolvimento de um software se faz necessário para estas adversidades enfrentadas por proprietários, sobretudo funcionários deste ramo de negócio.

Com base nesta contextualização de dificuldades enfrentadas por este público, será desenvolvido um software com Java e Spring Boot para o backend com API Rest, utilizaremos o banco de dados PostgreSQL e abordaremos a estilização e criação de páginas web com HTML, Bootstrap e React.

## 1.1. Contextualização 
Baseando-se na breve contextualização da seção de Introdução anterior, é notório apontar que, além destes problemas enfrentados por empregadores e funcionários em negócios de locação automotiva, a aliança com a tecnologia inexistente onde a inovação não é empregada, justifica um potencial cliente para a implantação de um sistema que soluciona e impulsiona este negócio que tanto exige.

Segundo o Jornal Edição do Brasil, o índice de aluguel de veículos no Brasil deu um salto de 33,5% em 2021. O faturamento bruto anual bateu recorde, chegando à casa de R$23,5 bilhões. Em 2020, esse número foi de R$17,6 bilhões, ainda sob o impacto das rígidas medidas de isolamento social causadas pela COVID-19. O crescimento da locação de automóveis no país chegou a 7,8% na comparação com o faturamento bruto verificado em 2019 (ano anterior ao início da pandemia).

Mediante estes dados estatísticos, é evidente que a inovação se sobressai e um software de gestão como a Loccar é imprescindível para não ficar atrás da concorrência. Estipulamos um aumento significativo nas locações e asseguramos sucesso no negócio do pequeno-médio empreendedor.

## 1.2. Problema
O setor de locação de veículos apresenta desafios significativos na gestão operacional, especialmente para locadoras de pequeno e médio porte. Muitas dessas empresas ainda utilizam processos manuais ou sistemas desatualizados, resultando em baixa eficiência, retrabalho e dificuldades na organização dos fluxos de locação.

Entre os principais problemas enfrentados estão:

- **Falta de um sistema centralizado**: A ausência de uma plataforma integrada dificulta o gerenciamento de clientes, veículos, contratos de locação e pagamentos, tornando os processos fragmentados e propensos a erros.
- **Baixa eficiência operacional**: Processos manuais, como registros de locações e controle de disponibilidade de veículos, geram atrasos, inconsistências nos dados e dificuldades na tomada de decisão.
- **Experiência do cliente comprometida**: A falta de automação impacta diretamente a agilidade no atendimento, ocasionando filas, demora na conclusão de contratos e insatisfação dos clientes.

Diante desses desafios, o projeto Loccar propõe uma solução inovadora para otimizar e automatizar os processos de locação de veículos. Através do uso de tecnologias modernas, o sistema busca aprimorar a gestão operacional, reduzir custos, melhorar a experiência do cliente e aumentar a competitividade das locadoras no mercado.

## 1.3. Objetivos geral e específicos
O objetivo geral da Loccar é a criação de uma solução, por meio de software, atendendo os seguintes processos: 
Processos: 
- Modelagem e elaboração do Cadastro de Clientes;
- Modelagem e elaboração Gestão de Carros;
- Modelagem e elaboração Locação;
- Avaliação de Aluguéis.

## 1.4. Justificativas
A crescente demanda pelo aluguel de veículos no Brasil demonstra a necessidade de ferramentas tecnológicas que facilitem a gestão desse tipo de negócio. Como destacado anteriormente, o setor de locação automotiva tem apresentado um crescimento expressivo, tanto em faturamento quanto em volume de locações. No entanto, muitas locadoras de pequeno e médio porte ainda operam com processos manuais ou com sistemas ultrapassados, o que impacta diretamente sua eficiência e competitividade no mercado.

Diante desse cenário, a Loccar surge como uma solução inovadora que visa automatizar e otimizar os processos essenciais da gestão de locação de veículos. O desenvolvimento desse software justifica-se pelos seguintes pontos:
- **Melhoria na Eficiência Operacional**: O sistema proporcionará maior agilidade na administração de clientes, gestão de veículos e controle de locações, reduzindo retrabalho e erros manuais.
- **Aprimoramento da Experiência do Cliente**: Com processos mais ágeis e organizados, o atendimento se torna mais rápido e eficiente, garantindo maior satisfação aos usuários do serviço.
- **Redução de custos e aumento da produtividade**: A automatização dos processos minimiza desperdícios e melhora o controle financeiro da locadora, impactando positivamente a lucratividade do negócio.
- **Facilidade de Acesso e Integração**: Utilizando tecnologias modernas como Java com Spring Boot, PostgreSQL, React e Bootstrap, a solução oferecerá uma interface intuitiva e responsiva, acessível a partir de diferentes dispositivos.
- **Diferencial Competitivo**: Com um software completo e inovador, as locadoras poderão acompanhar a evolução do mercado e se destacar da concorrência, garantindo uma gestão mais profissional e eficiente.

Dessa forma, o desenvolvimento da Loccar se justifica pela sua contribuição na modernização do setor de locação de veículos, agregando valor ao negócio e proporcionando melhorias significativas na operação diária dos gestores e funcionários.

---

## 2. Participantes do processo de negócio

### 2.1. Processos do Negócio
Os processos de negócio identificados para a locadora de veículos são:

- 2.1.1 Cadastro de Clientes
  - **Tipo de Processo:** Operacional
  - **Entradas:** Dados pessoais do cliente (Nome, CPF, CNH, Endereço, Telefone, E-mail, Forma de Pagamento, etc.).
  - **Saídas:** Registro do cliente no sistema com status ativo.
  - **Participantes:** Cliente, Funcionário do Atendimento.
  - **Setores envolvidos:** Atendimento ao Cliente.
  - **Atividades:**
    1. Cliente fornece os documentos necessários.
    2. Funcionário confere a documentação.
    3. Dados são cadastrados no sistema.
    4. Cliente recebe a confirmação do cadastro.

- 2.1.2 Gestão de Carros
  - **Tipo de Processo:** Operacional
  - **Entradas:** Dados do veículo (Placa, Modelo, Ano, Status, Quilometragem, Categoria, etc.).
  - **Saídas:** Veículo cadastrado no sistema e atualizado conforme disponibilidade.
  - **Participantes:** Gerente de Frota, Funcionário do Atendimento.
  - **Setores envolvidos:** Administração de Frota.
  - **Atividades:**
    1. Gerente de Frota cadastra novos veículos no sistema.
    2. Atualização periódica da disponibilidade dos carros.
    3. Monitoramento da quilometragem e estado de manutenção.
    4. Registro de manutenções preventivas e corretivas.

- 2.1.3 Locação
  - **Tipo de Processo:** Principal (Core Business)
  - **Entradas:** Solicitação de locação, seleção de veículo, contrato assinado.
  - **Saídas:** Veículo alugado e registro no sistema.
  - **Participantes:** Cliente, Funcionário do Atendimento, Gerente de Frota.
  - **Setores envolvidos:** Atendimento ao Cliente, Administração de Frota.
  - **Atividades:**
    1. Cliente solicita um carro disponível.
    2. Funcionário verifica a disponibilidade.
    3. Cliente assina o contrato de locação.
    4. Registro da transação no sistema.
    5. Veículo é entregue ao cliente.

- 2.1.4 Avaliação de Aluguéis
  - **Tipo de Processo:** Avaliação e Melhoria Contínua
  - **Entradas:** Registro de devolução, verificação de danos, feedback do cliente.
  - **Saídas:** Relatório de uso do veículo e feedback registrado.
  - **Participantes:** Cliente, Funcionário do Atendimento, Gerente de Frota.
  - **Setores envolvidos:** Atendimento ao Cliente, Administração de Frota.
  - **Atividades:**
    1. Cliente devolve o veículo.
    2. Funcionário verifica danos e estado do carro.
    3. Cliente fornece feedback sobre a experiência de aluguel.
    4. Relatório é gerado e armazenado no sistema.

### 2.2. Stakeholders e Papéis

- 2.2.1 Cliente
  - **Responsabilidades:**
    - Fornecer informações verídicas no cadastro.
    - Solicitar e devolver o veículo no prazo correto.
    - Fornecer feedback sobre a experiência.

- 2.2.2 Funcionário do Atendimento
  - **Responsabilidades:**
    - Cadastrar clientes e validar documentos.
    - Processar solicitações de locação.
    - Registrar informações no sistema.
    - Avaliar o estado dos veículos na devolução.
    - Cadastrar e gerenciar os veículos.
    - Monitorar manutenção e disponibilidade dos carros.
    - Registrar manutenções e controle de quilometragem.
    - Gerar relatórios sobre o uso da frota.
  
- 2.2.3 Administração
  - **Responsabilidades:**
    - Supervisionar o funcionamento da locadora.
    - Monitorar indicadores de desempenho.
    - Melhorar processos operacionais.
    - 
3. Proposta de Solução

3.1 Descrição Geral da Proposta de Solução
A proposta consiste no desenvolvimento de um sistema automatizado e integrado de gestão operacional para locadoras de veículos, acessível via web e dispositivos móveis. O sistema irá centralizar e simplificar os processos de cadastro e gestão de clientes, controle da frota de veículos, realização de locações e avaliação pós-locação. Os principais benefícios dessa solução incluem:

Cadastro centralizado de informações: Facilita o acesso rápido e seguro a dados de clientes e veículos.

Ferramentas avançadas de busca e filtros: Permite rápida localização e gestão eficiente dos recursos.

Automação completa do processo de locação: Contratos digitais e rastreamento em tempo real das transações.

Sistema integrado para avaliação pós-locação: Registro eficiente de feedback dos clientes e inspeção detalhada do estado dos veículos após devolução.

A solução utilizará tecnologias modernas, incluindo Java e Spring Boot para o backend com API Rest, banco de dados PostgreSQL e interface web responsiva com React e Bootstrap, garantindo robustez, segurança e facilidade de uso.

Essa solução oferece um diferencial competitivo significativo para as locadoras, permitindo maior agilidade, precisão nas operações diárias e uma tomada de decisão mais estratégica. Além disso, terá um impacto direto positivo nos funcionários, reduzindo tarefas manuais e burocráticas, aumentando a produtividade e melhorando as condições de trabalho.

Com essa abordagem integrada, espera-se uma melhora significativa na eficiência operacional, redução de custos operacionais e um aumento expressivo na satisfação e fidelização dos clientes.

Inclua documentação do projeto, como relatórios da PROEX.
