# Berryelle Web App

Aplicação web de e-commerce desenvolvida com React + TypeScript para gestão e venda de produtos, integrada com backend Spring Boot.

## 🛍️ Funcionalidades

### 🔐 Autenticação
- Sistema de login/logout
- **Usuário padrão**: 
  - **Login**: `admin`
  - **Senha**: `123`

### 📦 Gestão de Produtos
- Listagem com busca e paginação
- Criação e edição de produtos
- Upload de imagens
- Controle de estoque
- Exclusão de produtos

### 🛒 Sistema de Carrinho
- Adicionar produtos ao carrinho
- Controle de quantidade
- Validação de estoque disponível
- Processo de checkout
- Atualização automática do estoque após compra

### 🌐 Internacionalização
- Suporte a múltiplos idiomas
- Interface responsiva

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React** 18.3.1
- **TypeScript** 5.6.2  
- **Vite** 6.0.1 (build tool)
- **MobX** (gerenciamento de estado)
- **React Router Dom** 6.28.0 (navegação)
- **Semantic UI React** 2.1.5 (componentes UI)
- **Formik** + **Yup** (formulários e validação)
- **Axios** 1.7.9 (HTTP client)
- **React Toastify** (notificações)
- **Lodash** 4.17.21 (utilitários)

### Backend (Integração)
- Spring Boot
- API RESTful
- Autenticação JWT

## ▶️ Como Rodar o Projeto

### 1. Pré-requisitos
- Node.js 18+
- NPM (gerenciador de pacotes)
- Backend Berryelle API rodando

### 2. Instalação
```shell script
cd app
npm install
```


### 3. Executar aplicação
```shell script
npm run dev
```

## 🌐 Acesso

**Desenvolvimento**: http://localhost:5173

**Credenciais de teste**:
- **Usuário**: `admin`
- **Senha**: `123`

## 📁 Estrutura do Projeto

```
app/
├── src/
│   ├── app/
│   │   ├── common/           # Utilitários e helpers
│   │   ├── model/           # Interfaces e tipos
│   │   ├── service/         # Serviços HTTP
│   │   └── store/           # Stores MobX
│   ├── feature/
│   │   ├── auth/            # Páginas de autenticação
│   │   ├── form/            # Formulários
│   │   ├── home/            # Página inicial
│   │   ├── layout/          # Layout da aplicação
│   │   └── manage/          # Páginas de gestão
│   └── main.tsx             # Entrada da aplicação
├── public/                  # Arquivos estáticos
├── package.json
├── vite.config.ts
└── tsconfig.json
```


## 🔧 Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Gera build de produção  
- `npm run preview` - Visualiza build localmente
- `npm run lint` - Executa linter ESLint

## 📋 Funcionalidades Detalhadas

### Gestão de Produtos
- **Criar**: Formulário com nome, descrição, preço, quantidade e imagem
- **Editar**: Edição inline com pré-preenchimento dos dados
- **Listar**: Grid responsivo com paginação e busca
- **Excluir**: Confirmação antes da exclusão

### Sistema de Carrinho
- **Adicionar**: Validação de estoque antes de adicionar
- **Quantidade**: Controle com limites baseados no estoque
- **Checkout**: Processamento que atualiza estoque automaticamente
- **Persistência**: Carrinho mantido durante a sessão

### Interface
- **Responsive**: Adaptável a diferentes tamanhos de tela
- **Toast**: Notificações de sucesso/erro
- **Loading**: Indicadores de carregamento
- **Validação**: Formulários com validação em tempo real

## 🔗 Integração com Backend

A aplicação consome uma API RESTful com os seguintes endpoints:

- `POST /auth/login` - Autenticação
- `GET /product/list` - Listagem de produtos
- `POST /product/create` - Criar produto
- `PUT /product/edit/{id}` - Editar produto
- `DELETE /product/delete/{id}` - Excluir produto
- `POST /product/checkout` - Processar compra

## 📝 Observações

- Certifique-se de que o backend esteja rodando antes de usar o frontend
- As imagens são armazenadas em Base64 no banco de dados
- O sistema valida automaticamente o estoque disponível
- Interface totalmente em português com suporte a internacionalização

## 👥 Credenciais de Acesso

**Administrador padrão:**
- **Login**: `admin`  
- **Senha**: `123`

*Use essas credenciais para acessar todas as funcionalidades da aplicação.*
