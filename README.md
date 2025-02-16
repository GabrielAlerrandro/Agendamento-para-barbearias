# Projeto - Agendameento para Barbearias

Este projeto foi desenvolvido durante a **Full Stack Week**, com diversas modificações e melhorias feitas para agregar novas funcionalidades ao sistema. Algumas das funcionalidades adicionais estão destacadas nesta documentação, e algumas partes do projeto passaram por mudanças importantes.

## Aviso

Este repositório contém modificações e adições a funcionalidades que não fazem parte da versão original. Algumas das modificações incluem:

- Alteração na **Barra de Busca** para otimizar a busca de serviços .
- Criação do **Painel Admnistrativo** para os barbeiros.
- Inclusão do **Botão de Suporte pelo WhatsApp** para facilitar a comunicação com os usuários.
- Criação de **Formulários de Criação de Conta** personalizados para **Barbeiro** e **Cliente**.
- Ajuste no **Footer** para melhor usabilidade e organização.
- Integração com **Stripe**
- Nova Logo

## Funcionalidades

O sistema oferece várias funcionalidades voltadas para o agendamento e gestão de serviços, tanto para clientes quanto para barbeiros. Algumas das principais funcionalidades são:

### Para os **Clientes**:

- **Agendamento de serviços com barbeiros:** Os clientes podem agendar horários para cortar cabelo ou fazer outros serviços com barbeiros cadastrados.
- **Cancelamento de agendamentos:** O cliente tem a opção de cancelar agendamentos previamente realizados.
- **Integração com **Stripe**:** O sistema oferece uma integração básica com o Stripe para realizar pagamentos de forma segura ao agendar serviços.
  
### Para os **Barbeiros**:

- **Painel Administrativo:** Cada barbeiro possui um painel onde pode visualizar seus agendamentos, consultar horários livres e gerenciar suas informações pessoais.
- **Visualização de Agendamentos:** O barbeiro pode ver todos os agendamentos feitos pelos clientes, com detalhes sobre o serviço e horário.

### Funcionalidades Adicionais:

- **Cadastro de novos usuários:** O sistema permite o cadastro de novos clientes e barbeiros com formulários personalizados para cada perfil.
- **Visualização de Histórico de Agendamentos:** Clientes e barbeiros podem acessar o histórico de agendamentos realizados.
- **Filtro de Barbearias:** Clientes podem buscar barbearias.

## Tecnologias Utilizadas

- **Desenvolvimento  :** Next.js, Tailwind CSS
- **Banco de Dados:** PostgreSQL
- **ORM:** Prisma ORM
- **Integração de Pagamentos:** Stripe

## Como Rodar o Projeto

### 1. Clonar o Repositório

```bash
git clone https://github.com/GabrielAlerrandro/Sistema-Agendamento.git
```
```bash
cd projeto
```
```bash
npm install
```

```bash
npm run dev
```
