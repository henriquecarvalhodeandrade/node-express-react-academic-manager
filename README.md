# 🎓 SGA — Sistema de Gerenciamento Acadêmico

Aplicação web full-stack para gestão de alunos, professores e cursos de uma instituição de ensino.

**🔗 Demo ao vivo:** [sga-frontend-roan.vercel.app](https://sga-frontend-roan.vercel.app)

---

## ✨ Funcionalidades

- 🔐 **Autenticação completa** — cadastro, login e logout com sessão segura
- 👨‍🎓 **Alunos** — listar, cadastrar, editar dados, transferir de curso e excluir
- 👨‍🏫 **Professores** — listar, cadastrar, editar dados, atribuir curso e excluir
- 📚 **Cursos** — listar, cadastrar, editar e excluir (com proteção de integridade referencial)
- 🛡️ **Rotas protegidas** — todas as operações exigem autenticação

---

## 🛠️ Stack

| Camada | Tecnologias |
|---|---|
| **Frontend** | React 19, React Router v7, Axios, CSS Modules |
| **Backend** | Node.js, Express 5, express-session, bcrypt |
| **Banco de Dados** | MySQL 8 |
| **Produção** | Vercel (frontend) + Render (backend) + Railway (MySQL) |

---

## 📁 Estrutura do Projeto

```
node-express-react-academic-manager/
│
├── sga-backend/                      # API REST
│   ├── server.js                     # Entry point do Express
│   ├── .env.example                  # Template de variáveis de ambiente
│   └── src/
│       ├── config/
│       │   ├── db.js                 # Pool de conexões MySQL
│       │   └── session.js            # Configuração de sessão
│       ├── controllers/              # Lógica de negócio
│       │   ├── authController.js
│       │   ├── alunoController.js
│       │   ├── cursoController.js
│       │   └── professorController.js
│       ├── middlewares/
│       │   └── authMiddleWare.js     # Proteção de rotas autenticadas
│       ├── models/                   # Queries SQL (parametrizadas)
│       │   ├── userModel.js
│       │   ├── alunoModel.js
│       │   ├── cursoModel.js
│       │   └── professorModel.js
│       └── routes/                   # Definição das rotas REST
│           ├── authRoutes.js
│           ├── alunoRoutes.js
│           ├── cursoRoutes.js
│           └── professorRoutes.js
│
├── sga-frontend/                     # SPA React
│   ├── .env.example                  # Template de variáveis de ambiente
│   └── src/
│       ├── App.js                    # Roteamento + PrivateRoute
│       ├── AuthContext.js            # Estado global de autenticação
│       ├── api/                      # Camada de comunicação com a API
│       │   ├── sgaApi.js             # Instância Axios configurada
│       │   ├── authApi.js
│       │   ├── alunosApi.js
│       │   ├── cursosApi.js
│       │   └── professoresApi.js
│       ├── components/               # Componentes reutilizáveis
│       ├── pages/                    # Páginas da aplicação
│       └── styles/                   # CSS Modules
│
└── comandos_sql.txt                  # Scripts para criação do banco
```

---

## 🚀 Rodando localmente

### Pré-requisitos

- [Node.js](https://nodejs.org/) 18+
- [MySQL](https://www.mysql.com/) 8+ rodando localmente
- Git

### 1. Clone o repositório

```bash
git clone https://github.com/henriquecarvalhodeandrade/node-express-react-academic-manager.git
cd node-express-react-academic-manager
```

### 2. Crie o banco de dados

Conecte ao seu MySQL e execute os scripts do arquivo `comandos_sql.txt`:

```bash
mysql -u root -p < comandos_sql.txt
```

> Ou abra o arquivo no MySQL Workbench e execute manualmente.

### 3. Configure e inicie o backend

```bash
cd sga-backend

# Instale as dependências
npm install

# Crie o arquivo de variáveis de ambiente a partir do template
cp .env.example .env
```

Edite o `.env` com suas configurações locais:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_DATABASE=sga_db
DB_PORT=3306
SESSION_SECRET=qualquer_string_longa_e_aleatoria
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
PORT=3001
```

Inicie o servidor:

```bash
npm run dev    # com hot-reload (requer nodemon)
# ou
npm start      # sem hot-reload
```

API disponível em `http://localhost:3001`

### 4. Configure e inicie o frontend

Em outro terminal, a partir da raiz do projeto:

```bash
cd sga-frontend
npm install
npm start
```

Aplicação disponível em `http://localhost:3000`

---

## 📡 Endpoints da API

Todos os endpoints abaixo (exceto `/api/auth/login` e `/api/auth/register`) requerem uma sessão autenticada.

### Autenticação — `/api/auth`

| Método | Rota | Descrição |
|---|---|---|
| `POST` | `/api/auth/register` | Cadastra novo usuário |
| `POST` | `/api/auth/login` | Realiza login e cria sessão |
| `POST` | `/api/auth/logout` | Encerra a sessão |
| `GET` | `/api/auth/me` | Retorna dados do usuário logado |

### Alunos — `/api/alunos`

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/api/alunos` | Lista todos os alunos (com nome do curso) |
| `GET` | `/api/alunos/:id` | Busca aluno por ID |
| `POST` | `/api/alunos` | Cadastra novo aluno |
| `PUT` | `/api/alunos/:id` | Atualiza dados do aluno |
| `PUT` | `/api/alunos/:id/curso` | Transfere aluno para outro curso |
| `DELETE` | `/api/alunos/:id` | Remove aluno |

### Professores — `/api/professores`

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/api/professores` | Lista todos os professores (com nome do curso) |
| `GET` | `/api/professores/:id` | Busca professor por ID |
| `POST` | `/api/professores` | Cadastra novo professor |
| `PUT` | `/api/professores/:id` | Atualiza dados do professor |
| `PUT` | `/api/professores/:id/curso` | Atribui/altera curso do professor |
| `DELETE` | `/api/professores/:id` | Remove professor |

### Cursos — `/api/cursos`

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/api/cursos` | Lista todos os cursos |
| `GET` | `/api/cursos/:id` | Busca curso por ID |
| `POST` | `/api/cursos` | Cadastra novo curso |
| `PUT` | `/api/cursos/:id` | Atualiza curso |
| `DELETE` | `/api/cursos/:id` | Remove curso* |

> *A exclusão de curso é bloqueada se houver alunos vinculados.

---

## 🗄️ Banco de Dados

```
┌──────────────┐         ┌──────────────────┐
│   usuarios   │         │      cursos      │
├──────────────┤         ├──────────────────┤
│ id           │         │ id               │
│ nome         │         │ nome_curso       │
│ email        │         │ carga_horaria    │
│ senha (hash) │         └────────┬─────────┘
│ data_cadastro│                  │ 1:N
└──────────────┘       ┌──────────┴──────────┐
                       │                     │
              ┌────────┴──────┐   ┌──────────┴──────┐
              │    alunos     │   │   professores   │
              ├───────────────┤   ├─────────────────┤
              │ id            │   │ id              │
              │ nome          │   │ nome            │
              │ matricula     │   │ matricula       │
              │ curso_id (FK) │   │ curso_id (FK)   │
              │ data_nasc.    │   └─────────────────┘
              │ ativo         │
              └───────────────┘
```

---

## 🔐 Segurança

| Mecanismo | Implementação |
|---|---|
| Hash de senhas | bcrypt com salt rounds = 10 |
| Sessões | `httpOnly` + `secure` (produção) + `sameSite: 'none'` (cross-origin) |
| SQL Injection | Queries 100% parametrizadas com `?` |
| Autorização | Middleware `isAuthenticated` em todos os endpoints CRUD |
| CORS | Restrito à origin configurada via variável de ambiente |
| Rotas frontend | `PrivateRoute` redireciona para `/login` se não autenticado |

---

## 🌐 Variáveis de Ambiente

### Backend (`sga-backend/.env`)

| Variável | Descrição |
|---|---|
| `DB_HOST` | Host do servidor MySQL |
| `DB_USER` | Usuário do MySQL |
| `DB_PASSWORD` | Senha do MySQL |
| `DB_DATABASE` | Nome do banco de dados |
| `DB_PORT` | Porta do MySQL (padrão: `3306`) |
| `SESSION_SECRET` | Chave secreta para assinar cookies de sessão |
| `FRONTEND_URL` | URL do frontend autorizado pelo CORS |
| `NODE_ENV` | `development` ou `production` |
| `PORT` | Porta do servidor (padrão: `3001`) |

> Gere um `SESSION_SECRET` seguro com:
> ```bash
> node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
> ```

### Frontend (`sga-frontend/.env.local`)

| Variável | Descrição |
|---|---|
| `REACT_APP_API_URL` | URL base da API (ex: `http://localhost:3001/api`) |

---

## 📄 Licença

Este projeto está sob a licença ISC.