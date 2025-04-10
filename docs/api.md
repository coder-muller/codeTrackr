# Documentação da API do CodeTrackr

Esta documentação descreve a API REST do CodeTrackr, implementada com Node.js, Express e Prisma.

## Configuração do Ambiente

### Dependências

```bash
npm install express prisma @prisma/client jsonwebtoken bcrypt cors dotenv
npm install --save-dev typescript ts-node @types/express @types/jsonwebtoken @types/bcrypt @types/cors
```

### Estrutura de Arquivos

```
src/
├── config/
│   └── jwt.ts      # Configurações JWT
├── controllers/    # Controladores para cada rota
├── middlewares/    # Middlewares, incluindo autenticação
├── models/         # Interfaces/tipos
├── routes/         # Definições de rotas
├── services/       # Lógica de negócios
├── utils/          # Utilitários
├── app.ts          # Configuração do Express
└── server.ts       # Ponto de entrada
```

## Modelo de Dados (Prisma Schema)

```prisma
// schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id        String    @id @default(uuid())
  name      String
  email     String    @unique
  password  String
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  projects  Project[]
}

model Project {
  id          String        @id @default(uuid())
  name        String
  description String?
  stack       String[]
  status      String        @default("in planning")
  startDate   DateTime      @default(now())
  endDate     DateTime?
  repository  String?
  tags        String[]
  priority    String        @default("medium")
  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @updatedAt
  userId      String
  user        User          @relation(fields: [userId], references: [id], onDelete: Cascade)
  todos       Todo[]
  ideas       Idea[]
  logs        ActivityLog[]
}

model Todo {
  id          String   @id @default(uuid())
  description String
  status      Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  projectId   String
  project     Project  @relation(fields: [projectId], references: [id], onDelete: Cascade)
}

model Idea {
  id          String   @id @default(uuid())
  description String
  status      String   @default("pending")
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  projectId   String
  project     Project  @relation(fields: [projectId], references: [id], onDelete: Cascade)
}

model ActivityLog {
  id        String   @id @default(uuid())
  message   String
  date      DateTime @default(now())
  projectId String
  project   Project  @relation(fields: [projectId], references: [id], onDelete: Cascade)
}
```

## Autenticação

A API usa JWT (JSON Web Tokens) para autenticação. Tokens são retornados após login bem-sucedido e devem ser incluídos no cabeçalho `Authorization` como `Bearer {token}` em todas as requisições autenticadas.

### Configuração JWT

```typescript
// src/config/jwt.ts
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'seu_segredo_aqui';
const JWT_EXPIRES_IN = '24h';

export const generateToken = (userId: string): string => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, JWT_SECRET);
};
```

## Endpoints da API

### Autenticação

#### Registro de Usuário
- **URL**: `/api/auth/register`
- **Método**: `POST`
- **Autenticação**: Não
- **Corpo**:
  ```json
  {
    "name": "Nome Completo",
    "email": "usuario@exemplo.com",
    "password": "senhasegura123"
  }
  ```
- **Resposta de Sucesso**:
  ```json
  {
    "id": "user-uuid",
    "name": "Nome Completo",
    "email": "usuario@exemplo.com",
    "token": "jwt-token"
  }
  ```

#### Login
- **URL**: `/api/auth/login`
- **Método**: `POST`
- **Autenticação**: Não
- **Corpo**:
  ```json
  {
    "email": "usuario@exemplo.com",
    "password": "senhasegura123"
  }
  ```
- **Resposta de Sucesso**:
  ```json
  {
    "id": "user-uuid",
    "name": "Nome Completo",
    "email": "usuario@exemplo.com",
    "token": "jwt-token"
  }
  ```

### Usuários

#### Obter Perfil do Usuário
- **URL**: `/api/users/me`
- **Método**: `GET`
- **Autenticação**: Sim
- **Resposta de Sucesso**:
  ```json
  {
    "id": "user-uuid",
    "name": "Nome Completo",
    "email": "usuario@exemplo.com",
    "createdAt": "2023-01-01T00:00:00.000Z"
  }
  ```

#### Atualizar Perfil do Usuário
- **URL**: `/api/users/me`
- **Método**: `PUT`
- **Autenticação**: Sim
- **Corpo**:
  ```json
  {
    "name": "Novo Nome",
    "email": "novo_email@exemplo.com"
  }
  ```
- **Resposta de Sucesso**:
  ```json
  {
    "id": "user-uuid",
    "name": "Novo Nome",
    "email": "novo_email@exemplo.com",
    "updatedAt": "2023-01-02T00:00:00.000Z"
  }
  ```

#### Alterar Senha
- **URL**: `/api/users/change-password`
- **Método**: `PUT`
- **Autenticação**: Sim
- **Corpo**:
  ```json
  {
    "currentPassword": "senhaAtual123",
    "newPassword": "novaSenha456"
  }
  ```
- **Resposta de Sucesso**:
  ```json
  {
    "message": "Senha alterada com sucesso"
  }
  ```

### Projetos

#### Listar Projetos
- **URL**: `/api/projects`
- **Método**: `GET`
- **Autenticação**: Sim
- **Parâmetros de Consulta**:
  - `search` (opcional): Termo para busca
  - `status` (opcional): Filtrar por status
  - `priority` (opcional): Filtrar por prioridade
- **Resposta de Sucesso**:
  ```json
  [
    {
      "id": "project-uuid",
      "name": "Investment App",
      "description": "Aplicativo para gestão de investimentos",
      "stack": ["React", "Next.js", "Tailwind CSS"],
      "status": "in development",
      "startDate": "2024-02-15T03:00:00.000Z",
      "endDate": null,
      "repository": "https://github.com/user/investment-app",
      "tags": ["Finanças", "Investimentos"],
      "priority": "high",
      "createdAt": "2024-02-15T03:00:00.000Z",
      "updatedAt": "2024-02-15T03:00:00.000Z"
    }
  ]
  ```

#### Obter Projeto por ID
- **URL**: `/api/projects/:id`
- **Método**: `GET`
- **Autenticação**: Sim
- **Resposta de Sucesso**:
  ```json
  {
    "id": "project-uuid",
    "name": "Investment App",
    "description": "Aplicativo para gestão de investimentos",
    "stack": ["React", "Next.js", "Tailwind CSS"],
    "status": "in development",
    "startDate": "2024-02-15T03:00:00.000Z",
    "endDate": null,
    "repository": "https://github.com/user/investment-app",
    "tags": ["Finanças", "Investimentos"],
    "priority": "high",
    "createdAt": "2024-02-15T03:00:00.000Z",
    "updatedAt": "2024-02-15T03:00:00.000Z",
    "todo": [
      {
        "id": "todo-uuid",
        "description": "Implementar autenticação",
        "status": false,
        "createdAt": "2024-02-16T03:00:00.000Z",
        "updatedAt": "2024-02-16T03:00:00.000Z"
      }
    ],
    "ideas": [
      {
        "id": "idea-uuid",
        "description": "Adicionar gráficos de desempenho",
        "status": "approved",
        "createdAt": "2024-02-16T03:00:00.000Z",
        "updatedAt": "2024-02-17T03:00:00.000Z"
      }
    ],
    "logs": [
      {
        "id": "log-uuid",
        "message": "Projeto iniciado",
        "date": "2024-02-15T03:00:00.000Z"
      }
    ]
  }
  ```

#### Criar Projeto
- **URL**: `/api/projects`
- **Método**: `POST`
- **Autenticação**: Sim
- **Corpo**:
  ```json
  {
    "name": "Novo Projeto",
    "description": "Descrição do novo projeto",
    "stack": ["React", "Node.js"],
    "status": "in planning",
    "startDate": "2024-05-01T00:00:00.000Z",
    "repository": "https://github.com/user/novo-projeto",
    "tags": ["Web", "App"],
    "priority": "medium"
  }
  ```
- **Resposta de Sucesso**:
  ```json
  {
    "id": "new-project-uuid",
    "name": "Novo Projeto",
    "description": "Descrição do novo projeto",
    "stack": ["React", "Node.js"],
    "status": "in planning",
    "startDate": "2024-05-01T00:00:00.000Z",
    "endDate": null,
    "repository": "https://github.com/user/novo-projeto",
    "tags": ["Web", "App"],
    "priority": "medium",
    "createdAt": "2024-05-01T00:00:00.000Z",
    "updatedAt": "2024-05-01T00:00:00.000Z"
  }
  ```

#### Atualizar Projeto
- **URL**: `/api/projects/:id`
- **Método**: `PUT`
- **Autenticação**: Sim
- **Corpo**: Similar ao de criação, com campos opcionais
- **Resposta de Sucesso**: Objeto do projeto atualizado

#### Excluir Projeto
- **URL**: `/api/projects/:id`
- **Método**: `DELETE`
- **Autenticação**: Sim
- **Resposta de Sucesso**:
  ```json
  {
    "message": "Projeto excluído com sucesso"
  }
  ```

### Tarefas (Todo)

#### Listar Tarefas de um Projeto
- **URL**: `/api/projects/:projectId/todos`
- **Método**: `GET`
- **Autenticação**: Sim
- **Resposta de Sucesso**: Lista de tarefas

#### Adicionar Tarefa
- **URL**: `/api/projects/:projectId/todos`
- **Método**: `POST`
- **Autenticação**: Sim
- **Corpo**:
  ```json
  {
    "description": "Nova tarefa a ser realizada"
  }
  ```
- **Resposta de Sucesso**: Objeto da tarefa criada

#### Atualizar Status da Tarefa
- **URL**: `/api/projects/:projectId/todos/:todoId`
- **Método**: `PUT`
- **Autenticação**: Sim
- **Corpo**:
  ```json
  {
    "status": true,
    "description": "Descrição atualizada (opcional)"
  }
  ```
- **Resposta de Sucesso**: Objeto da tarefa atualizada

#### Excluir Tarefa
- **URL**: `/api/projects/:projectId/todos/:todoId`
- **Método**: `DELETE`
- **Autenticação**: Sim
- **Resposta de Sucesso**: Mensagem de sucesso

### Ideias

#### Listar Ideias de um Projeto
- **URL**: `/api/projects/:projectId/ideas`
- **Método**: `GET`
- **Autenticação**: Sim
- **Resposta de Sucesso**: Lista de ideias

#### Adicionar Ideia
- **URL**: `/api/projects/:projectId/ideas`
- **Método**: `POST`
- **Autenticação**: Sim
- **Corpo**:
  ```json
  {
    "description": "Descrição da nova ideia"
  }
  ```
- **Resposta de Sucesso**: Objeto da ideia criada

#### Atualizar Status da Ideia
- **URL**: `/api/projects/:projectId/ideas/:ideaId`
- **Método**: `PUT`
- **Autenticação**: Sim
- **Corpo**:
  ```json
  {
    "status": "approved", // "pending", "approved", "rejected"
    "description": "Descrição atualizada (opcional)"
  }
  ```
- **Resposta de Sucesso**: Objeto da ideia atualizada

#### Excluir Ideia
- **URL**: `/api/projects/:projectId/ideas/:ideaId`
- **Método**: `DELETE`
- **Autenticação**: Sim
- **Resposta de Sucesso**: Mensagem de sucesso

### Registros de Atividade (Logs)

#### Listar Logs de um Projeto
- **URL**: `/api/projects/:projectId/logs`
- **Método**: `GET`
- **Autenticação**: Sim
- **Resposta de Sucesso**: Lista de logs

#### Adicionar Log
- **URL**: `/api/projects/:projectId/logs`
- **Método**: `POST`
- **Autenticação**: Sim
- **Corpo**:
  ```json
  {
    "message": "Mensagem do log de atividade"
  }
  ```
- **Resposta de Sucesso**: Objeto do log criado

#### Excluir Log
- **URL**: `/api/projects/:projectId/logs/:logId`
- **Método**: `DELETE`
- **Autenticação**: Sim
- **Resposta de Sucesso**: Mensagem de sucesso

## Códigos de Status HTTP

- `200 OK`: Requisição bem-sucedida
- `201 Created`: Recurso criado com sucesso
- `400 Bad Request`: Parâmetros inválidos
- `401 Unauthorized`: Token ausente ou inválido
- `403 Forbidden`: Sem permissão para acessar o recurso
- `404 Not Found`: Recurso não encontrado
- `500 Internal Server Error`: Erro no servidor

## Middleware de Autenticação

```typescript
// src/middlewares/auth.ts
import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../config/jwt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface DecodedToken {
  id: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({ message: 'Token não fornecido' });
    }
    
    const [bearer, token] = authHeader.split(' ');
    
    if (bearer !== 'Bearer' || !token) {
      return res.status(401).json({ message: 'Formato de token inválido' });
    }
    
    const decoded = verifyToken(token) as DecodedToken;
    
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, name: true, email: true }
    });
    
    if (!user) {
      return res.status(401).json({ message: 'Usuário não encontrado' });
    }
    
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
};
```

## Exemplo de Implementação

### Configuração do Servidor

```typescript
// src/server.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import projectRoutes from './routes/projects';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

## Considerações de Segurança

1. **Armazenamento de Senhas**: Use bcrypt para hash e salt nas senhas.
2. **Validação**: Valide todas as entradas do usuário.
3. **Rate Limiting**: Implemente limites de taxa para evitar ataques de força bruta.
4. **CORS**: Configure corretamente para permitir apenas origens confiáveis.
5. **Variáveis de Ambiente**: Armazene segredos em variáveis de ambiente.
6. **Sanitização**: Sanitize dados de entrada para evitar injeção de SQL.

