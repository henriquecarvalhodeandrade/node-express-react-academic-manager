# 🎓 SGA — Sistema de Gerenciamento Acadêmico

> Aplicação web full-stack para gestão de alunos, professores e cursos de uma instituição de ensino. Desenvolvida com Node.js + Express no backend e React no frontend.

[![Backend](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-green?logo=node.js)](./sga-backend)
[![Frontend](https://img.shields.io/badge/Frontend-React%2019-blue?logo=react)](./sga-frontend)
[![Banco de Dados](https://img.shields.io/badge/Banco%20de%20Dados-MySQL-orange?logo=mysql)](./comandos_sql.txt)
[![Deploy Backend](https://img.shields.io/badge/Deploy%20Backend-Render-purple?logo=render)](https://render.com)
[![Deploy Frontend](https://img.shields.io/badge/Deploy%20Frontend-Vercel-black?logo=vercel)](https://vercel.com)

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Stack Tecnológica](#-stack-tecnológica)
- [Arquitetura](#-arquitetura)
- [Estrutura de Pastas](#-estrutura-de-pastas)
- [Como Rodar Localmente](#-como-rodar-localmente)
- [Deploy em Produção](#-deploy-em-produção)
- [Variáveis de Ambiente](#-variáveis-de-ambiente)
- [API — Endpoints](#-api--endpoints)
- [Banco de Dados](#-banco-de-dados)
- [Segurança](#-segurança)

---

## 📖 Sobre o Projeto

O **SGA (Sistema de Gerenciamento Acadêmico)** é uma aplicação web completa que permite a uma instituição de ensino gerenciar seus recursos acadêmicos por meio de uma interface moderna e intuitiva.

O sistema implementa um fluxo completo de autenticação com sessões de servidor e protege todas as operações de dados atrás de uma camada de autorização. Toda a comunicação entre frontend e backend ocorre via REST API com suporte a cookies cross-origin.

---

## ✅ Funcionalidades

### Autenticação
- 🔐 Cadastro de usuário com senha criptografada (bcrypt)
- 🔑 Login com sessão persistente (express-session + cookie)
- 🚪 Logout com destruição segura de sessão
- 🛡️ Proteção de rotas: redireciona para `/login` se não autenticado

### Alunos
- 📋 Listagem de todos os alunos com nome do curso (JOIN SQL)
- ➕ Cadastro de novo aluno com vínculo a um curso
- ✏️ Edição de dados do aluno (nome, matrícula, data de nascimento)
- 🔄 Transferência de curso do aluno
- 🗑️ Exclusão de aluno

### Professores
- 📋 Listagem de todos os professores com nome do curso (JOIN SQL)
- ➕ Cadastro de novo professor com vínculo opcional a um curso
- ✏️ Edição de dados do professor (nome, matrícula)
- 🔄 Atribuição/alteração de curso do professor
- 🗑️ Exclusão de professor

### Cursos
- 📋 Listagem de todos os cursos
- ➕ Cadastro de novo curso (nome + carga horária)
- ✏️ Edição de curso
- 🗑️ Exclusão de curso (bloqueada se houver alunos vinculados)

---

## 🛠️ Stack Tecnológica

### Backend (`sga-backend/`)
| Tecnologia | Versão | Uso |
|---|---|---|
| Node.js | LTS | Runtime JavaScript |
| Express | 5.x | Framework HTTP |
| MySQL2 | 3.x | Driver do banco de dados |
| express-session | 1.x | Gerenciamento de sessões |
| bcrypt | 6.x | Hash de senhas |
| dotenv | 17.x | Variáveis de ambiente |
| cors | 2.x | Políticas de CORS |

### Frontend (`sga-frontend/`)
| Tecnologia | Versão | Uso |
|---|---|---|
| React | 19.x | Biblioteca de UI |
| React Router DOM | 7.x | Roteamento SPA |
| Axios | 1.x | Cliente HTTP |
| CSS Modules | — | Estilização escopada |

### Infraestrutura
| Serviço | Função |
|---|---|
| **Render** | Hospedagem do backend (Node.js) |
| **Vercel** | Hospedagem do frontend (React estático) |
| **MySQL** | Banco de dados relacional (PlanetScale, Railway, ou outro) |

---

## 🏗️ Arquitetura

```
┌─────────────────────────────────────────────────────────────────┐
│                        USUÁRIO (Navegador)                      │
└─────────────────────────┬───────────────────────────────────────┘
                          │ HTTPS
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                     VERCEL (Frontend)                           │
│              React SPA — Build Estático                         │
│                                                                 │
│  App.js → AuthProvider → PrivateRoute                          │
│  ├── /           → Home.js                                     │
│  ├── /login      → Login.js       ──→ api/authApi.js           │
│  ├── /register   → Register.js    ──→ api/authApi.js           │
│  ├── /dashboard  → Dashboard.js                                │
│  ├── /alunos     → Alunos.js      ──→ api/alunosApi.js         │
│  ├── /cursos     → Cursos.js      ──→ api/cursosApi.js         │
│  └── /professores→ Professores.js ──→ api/professoresApi.js    │
│                            │                                   │
│                   api/sgaApi.js (Axios + withCredentials)      │
└────────────────────────────┼────────────────────────────────────┘
                             │ HTTPS + Cookie de Sessão
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                     RENDER (Backend)                            │
│              Node.js + Express API REST                         │
│                                                                 │
│  server.js                                                     │
│  ├── CORS (FRONTEND_URL)                                       │
│  ├── express-session (cookie seguro)                           │
│  ├── /api/auth/*       → authRoutes    → authController        │
│  ├── /api/alunos/*     → alunoRoutes   → alunoController      │
│  ├── /api/cursos/*     → cursoRoutes   → cursoController       │
│  └── /api/professores/*→ professorRoutes→ professorController  │
│            │                   │                               │
│     isAuthenticated     models/ (queries SQL)                  │
└────────────────────────────┼────────────────────────────────────┘
                             │ Pool TCP
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    BANCO DE DADOS MySQL                         │
│           Tabelas: usuarios, alunos, professores, cursos        │
└─────────────────────────────────────────────────────────────────┘
```

### Fluxo de Autenticação

```
1. Usuário faz login → POST /api/auth/login
2. Backend valida credenciais com bcrypt.compare()
3. Backend cria sessão: req.session.userId = user.id
4. Cookie "connect.sid" é enviado ao navegador (httpOnly, secure)
5. Todas as próximas requisições enviam o cookie automaticamente
6. isAuthenticated middleware verifica req.session.userId
7. No logout: req.session.destroy() + res.clearCookie()
```

---

## 📁 Estrutura de Pastas

```
node-express-react-academic-manager/
│
├── sga-backend/                     # API REST (Node.js + Express)
│   ├── server.js                    # Entry point — configura e inicia o Express
│   ├── package.json                 # Dependências e scripts npm
│   ├── .env                         # Variáveis de ambiente (NÃO comitar)
│   ├── .env.example                 # Template das variáveis de ambiente
│   └── src/
│       ├── config/
│       │   ├── db.js                # Pool de conexões MySQL
│       │   └── session.js           # Configuração do express-session
│       ├── controllers/
│       │   ├── authController.js    # Lógica de login, logout, register
│       │   ├── alunoController.js   # CRUD de alunos
│       │   ├── cursoController.js   # CRUD de cursos
│       │   └── professorController.js # CRUD de professores
│       ├── middlewares/
│       │   └── authMiddleWare.js    # Verifica req.session.userId
│       ├── models/
│       │   ├── userModel.js         # Queries de usuários
│       │   ├── alunoModel.js        # Queries de alunos (com JOIN)
│       │   ├── cursoModel.js        # Queries de cursos
│       │   └── professorModel.js    # Queries de professores (com JOIN)
│       └── routes/
│           ├── authRoutes.js        # /api/auth/*
│           ├── alunoRoutes.js       # /api/alunos/*
│           ├── cursoRoutes.js       # /api/cursos/*
│           └── professorRoutes.js   # /api/professores/*
│
├── sga-frontend/                    # SPA React
│   ├── package.json
│   ├── .env.example                 # Template das variáveis
│   ├── .env.production              # Config de produção (URL do Render)
│   └── src/
│       ├── App.js                   # Roteamento principal + PrivateRoute
│       ├── AuthContext.js           # Context API: estado global de autenticação
│       ├── api/
│       │   ├── sgaApi.js            # Instância Axios (baseURL + withCredentials)
│       │   ├── authApi.js           # Chamadas de auth (login, register, logout)
│       │   ├── alunosApi.js         # CRUD de alunos
│       │   ├── cursosApi.js         # CRUD de cursos
│       │   └── professoresApi.js    # CRUD de professores
│       ├── components/
│       │   ├── Navbar.js
│       │   ├── Header.js
│       │   ├── Footer.js
│       │   ├── AlunoCard.js
│       │   ├── CursoCard.js
│       │   ├── ProfessorCard.js
│       │   └── Forms/
│       ├── pages/
│       │   ├── Home.js
│       │   ├── Login.js
│       │   ├── Register.js
│       │   ├── Dashboard.js
│       │   ├── Alunos.js
│       │   ├── Cursos.js
│       │   └── Professores.js
│       └── styles/
│           ├── globals.css
│           ├── components/
│           └── pages/
│
├── comandos_sql.txt                 # Scripts SQL para criar o banco de dados
└── README.md
```

---

## 🚀 Como Rodar Localmente

### Pré-requisitos

- [Node.js](https://nodejs.org/) 18+ instalado
- [MySQL](https://www.mysql.com/) 8+ rodando localmente
- Git

### 1. Clone o repositório

```bash
git clone https://github.com/SEU_USUARIO/node-express-react-academic-manager.git
cd node-express-react-academic-manager
```

### 2. Configure o banco de dados

Crie o banco e as tabelas usando os scripts em `comandos_sql.txt`:

```bash
mysql -u root -p < comandos_sql.txt
```

Ou abra o arquivo manualmente no MySQL Workbench e execute os comandos.

### 3. Configure o backend

```bash
cd sga-backend

# Instale as dependências
npm install

# Crie o arquivo de variáveis de ambiente
cp .env.example .env
```

Edite o arquivo `.env` com suas credenciais locais do MySQL:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha_aqui
DB_DATABASE=sga_db
DB_PORT=3306
SESSION_SECRET=gere_uma_chave_forte_aqui
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
PORT=3001
```

Inicie o servidor:

```bash
npm run dev    # Com nodemon (hot reload)
# ou
npm start      # Sem hot reload
```

O backend estará disponível em: `http://localhost:3001`

### 4. Configure o frontend

```bash
# Em outro terminal, a partir da raiz do projeto
cd sga-frontend

# Instale as dependências
npm install

# (Opcional) Crie o arquivo de variáveis locais
# O padrão já aponta para localhost:3001, só é necessário se quiser sobrescrever
cp .env.example .env.local
```

Inicie o servidor de desenvolvimento:

```bash
npm start
```

O frontend estará disponível em: `http://localhost:3000`

---

## ☁️ Deploy em Produção

A arquitetura de produção usa:
- **Render** → hospeda o backend Node.js (serviço web persistente)
- **Vercel** → hospeda o frontend React (build estático)
- **MySQL** na nuvem → ex: [PlanetScale](https://planetscale.com/), [Railway](https://railway.app/), [Clever Cloud](https://www.clever-cloud.com/)

### Passo 1 — Deploy do Backend no Render

1. Crie uma conta em [render.com](https://render.com) e conecte seu repositório GitHub.

2. Clique em **New → Web Service** e selecione o repositório.

3. Configure o serviço:
   - **Root Directory:** `sga-backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment:** `Node`

4. Adicione as **variáveis de ambiente** no painel do Render (Environment → Add Environment Variable):

   | Variável | Valor |
   |---|---|
   | `DB_HOST` | Host do seu MySQL na nuvem |
   | `DB_USER` | Usuário do MySQL |
   | `DB_PASSWORD` | Senha do MySQL |
   | `DB_DATABASE` | `sga_db` |
   | `DB_PORT` | `3306` (ou a porta do seu provedor) |
   | `SESSION_SECRET` | String aleatória de 64+ caracteres* |
   | `FRONTEND_URL` | URL do Vercel (preencher após deploy do frontend) |
   | `NODE_ENV` | `production` |

   > *Para gerar o SESSION_SECRET, rode no terminal:
   > ```bash
   > node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   > ```

5. Clique em **Create Web Service**. O Render irá construir e iniciar o backend.

6. Anote a URL gerada (ex: `https://sga-api.onrender.com`). Você precisará dela para configurar o frontend.

7. Volte ao Render e atualize a variável `FRONTEND_URL` com a URL do Vercel após o passo 2.

---

### Passo 2 — Deploy do Frontend no Vercel

1. Crie uma conta em [vercel.com](https://vercel.com) e conecte seu repositório GitHub.

2. Clique em **Add New → Project** e importe o repositório.

3. Configure o projeto:
   - **Root Directory:** `sga-frontend`
   - **Framework Preset:** `Create React App`
   - **Build Command:** `npm run build` *(preenchido automaticamente)*
   - **Output Directory:** `build` *(preenchido automaticamente)*

4. Adicione a **variável de ambiente** no painel do Vercel (Settings → Environment Variables):

   | Variável | Valor |
   |---|---|
   | `REACT_APP_API_URL` | `https://sga-api.onrender.com/api` *(URL do Render + `/api`)* |

   > ⚠️ No React, variáveis de ambiente acessíveis no código **devem** começar com `REACT_APP_`.

5. Clique em **Deploy**. O Vercel irá fazer o build e publicar o frontend.

6. Acesse a URL gerada (ex: `https://sga-academico.vercel.app`) e teste a aplicação.

---

### Passo 3 — Conectar os dois serviços

1. No painel do **Render**, atualize a variável `FRONTEND_URL` com a URL exata do **Vercel**:
   ```
   FRONTEND_URL=https://sga-academico.vercel.app
   ```

2. O Render irá restartar automaticamente o serviço com a nova configuração.

3. Teste o fluxo completo: acesse o frontend → faça login → verifique se as operações CRUD funcionam.

---

## 🔧 Variáveis de Ambiente

### Backend (`sga-backend/.env`)

| Variável | Obrigatória | Descrição | Exemplo |
|---|---|---|---|
| `DB_HOST` | ✅ | Host do servidor MySQL | `localhost` |
| `DB_USER` | ✅ | Usuário do MySQL | `root` |
| `DB_PASSWORD` | ✅ | Senha do MySQL | `minha_senha` |
| `DB_DATABASE` | ✅ | Nome do banco de dados | `sga_db` |
| `DB_PORT` | ❌ | Porta do MySQL (padrão: 3306) | `3306` |
| `SESSION_SECRET` | ✅ | Chave secreta para cookies de sessão | string aleatória longa |
| `FRONTEND_URL` | ✅ | URL do frontend autorizado pelo CORS | `https://sga.vercel.app` |
| `NODE_ENV` | ✅ | Ambiente (`development` ou `production`) | `production` |
| `PORT` | ❌ | Porta HTTP (padrão: 3001, Render define automaticamente) | `3001` |

### Frontend (`sga-frontend/.env.production` ou painel Vercel)

| Variável | Obrigatória | Descrição | Exemplo |
|---|---|---|---|
| `REACT_APP_API_URL` | ✅ | URL base da API do backend | `https://sga-api.onrender.com/api` |

---

## 📡 API — Endpoints

Todos os endpoints abaixo (exceto auth) requerem autenticação via cookie de sessão.

### Autenticação — `/api/auth`

| Método | Endpoint | Autenticação | Descrição |
|---|---|---|---|
| `POST` | `/api/auth/register` | ❌ | Cadastra novo usuário |
| `POST` | `/api/auth/login` | ❌ | Realiza login e cria sessão |
| `POST` | `/api/auth/logout` | ❌ | Encerra a sessão |
| `GET` | `/api/auth/me` | ✅ | Retorna dados do usuário logado |

### Alunos — `/api/alunos`

| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/api/alunos` | Lista todos os alunos (com nome do curso) |
| `GET` | `/api/alunos/:id` | Busca aluno por ID |
| `POST` | `/api/alunos` | Cadastra novo aluno |
| `PUT` | `/api/alunos/:id` | Atualiza dados do aluno |
| `PUT` | `/api/alunos/:id/curso` | Transfere aluno para outro curso |
| `DELETE` | `/api/alunos/:id` | Exclui aluno |

### Professores — `/api/professores`

| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/api/professores` | Lista todos os professores (com nome do curso) |
| `GET` | `/api/professores/:id` | Busca professor por ID |
| `POST` | `/api/professores` | Cadastra novo professor |
| `PUT` | `/api/professores/:id` | Atualiza dados do professor |
| `PUT` | `/api/professores/:id/curso` | Atribui/altera curso do professor |
| `DELETE` | `/api/professores/:id` | Exclui professor |

### Cursos — `/api/cursos`

| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/api/cursos` | Lista todos os cursos |
| `GET` | `/api/cursos/:id` | Busca curso por ID |
| `POST` | `/api/cursos` | Cadastra novo curso |
| `PUT` | `/api/cursos/:id` | Atualiza curso |
| `DELETE` | `/api/cursos/:id` | Exclui curso (bloqueado se houver alunos vinculados) |

---

## 🗄️ Banco de Dados

### Diagrama de Entidades

```
┌──────────────┐         ┌──────────────────┐
│   usuarios   │         │      cursos      │
├──────────────┤         ├──────────────────┤
│ id (PK)      │         │ id (PK)          │
│ nome         │         │ nome_curso       │
│ email (UNIQUE│         │ carga_horaria    │
│ senha (hash) │         └────────┬─────────┘
└──────────────┘                  │ 1
                                  │
                    ┌─────────────┴──────────────┐
                    │                            │
                    │ N                          │ N
         ┌──────────┴───────┐        ┌──────────┴───────┐
         │      alunos      │        │    professores   │
         ├──────────────────┤        ├──────────────────┤
         │ id (PK)          │        │ id (PK)          │
         │ nome             │        │ nome             │
         │ matricula (UNIQUE│        │ matricula (UNIQUE│
         │ curso_id (FK)    │        │ curso_id (FK)    │
         │ data_nascimento  │        └──────────────────┘
         │ ativo            │
         └──────────────────┘
```

Para criar o banco, execute os scripts disponíveis em `comandos_sql.txt`.

---

## 🔐 Segurança

| Mecanismo | Implementação |
|---|---|
| **Hash de senhas** | bcrypt com salt rounds = 10 |
| **Sessões seguras** | `httpOnly: true` + `secure: true` (produção) + `sameSite: 'none'` |
| **Prevenção de SQL Injection** | Queries parametrizadas com `?` em todas as operações |
| **Autorização de rotas** | Middleware `isAuthenticated` em todos os endpoints CRUD |
| **CORS restritivo** | Apenas o domínio do Vercel tem acesso à API |
| **Variáveis de ambiente** | Nenhuma credencial hardcoded no código |
| **Proteção de rotas no frontend** | Componente `PrivateRoute` redireciona para `/login` |

---

## 📄 Licença

Este projeto está sob a licença ISC.