# Pior Filme API

API REST para leitura da lista de indicados e vencedores da categoria "Pior Filme" do Golden Raspberry Awards.

## Pré-requisitos

- Node.js 22.x ou superior
- npm ou yarn

## Instalação

1. Clone o repositório:
```bash
git clone git@github.com:rsantos/pior-filme-api.git
cd pior-filme-api
```

2. Instale as dependências:
```bash
npm install
```

## Como Rodar o Projeto

### Modo Desenvolvimento

Execute o servidor em modo de desenvolvimento com hot reload:

```bash
npm run dev
```

O servidor será iniciado na porta `3000` (ou na porta definida na variável de ambiente `PORT`). 

Então, você pode acessar a API através da URL:
```
http://localhost:3000
```

### Modo Produção

1. Compile o projeto TypeScript:
```bash
npm run build
```

2. Execute o servidor:
```bash
npm start
```

3. Acesse a API em:
```
http://localhost:3000
```

## Como Rodar os Testes de Integração

Execute todos os testes de integração:

```bash
npm test
```

Os testes estão localizados no diretório `src/__tests__/` e incluem:
- `movies.spec.ts` - Testes para os endpoints de filmes
- `producers.spec.ts` - Testes para os endpoints de produtores

### Executar testes específicos

Para executar um arquivo de teste específico:

```bash
npm test movies.spec.ts
```

Para executar com watch mode:

```bash
npm test -- --watch
```

## 📚 Endpoints da API

**Base URL:** `http://localhost:3000`

### Filmes

- **GET** `/movies` - Lista todos os filmes
- **GET** `/movies/winners` - Lista apenas os filmes vencedores

### Produtores

- **GET** `/producers/award-intervals` - Retorna os produtores com maior e menor intervalo entre prêmios consecutivos

#### Exemplo de resposta `/producers/award-intervals`:
```json
{
  "min": [
    {
      "producer": "Producer 1",
      "interval": 1,
      "previousWin": 2008,
      "followingWin": 2009
    }
  ],
  "max": [
    {
      "producer": "Producer 2",
      "interval": 99,
      "previousWin": 1900,
      "followingWin": 1999
    }
  ]
}
```

## Banco de Dados

O projeto utiliza SQLite3 com Better-SQLite3 como driver. O banco de dados é criado e populado automaticamente a partir do arquivo CSV (`src/database/database.csv`) quando o servidor é iniciado.

### Estrutura

- **movies** - Tabela de filmes
- **producers** - Tabela de produtores
- **movie_producers** - Tabela de relacionamento (N:N) entre filmes e produtores

## Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **TypeScript** - Linguagem de programação
- **Express** - Framework web
- **Better-SQLite3** - Driver SQLite
- **Jest** - Framework de testes
- **Supertest** - Biblioteca para testes de API HTTP
- **ts-node-dev** - Ferramenta de desenvolvimento com hot reload

## Estrutura do Projeto

```
src/
├── __tests__/         # Testes de integração
├── controllers/       # Controladores da API
├── database/          # Configuração e dados do banco
├── models/            # Modelos de dados
├── repositories/      # Camada de acesso aos dados
├── routes/            # Definição de rotas
├── services/          # Lógica de negócio
├── app.ts             # Configuração do Express
└── server.ts          # Ponto de entrada da aplicação
```
