# Lawgic - Desafio Técnico Fullstack Júnior

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

Este repositório contém a solução completa para o Desafio Técnico Fullstack da Lawgic, incluindo uma API REST em NestJS (backend) e uma interface interativa em React (frontend).

## 🎯 Sobre o Projeto

O objetivo foi construir um sistema completo para gerenciar o ciclo de vida de uma notificação judicial. O fluxo permite criar uma notificação, preencher os dados da pessoa a ser notificada, e passar por uma etapa de validação onde a notificação pode ser aprovada ou rejeitada para ajustes.

A aplicação foi desenvolvida com foco em boas práticas, código limpo e uma arquitetura escalável, separando claramente as responsabilidades entre o backend e o frontend.

## ✨ Funcionalidades Principais

- ✔️ **Visualização e Filtragem:** Veja todas as notificações em uma tabela e filtre-as por status.
- ✔️ **Fluxo de 3 Etapas:** Crie, preencha e valide notificações seguindo o fluxo de negócio.
- ✔️ **Criação e Edição:** Um modal inteligente se adapta para criar, visualizar, preencher ou validar uma notificação.
- ✔️ **Validação de Formulários:** Feedback instantâneo no frontend para garantir que os dados inseridos (email, telefone) estejam no formato correto.
- ✔️ **Documentação de API:** O backend conta com uma documentação interativa via Swagger.
- ✔️ **Testes Automatizados:** O backend possui testes unitários e de ponta a ponta (E2E) para garantir a estabilidade.

## 🛠️ Tecnologias Utilizadas

#### Backend
- **Framework:** [NestJS](https://nestjs.com/)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Banco de Dados:** [MongoDB](https://www.mongodb.com/) (com [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- **ODM:** [Mongoose](https://mongoosejs.com/)
- **Testes:** [Jest](https://jestjs.io/) & [Supertest](https://github.com/ladjs/supertest)

#### Frontend
- **Biblioteca:** [React](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Roteamento:** [React Router DOM](https://reactrouter.com/)
- **Cliente HTTP:** [Axios](https://axios-http.com/)
- **Estilização:** CSS Puro

## 🚀 Como Rodar o Projeto Completo

Para ter a aplicação funcionando na sua máquina, siga os passos na ordem correta.

### Pré-requisitos
- [Node.js](https://nodejs.org/en/) (v18 ou superior)
- [MongoDB Community Server](https://www.mongodb.com/try/download/community) & [MongoDB Compass](https://www.mongodb.com/try/download/compass) (para a opção de banco de dados local)

### Passo 1: Clonar o Repositório

```bash
git clone [https://github.com/JoaoP3droMM/lawgic-system.git](https://github.com/JoaoP3droMM/lawgic-system.git)
cd lawgic-system
```

### Passo 2: Configurar e Rodar o Backend

O "cérebro" da aplicação precisa estar no ar primeiro.

1.  **Abra um terminal** e navegue até a pasta do backend:
    ```bash
    cd backend
    ```
2.  **Instale as dependências:**
    ```bash
    npm install
    ```
3.  **Configure o Banco de Dados:**
    * Crie um arquivo `.env` na pasta `backend`.
    * Dentro dele, adicione a variável `MONGO_URI` com a sua string de conexão (seja do Atlas ou local).
    * > Para um guia detalhado de como configurar o banco no Atlas ou localmente, consulte o **[README do Backend](./backend/README.md)**.

4.  **Inicie o servidor do backend:**
    ```bash
    npm run start:dev
    ```
    Se tudo deu certo, você verá a mensagem do NestJS. **Mantenha este terminal aberto!** O backend estará rodando em `http://localhost:3000`.

### Passo 3: Configurar e Rodar o Frontend

Agora, vamos ligar a "cara" da aplicação.

1.  **Abra um NOVO terminal** (não feche o do backend!). A partir da raiz do projeto, navegue até a pasta do frontend:
    ```bash
    cd frontend
    ```
2.  **Instale as dependências:**
    ```bash
    npm install
    ```
3.  **Inicie o servidor de desenvolvimento do frontend:**
    ```bash
    npm run dev
    ```

### Passo 4: Ver a Mágica Acontecer

-   A aplicação frontend estará disponível em **[http://localhost:5173](http://localhost:5173)** (ou na porta que o Vite indicar).
-   A documentação interativa da API (Swagger) estará em **[http://localhost:3000/api](http://localhost:3000/api)**.

## 🗺️ Estrutura do Repositório

-   **/backend:** Contém a API em NestJS. Possui seu próprio `README.md` com detalhes sobre os endpoints, testes e configuração.
-   **/frontend:** Contém a interface de usuário em React. Também possui um `README.md` com detalhes sobre a estrutura de pastas e como rodar o projeto.


---