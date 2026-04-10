# 🧠 Tech Challenge - Fase 2  
**Pós-graduação FIAP - Full Stack Development**

Projeto desenvolvido por **Mateus Zucheli** como entrega da **Fase 2** do Tech Challenge da FIAP, com foco em **Node.js, TypeScript, Prisma, Docker, PostgreSQL, Jest e CI/CD**.

---

## 🚀 Descrição do Projeto

Este projeto consiste em uma **API RESTful** para o **gerenciamento de postagens entre professores e alunos**.

- 👨‍🏫 **Professores:** podem criar, editar e excluir postagens.  
- 🎓 **Alunos:** podem visualizar, buscar, curtir e favoritar posts.

A aplicação foi construída com foco em **boas práticas, modularização e automação**, integrando as seguintes funcionalidades:

- CRUD completo com **Prisma + PostgreSQL**  
- Autenticação via **JWT (JSON Web Token)**  
- Sistema de **likes e favoritos** com toggle por usuário  
- Testes automatizados com **Jest + Supertest**  
- Documentação via **Swagger UI**  
- Pipeline **CI/CD no GitHub Actions**  
- Containerização com **Docker e Docker Compose**

---

## 🧰 Tecnologias Utilizadas

- 🟢 **Node.js** (v18)
- 🟣 **TypeScript**
- ⚡ **Express**
- 🧩 **Prisma ORM**
- 🐘 **PostgreSQL**
- 🧪 **Jest + Supertest**
- 📘 **Swagger UI**
- 🐳 **Docker e Docker Compose**
- ⚙️ **GitHub Actions (CI/CD)**

---

## 🧩 Estrutura do Projeto

```
tech-challenge-fase2/
│
├── src/
│   ├── controllers/      # Lógica dos endpoints
│   ├── middlewares/      # Autenticação e tratamento de erros
│   ├── routes/           # Definição das rotas da API
│   ├── services/         # Regras de negócio e integração com Prisma
│   ├── prisma/           # Cliente e schema do Prisma
│   ├── config/           # Configurações gerais e Swagger
│   └── app.ts            # Inicialização da aplicação
│
├── tests/                # Testes automatizados com Jest
├── prisma/schema.prisma  # Modelo do banco de dados
├── docker-compose.yml
├── Dockerfile
├── jest.config.js
└── README.md
```

---

## ⚙️ Como Rodar o Projeto Localmente

### 1️⃣ Clone o repositório
```bash
git clone https://github.com/Zucheli/tech-challenge-fase2.git
cd tech-challenge-fase2
```

### 2️⃣ Instale as dependências
```bash
npm install
```

### 3️⃣ Crie o arquivo `.env`
```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/techchallenge"
JWT_SECRET="secret123"
```

### 4️⃣ Suba os containers com Docker
```bash
docker-compose up -d
```

### 5️⃣ Execute as migrações Prisma
```bash
npx prisma migrate dev
```

### 6️⃣ Acesse a documentação Swagger
[http://localhost:3000/api-docs](http://localhost:3000/api-docs)

---

## 🔐 Autenticação

Faça login com `POST /auth/login` para obter o token JWT:

| Usuário | Senha | Role |
|---------|-------|------|
| `mateus` | `1234` | PROFESSOR |
| `aluno` | `1234` | ALUNO |

Inclua o token nas requisições protegidas:
```
Authorization: Bearer <token>
```

O token contém `{ id, username, role }` e é utilizado internamente para identificar o usuário em operações de like e favorito.

---

## 🧪 Testes Automatizados

Execute:
```bash
npm test
```

Os testes cobrem criação, listagem, busca, atualização de posts, controle de acesso por role, operações de like/favorito (toggle) e comentários (criação, listagem, deleção e permissões).

---

## 🐳 Executando com Docker (Produção/Deploy)

```bash
docker-compose up --build
```

**Serviços:**

| Serviço | Porta | Descrição |
|----------|--------|-----------|
| API | `3000` | Aplicação Express |
| Banco de Dados | `5432` | PostgreSQL |

---

## 🔄 CI/CD - GitHub Actions

A pipeline CI/CD realiza automaticamente:

1. Instalação de dependências  
2. Inicialização do PostgreSQL em container  
3. Execução de migrações Prisma  
4. Execução dos testes Jest  
5. Geração de relatório de cobertura  

📁 Arquivo do workflow: `.github/workflows/ci.yml`

---

## 📚 Endpoints

### Auth

| Método | Endpoint | Descrição | Acesso |
|--------|----------|-----------|--------|
| POST | `/auth/login` | Realiza login e retorna token JWT | Livre |

### Posts

| Método | Endpoint | Descrição | Acesso |
|--------|----------|-----------|--------|
| GET | `/posts` | Lista todos os posts | Livre |
| GET | `/posts/:id` | Detalhes de um post | Livre |
| GET | `/posts/search` | Busca com filtros | Token (ALUNO/PROFESSOR) |
| POST | `/posts` | Cria um post | Token (PROFESSOR) |
| PUT | `/posts/:id` | Atualiza um post | Token (PROFESSOR) |
| DELETE | `/posts/:id` | Remove um post | Token (PROFESSOR) |
| POST | `/posts/:id/like` | Toggle like | Token |
| POST | `/posts/:id/favorite` | Toggle favorito | Token |

### Comentários

| Método | Endpoint | Descrição | Acesso |
|--------|----------|-----------|--------|
| GET | `/posts/:postId/comments` | Lista comentários de um post | Livre |
| POST | `/posts/:postId/comments` | Adiciona um comentário | Token |
| DELETE | `/posts/:postId/comments/:id` | Remove comentário (somente autor) | Token |

### Usuários

| Método | Endpoint | Descrição | Acesso |
|--------|----------|-----------|--------|
| GET | `/users` | Lista usuários | Token (PROFESSOR) |
| POST | `/users` | Cria um usuário | Token (PROFESSOR) |
| PUT | `/users/:id` | Atualiza um usuário | Token (PROFESSOR) |
| DELETE | `/users/:id` | Remove um usuário | Token (PROFESSOR) |

### Busca com filtros — `GET /posts/search`

| Query param | Tipo | Descrição |
|-------------|------|-----------|
| `query` | string | Busca parcial em título e conteúdo |
| `subject` | string | Busca parcial por disciplina |
| `type` | string | Filtro exato por tipo |
| `liked` | boolean | Somente posts curtidos pelo usuário logado |
| `favorited` | boolean | Somente posts favoritados pelo usuário logado |

**Exemplo:**
```
GET /posts/search?liked=true&subject=matematica
```

### Formato de resposta dos posts

```json
{
  "id": 5,
  "title": "Título",
  "content": "...",
  "_count": { "likes": 3, "favorites": 1 },
  "likes":     [{ "userId": 2 }, { "userId": 4 }],
  "favorites": [{ "userId": 2 }]
}
```

### Formato de resposta dos comentários

```json
{
  "id": 1,
  "content": "Ótimo post!",
  "postId": 5,
  "userId": 2,
  "createdAt": "...",
  "user": {
    "id": 2,
    "username": "joao",
    "role": "ALUNO"
  }
}
```

### Like e Favorito

- Ambos são **toggle**: uma chamada adiciona, outra remove.
- Sem body — o usuário é identificado pelo token JWT.
- Respostas: `{ liked: true | false }` e `{ favorited: true | false }`.

---

## 🧠 Swagger (Documentação da API)

Acesse:
👉 [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

---

## 🧑‍💻 Autor

**👋 Mateus Zucheli**  
🎓 Pós-graduação em Full Stack Development - FIAP  
