# Guia do Aluno EAD

Sistema completo para auxiliar estudantes de ensino à distância, oferecendo organização de estudos, lembretes, cálculo de médias e assistência por IA.

## Sobre o Projeto

Este projeto foi desenvolvido por mim, Anderson Assumpção Junior, como parte do meu portfólio acadêmico. Durante 3 semanas, trabalhei na concepção, design e implementação deste sistema completo para auxiliar estudantes de ensino à distância.

O objetivo principal foi criar uma ferramenta que pudesse ajudar alunos EAD a organizarem melhor seus estudos, gerenciarem prazos e melhorarem seu desempenho acadêmico com o auxílio de inteligência artificial.

## Funcionalidades

- **Autenticação**: Sistema de login seguro com JWT
- **Gerenciamento de Matérias**: Cadastro e organização de disciplinas
- **Assistente IA**: Chat integrado com OpenAI para tirar dúvidas sobre as aulas
- **Lembretes**: Criação de lembretes para horários de estudo e datas de entrega
- **Calculadora de Média**: Registro de notas e cálculo automático de médias

## Tecnologias Utilizadas

### Backend

- Node.js
- Express
- PostgreSQL
- Prisma ORM
- JWT para autenticação
- OpenAI API

### Frontend

- React
- React Router
- Axios
- Material-UI
- Styled Components

## Estrutura do Projeto

```
projeto-guia-do-aluno-ead/
├── backend/               # Servidor Node.js
│   ├── src/
│   │   ├── config/        # Configurações do servidor
│   │   ├── controllers/   # Controladores da aplicação
│   │   ├── middlewares/   # Middlewares personalizados
│   │   ├── models/        # Modelos de dados
│   │   ├── repositories/  # Camada de acesso a dados
│   │   ├── routes/        # Rotas da API
│   │   ├── services/      # Serviços de negócios
│   │   ├── utils/         # Utilitários
│   │   └── server.js      # Aplicação Express
│   ├── prisma/            # Configuração do Prisma ORM
│   ├── .env               # Variáveis de ambiente
│   └── package.json       # Dependências do backend
│
└── frontend/              # Aplicação React
    ├── public/            # Arquivos estáticos
    ├── src/
    │   ├── assets/        # Imagens e recursos
    │   ├── components/    # Componentes React
    │   ├── contexts/      # Contextos React
    │   ├── hooks/         # Hooks personalizados
    │   ├── pages/         # Páginas da aplicação
    │   ├── services/      # Serviços de API
    │   ├── styles/        # Estilos globais
    │   ├── utils/         # Funções utilitárias
    │   └── App.js         # Componente principal
    ├── .env               # Variáveis de ambiente
    └── package.json       # Dependências do frontend
```

## Processo de Desenvolvimento

Durante as 3 semanas de desenvolvimento, segui uma abordagem estruturada:

### Semana 1

- Análise de requisitos e planejamento do projeto
- Design da arquitetura do sistema
- Configuração do ambiente de desenvolvimento
- Implementação da estrutura básica do backend e frontend

### Semana 2

- Desenvolvimento do sistema de autenticação
- Implementação do CRUD para matérias, lembretes e notas
- Criação da interface do usuário com Material-UI
- Testes iniciais de integração

### Semana 3

- Integração com a API da OpenAI para o assistente IA
- Implementação da calculadora de médias
- Refinamento da interface do usuário
- Testes finais e correção de bugs

## Instalação e Execução

### Pré-requisitos

- Node.js (v14+)
- PostgreSQL
- Chave de API da OpenAI

### Backend

1. Instale as dependências:

```bash
cd backend
npm install
```

2. Configure as variáveis de ambiente:

   - Renomeie o arquivo `.env.example` para `.env`
   - Preencha as variáveis com suas configurações

3. Configure o banco de dados:

```bash
npx prisma migrate dev
```

4. Inicie o servidor:

```bash
npm run dev
```

### Frontend

1. Instale as dependências:

```bash
cd frontend
npm install
```

2. Configure as variáveis de ambiente:

   - Renomeie o arquivo `.env.example` para `.env`
   - Preencha as variáveis com suas configurações

3. Inicie a aplicação:

```bash
npm start
```

## Variáveis de Ambiente

### Backend (.env)

```
DATABASE_URL="postgresql://user:password@localhost:5432/guia_aluno_ead"
JWT_SECRET="sua_chave_secreta_jwt"
OPENAI_API_KEY="sua_chave_api_openai"
PORT=3001
```

### Frontend (.env)

```
REACT_APP_API_URL=http://localhost:3001/api
```

## Funcionalidades Detalhadas

### Autenticação

- Registro de novos usuários
- Login com JWT
- Proteção de rotas

### Gerenciamento de Matérias

- Cadastro de disciplinas
- Organização automática por IA
- Visualização e edição

### Lembretes

- Criação de lembretes para estudos
- Notificações de prazos
- Marcação de concluídos

### Calculadora de Média

- Registro de notas por disciplina
- Cálculo automático de médias
- Análise de desempenho

### Assistente IA

- Chat para tirar dúvidas
- Sugestões de organização de estudos
- Análise de desempenho acadêmico

## Desafios e Aprendizados

Durante o desenvolvimento deste projeto, enfrentei diversos desafios, como:

- Integração eficiente com a API da OpenAI
- Implementação de um sistema de autenticação seguro
- Criação de uma interface intuitiva e responsiva

Estes desafios me proporcionaram um grande aprendizado em desenvolvimento full-stack, especialmente na integração de APIs externas e na implementação de sistemas de autenticação.

## Próximos Passos

Pretendo continuar aprimorando este projeto com:

- Implementação de notificações por email
- Adição de um sistema de compartilhamento de materiais
- Desenvolvimento de uma versão mobile com React Native

## Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE).

## Contato

Anderson Assumpção Junior - [seu-email@exemplo.com]

Link do Projeto: [https://github.com/seu-usuario/projeto-guia-do-aluno-ead](https://github.com/seu-usuario/projeto-guia-do-aluno-ead)
