# 🧠 Tech Challenge - Fase 2  
**Pós-graduação FIAP - Full Stack Development**

Projeto desenvolvido por **Mateus Zucheli** como entrega da **Fase 2** do Tech Challenge da FIAP, com foco em **Node.js, TypeScript, Prisma, Docker, PostgreSQL, Jest e CI/CD**.

---

## 🚀 Descrição do Projeto

Este projeto consiste em uma **API RESTful** para o **gerenciamento de postagens entre professores e alunos**.

- 👨‍🏫 **Professores:** podem criar, editar e excluir postagens.  
- 🎓 **Alunos:** podem visualizar e buscar posts públicos.

A aplicação foi construída com foco em **boas práticas, modularização e automação**, integrando as seguintes funcionalidades:

- CRUD completo com **Prisma + PostgreSQL**  
- Autenticação via **JWT (JSON Web Token)**  
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
git clone https://github.com/seuusuario/tech-challenge-fase2.git
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

## 🧪 Testes Automatizados

Execute:
```bash
npm test
```

📊 **Saída esperada:**
```
PASS tests/posts.test.ts
PASS tests/app.test.ts
Test Suites: 2 passed, 2 total
Tests:       8 passed, 8 total
Coverage:    ~74%
```

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

## 📚 Endpoints Principais

| Método | Endpoint | Descrição | Acesso |
|--------|-----------|-----------|--------|
| **GET** | `/posts/public` | Lista posts públicos (alunos) | Livre |
| **GET** | `/posts/all` | Lista todos os posts (professores) | Token |
| **GET** | `/posts/:id` | Lê um post específico | Token |
| **GET** | `/posts/search?query=termo` | Busca posts por palavra-chave | Token |
| **POST** | `/posts` | Cria um novo post | Token |
| **PUT** | `/posts/:id` | Atualiza uma postagem | Token |
| **DELETE** | `/posts/:id` | Exclui uma postagem | Token |
| **GET** | `/health` | Verifica o status da API | Livre |

---

## 🧠 Swagger (Documentação da API)

Acesse:
👉 [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

Lá é possível testar os endpoints e visualizar os exemplos de requisição/resposta.

---

## 🧑‍💻 Autor

**👋 Mateus Zucheli**  
🎓 Pós-graduação em Full Stack Development - FIAP  
