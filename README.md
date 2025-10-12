# 🧠 Tech Challenge - Fase 2  
**Pós FIAP - Full Stack Development**

Projeto desenvolvido por **Mateus Zucheli** para o **Tech Challenge da Fase 2**, com foco em **Node.js, TypeScript, Docker, Prisma, PostgreSQL e CI/CD**.

---

## 🚀 Descrição do Projeto

O projeto consiste em uma **API RESTful** para gerenciamento de postagens entre **professores e alunos**.  
Professores podem criar, editar e excluir postagens, enquanto alunos podem visualizar e buscar posts públicos.

A aplicação implementa:
- CRUD completo com Prisma + PostgreSQL  
- Autenticação JWT  
- Testes automatizados com Jest + Supertest  
- Documentação Swagger  
- Pipeline CI/CD com GitHub Actions  
- Containerização com Docker  

---

## 🧰 Tecnologias utilizadas

- **Node.js** (v18)
- **TypeScript**
- **Express**
- **Prisma ORM**
- **PostgreSQL**
- **Jest** e **Supertest**
- **Swagger UI**
- **Docker** e **Docker Compose**
- **GitHub Actions**

---

## 🧩 Estrutura de pastas

tech-challenge-fase2/
│
├── src/
│ ├── controllers/ # Lógica de controle dos endpoints
│ ├── middlewares/ # Autenticação e tratamento de erros
│ ├── routes/ # Definição das rotas da API
│ ├── services/ # Regras de negócio e integração com Prisma
│ ├── prisma/ # Cliente e schema do Prisma
│ ├── config/ # Configurações gerais e Swagger
│ └── app.ts # Inicialização da aplicação
│
├── tests/ # Testes automatizados com Jest
├── prisma/schema.prisma # Modelo do banco de dados
├── docker-compose.yml
├── Dockerfile
├── jest.config.js
└── README.md

---

## ⚙️ Como rodar o projeto localmente

### 1️⃣ Clone o repositório:
```bash
git clone https://github.com/seuusuario/tech-challenge-fase2.git
cd tech-challenge-fase2
npm install

Crie um arquivo .env (opcional) com:
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/techchallenge"
JWT_SECRET="secret123"

docker-compose up -d

http://localhost:3000/api-docs
Aqui está a documentação Swagger interativa.

npm test

Saída esperada:
PASS tests/posts.test.ts
PASS tests/app.test.ts
Test Suites: 2 passed, 2 total
Tests:       8 passed, 8 total
Coverage:    74%

docker-compose up --build

| Serviço | Porta | Descrição         |
| ------- | ----- | ----------------- |
| API     | 3000  | Aplicação Express |
| Banco   | 5432  | PostgreSQL        |

| Método   | Endpoint        | Descrição                          | Acesso |
| -------- | --------------- | ---------------------------------- | ------ |
| `GET`    | `/posts/public` | Lista posts públicos (alunos)      | Livre  |
| `GET`    | `/posts/all`    | Lista todos os posts (professores) | Token  |
| `GET`    | `/posts/:id`    | Lê um post específico              | Token  |
| `GET`    | `/posts/search` | Busca posts por palavra-chave      | Token  |
| `POST`   | `/posts`        | Cria novo post                     | Token  |
| `PUT`    | `/posts/:id`    | Atualiza post                      | Token  |
| `DELETE` | `/posts/:id`    | Remove post                        | Token  |
| `GET`    | `/health`       | Verifica status da API             | Livre  |

Mateus Zucheli
Pós-graduação em Full Stack Development - FIAP