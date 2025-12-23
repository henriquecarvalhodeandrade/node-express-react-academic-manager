# SGA - Sistema de Gerenciamento Acadêmico

## Descrição do Projeto

Este é um projeto Full-Stack desenvolvido para a disciplina de Desenvolvimento Web 2. A aplicação consiste em um sistema para gestão de alunos, professores e cursos, contando com um sistema de autenticação seguro.

## Tecnologias Utilizadas
Backend

    - Node.js com Express

    - MySQL (Banco de dados relacional)

    - Autenticação: Sessões com express-session e criptografia de senhas com bcrypt

    - Arquitetura: Padrão MVC (Model-View-Controller)

Frontend

    - React (Interface do usuário)

    - CSS Modules (Estilização modular)

## Funcionalidades
* Autenticação: Registro e login de usuários com senhas criptografadas.

* Gestão de Cursos: CRUD completo para cursos com carga horária.

* Gestão de Alunos: Cadastro de alunos vinculados a cursos (Chave Estrangeira).

* Gestão de Professores: Cadastro de docentes associados às suas áreas/cursos.

* Dashboard: Visualização centralizada dos dados do sistema.

## Estrutura do Banco de Dados
O sistema utiliza as seguintes tabelas:

* usuarios: Armazena credenciais de acesso (ID, Nome, Email, Senha/Hash).

* cursos: Nome do curso e carga horária.

* alunos: Dados pessoais e vínculo com curso_id.

* professores: Dados do docente e vínculo com curso_id.

## Equipe de Desenvolvimento

* Carlos Moreira - [GitHub](https://github.com/ChMoreiraa)
* Guilherme A. F. Ribeiro - [GitHub](https://github.com/guifrazao)
* Gustavo Alves  - [GitHub](https://github.com/SantosGAlves)
* Henrique C. de Andrade   - [GitHub](https://github.com/henriquecarvalhodeandrade)
* Kendy Outi   - [GitHub](https://github.com/KendyOuti)

## Como Executar o Projeto

### 1. Configurar o *Banco de Dados*
-  Execute os comandos contidos no arquivo "comandos_sql.txt" no seu terminal MySQL para criar o banco sga_db e as tabelas necessárias.

### 2. Configurar o *Backend*

1) sga-backend/
    ```bash
    npm install
2) Crie um arquivo .env na raiz da pasta sga-backend com as seguintes chaves: 
    ```bash
    DB_HOST=localhost
    DB_USER=seu_usuario
    DB_PASSWORD=sua_senha
    DB_DATABASE=sga_db
    SESSION_SECRET=uma_chave_secreta_segura
3) Para iniciar o servidor:
    ```bash
    node server.js
### 3. Configurar o *Frontend*
1) sga-frontend/
    ```bash
    npm install
    npm start
2) A aplicação estará disponível em http://localhost:3000.

## Resultados do Projeto

Confira abaixo uma demonstração das principais funcionalidades do sistema:

[![Assista ao vídeo](https://img.youtube.com/vi/lvUyLPJnfcs/0.jpg)](https://www.youtube.com/watch?v=lvUyLPJnfcs)

> [Clique aqui para assistir à demonstração no YouTube](https://www.youtube.com/watch?v=lvUyLPJnfcs)