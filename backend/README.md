# Lawgic - Desafio Técnico Fullstack Júnior

Uma API REST feita com NestJS para gerenciar o fluxo de Notificações Judiciais.

## 🎯 Objetivo

O objetivo do projeto foi construir uma API robusta para controlar o ciclo de vida de uma notificação judicial. O fluxo é simples, criamos a notificação, a preenchemos com os dados da pessoa a ser notificada, ela passa por uma validação onde pode ser aprovada ou recusada e finalmente é concluída

Tudo isso seguindo os bons costumes de uma API REST, com um código limpo e organizado pra ser fácil de dar manutenção (ou de um dev curioso entender o que tá rolando)

### Por que MongoDB? mongodb
Para guardar as informações eu optei pelo **MongoDB** pela facilidade de criar um banco em núvem com o **MongoDB Atlas**, assim caso o testador não queira baixar o mongo e configurar, isso já está montado e configurado na nuvem, facilitando o processo. Mas também há um tutorial de instalação caso o usuário deseje rodar o banco localmente.


## ✨ O que o sistema faz?

- ✔️ **Cria** notificações do zero.
- ✔️ **Atualiza** os dados da notificação e da pessoa que vai receber a "boa" notícia.
- ✔️ **Controla o fluxo** com status pré-definidos (`EM_ANDAMENTO` -> `VALIDACAO` -> `CONCLUIDO`).
- ✔️ **Lista** tudo que tem no banco, com um filtro opcional por status.
- ✔️ **Busca** a notificação pelo ID específico.
- ✔️ **Deleta** uma notificação.
- ✔️ **Valida** uma notificação.

## 🛠️ A Caixa de Ferramentas

- **Backend:** [NestJS](https://nestjs.com/)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Banco de Dados:** [MongoDB](https://www.mongodb.com/)
- **ODM (O que fala com o banco):** [Mongoose](https://mongoosejs.com/)
- **Validação:** `class-validator`, `class-transformer`

## 🚀 Botando pra rodar!

Bora lá, sem mistério. Pra ter essa API funcionando na sua máquina, é só seguir os passos.

### 1. O que você precisa ter aí

- [Node.js](https://nodejs.org/en/) (versão 18 ou mais recente)
- Um cliente de API, tipo o [Postman](https://www.postman.com/) ou [Insomnia](https://insomnia.rest/), pra brincar com os endpoints.

### 2. Preparando o Terreno

```bash
# Primeiro, clona o projeto pra sua máquina
git clone [https://github.com/JoaoP3droMM/lawgic-system.git](https://github.com/seu-usuario/seu-repositorio.git)

# Entra na pasta do backend
cd seu-repositorio/backend

# Roda esse comando pra instalar todas as dependências do projeto
npm install
```

### 3. Configurando o Banco de Dados

Aqui você tem duas opções. A primeira é a mais fácil e recomendada!

#### Opção 1 (Recomendada): Usando o MongoDB Atlas (Na Nuvem) ☁️

Para a API funcionar, ela precisa conversar com um banco de dados. Para facilitar sua vida (e a minha), o banco deste projeto já está configurado e rodando na nuvem no **MongoDB Atlas**.

Isso significa que você **não precisa instalar, criar ou configurar NADA** relacionado ao banco

#### Opção 2 (Alternativa): Rodando um Banco Local na Mão 🖥️

Se você prefere ter o MongoDB instalado de verdade na sua máquina, sem problemas! O processo é mais visual, usando a ferramenta oficial **MongoDB Compass**.

**Pré-requisitos:**

- Ter o [MongoDB Community Server](https://www.mongodb.com/try/download/community) instalado.
- Ter o [MongoDB Compass](https://www.mongodb.com/try/download/compass) instalado (geralmente já vem junto com o Server).

**Passo 1: Conecte-se ao seu banco local**

1.  Abra o **MongoDB Compass**.
2.  Ele provavelmente já vai te sugerir a URL de conexão padrão para um banco local: `mongodb://localhost:27017`.
3.  Não precisa mudar nada, apenas clique em **Connect**.

**Passo 2: Crie o Banco de Dados**

Nossa API precisa de um lugar para guardar as coisas. Vamos criar o banco para ela.

1.  Na tela principal do Compass, clique na aba **Databases**.
2.  Clique no botão verde **Create Database**.
3.  Preencha os campos:
    * **Database Name:** `lawgic_db`
    * **Collection Name:** `lawgic` (o MongoDB exige que você crie pelo menos uma "gaveta" inicial).
4.  Clique em **Create Database**.

**Passo 3: Crie um Usuário para a API (Opcional, mas recomendado)**

Para manter as coisas organizadas e seguras, é uma boa prática criar um usuário específico para a nossa aplicação.

1.  Na lista de bancos à esquerda, clique com o botão direito no banco `lawgic_db` que acabamos de cirar.
2.  Selecione a opção **Open MongoDB Shell**.
3.  Cole o comando: `use admin` e pressione enter. Ele deve responder com switched to db admin
4.  Cole o comando abaixo e pressione enter novamente:
    ```
      db.createUser({
        user: "admin",
        pwd: "admin",
        roles: [ { role: "readWriteAnyDatabase", db: "admin" } ]
      })
    ``` 
5.  Se ele retornou a mensagem { ok: 1 }, pode fechar este terminal, o usuário foi criado com sucesso!

**Passo 4: Monte sua String de Conexão Local**

Agora, com tudo criado, a sua string de conexão para o arquivo `"app.module.ts"` será a seguinte. Lembre-se de usar o usuário e senha que você acabou de criar.

``` 
"mongodb://admin:admin@localhost:27017/lawgic_db?authSource=admin"
```
Agora é só colar essa string no seu arquivo `"app.module.ts"`, dentro do parênteses de **MongooseModule.forRoot**, ou descomentar a linha que já configura ela, iniciar a aplicação com `npm start` e tudo funcionará localmente!


### 4. Ligando os Motores!

Com tudo pronto, finalmente, inicie o servidor:

```bash
npm start
```

Se tudo deu certo, você verá uma mensagem do NestJS no terminal. Sua API já está no ar em `http://localhost:3000`.

## 🧪 Testes Automatizados

Para garantir a qualidade e a estabilidade do código, o projeto conta com uma suíte de testes automatizados utilizando Jest.

### Testes Unitários

Testam as menores partes do sistema (as "unidades"), como os métodos do `Service` e do `Controller`, de forma totalmente isolada. Usamos "mocks" (dublês) para simular dependências como o banco de dados, garantindo que a **lógica de negócio** está correta sem tocar no banco de dados de verdade.

### Testes de Ponta a Ponta (E2E)

Eles simulam o fluxo completo, como se um usuário estivesse fazendo requisições HTTP reais. Os testes E2E iniciam a aplicação inteira e se conectam a um **banco de dados de teste local** para validar se todos os componentes (Controller, Service, Banco) estão conversando entre si corretamente.

**Configurando o Banco de Testes E2E (Obrigatório)**

Os testes E2E precisam de um banco de dados separado para não interferir com seus dados de desenvolvimento.

1.  Seguindo os mesmos passos da **Opção 2** acima, crie um **segundo banco de dados local** no MongoDB Compass com o nome `lawgic_db_test`. (Você não precisa criar o usuário de novo, pois ele já tem acesso a todos os bancos).
2.  Caso você mude o nome do banco ou queira outro usuário, mo arquivo `package.json`, modifique a seguinte linha com a URL correspondente para este novo banco:
    ```
    mongodb://admin:admin@localhost:27017/lawgic_db_Teste?authSource=admin jest--config ./test/jest-e2e.json"
    ```

  

### Rodando os Testes

Com tudo configurado, use os seguintes comandos na pasta `backend`:

```bash
# Roda apenas os testes unitários (rápidos e não usam banco)
npm run test

# Roda apenas os testes E2E (usando o banco de testes local)
npm run test:e2E

# Roda TODOS os testes e gera um relatório de cobertura
npm run test:cov
```

## 🔌 Documentação Interativa da API (Swagger)

Este projeto utiliza o Swagger (OpenAPI) para gerar uma documentação da API completa e interativa. Com ela, você pode ver todos os endpoints disponíveis, seus parâmetros, e até mesmo **testar a API diretamente pelo navegador**.

### Como Acessar

1.  Com a aplicação rodando (após o passo `npm start`), abra seu navegador.
2.  Acesse a seguinte URL: **[http://localhost:3000/api](http://localhost:3000/api)**

Você verá a interface do Swagger UI, onde toda a "conversa" com a API está documentada e pronta para ser explorada.