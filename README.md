#  Service User Generator- Frontend

##  Sobre o Projeto

O **Service User Generator Ui** é um sistema de gerenciamento de usuários desenvolvido com **Next.js 15**. Ele consome uma API backend desenvolvida em **NestJS** para realizar operações de **CRUD** (Criar, Ler, Atualizar e Excluir usuários). 

A aplicação utiliza **React Query** para otimizar chamadas à API, **Zod e React Hook Form** para validação de formulários, além do **ShadCN** para componentes estilizados e **React Toastify** para feedbacks visuais.

**Principais Funcionalidades**
-  Listagem de usuários com cache otimizado usando React Query.
-  Validação de formulários com Zod e React Hook Form.
-  Exclusão de usuários com modal de confirmação.
-  Feedbacks visuais com React Toastify.
-  Design responsivo com Tailwind CSS e ShadCN.

---

##  Tecnologias Utilizadas

- **Next.js 15** - Framework para renderização SSR e otimização do React.
- **TypeScript** - Tipagem estática para melhor manutenção do código.
- **React Query** - Gerenciamento de estado assíncrono e cache de API.
- **Zod + React Hook Form** - Validação eficiente de formulários.
- **ShadCN** - Biblioteca de componentes estilizados baseada em Tailwind CSS.
- **Tailwind CSS** - Framework de estilização para interfaces modernas.
- **React Toastify** - Feedbacks visuais para ações do usuário.
- **ESLint e Prettier** - Padronização e formatação do código.

---

##  Configuração do Projeto

### 🔹 **Pré-requisitos**
- **Node.js** (versão recomendada: `18.20.5` ou superior)
- **npm** (`npm install -g npm` para atualizar)
- **Backend (NestJS) rodando** na porta correta

### 🔹 **Clonar o Repositório**

```sh
git clone https://github.com/MoisesPCastro/user-generator-user-service-ui.git
```
###  Instalar as Dependências
```sh
npm install
```

### Configuração de Variáveis de Ambiente

1. Na raiz do projeto, crie um arquivo chamado `.env`.
2. Use o `.env.example` como referência.
3. O projeto já vem com um arquivo `.env.example` que contém todas as chaves necessárias.
4. Copie o conteúdo do `.env.example` para o `.env`.
5. Substitua os valores padrão pelas informações reais do seu ambiente (como chaves de API, credenciais de banco de dados, etc.).

### Rodando o Projeto

- **Modo Produção**

```sh
npm run build

npm start
```

- **Modo Desenvolvimento**

```sh
npm run dev
```

O servidor será iniciado e rodará na porta **3000** por padrão.

#### Melhorias Futuras

 Implementação de autenticação JWT com tela de login.
 Melhoria na experiência do usuário com animações suaves.
 Implementação de paginação na listagem de usuários.