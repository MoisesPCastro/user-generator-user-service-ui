my-next-app/
  ├─ src/
  │   ├─ app/
  │   │   ├─ layout.tsx          // Layout raiz (envolve toda a aplicação)
  │   │   ├─ page.tsx            // Página inicial (pode ser a listagem geral)
  │   │   ├─ users/
  │   │   │   ├─ page.tsx        // Listagem de usuários
  │   │   │   ├─ create/
  │   │   │   │   └─ page.tsx    // Tela de cadastro de usuário
  │   │   │   └─ [id]/
  │   │   │       └─ page.tsx    // Tela de edição de usuário
  ├─ src/
  │   ├─ components/
  │   │   └─ UserForm.tsx        // Formulário de cadastro/edição
  │   ├─ hooks/
  │   │   └─ useUsers.ts         // Hook para listar usuários (React Query)
  │   ├─ services/
  │   │   └─ api.ts              // Configuração do axios
  ├─ package.json
  └─ ...
Home Page:
Ao acessar a aplicação, o usuário chega na página inicial (por exemplo, a página de boas-vindas exibida em src/app/page.tsx). Aqui podemos ter uma mensagem simples como “Bem-vindo à Home!” que introduz brevemente o sistema.

Listagem de Usuários:
A partir da Home, o usuário pode acessar a listagem de usuários. Essa rota é definida em src/app/users/page.tsx.

O que o usuário vê: Uma lista de usuários cadastrados, com cada item exibindo informações básicas (nome, e-mail, etc.).
Navegação:
Um link ou botão (por exemplo, “Cadastrar Novo Usuário”) que o direciona para a tela de cadastro.
Em cada item da lista, há um link (por exemplo, “Editar”) que leva para a tela de edição do usuário específico.
Tela de Cadastro de Usuário:
Ao clicar em “Cadastrar Novo Usuário”, o usuário é direcionado para src/app/users/create/page.tsx.

O que acontece aqui:
Um formulário (o componente UserForm) é exibido para preencher os dados do novo usuário.
Após preencher e submeter o formulário, uma requisição via React Query é disparada para a API do backend para criar o usuário.
Se a criação for bem-sucedida, o usuário é redirecionado de volta para a listagem de usuários, onde o novo cadastro aparece (graças à invalidação do cache do React Query).
Tela de Edição de Usuário:
Se o usuário clicar em “Editar” em algum item da lista, ele é direcionado para src/app/users/[id]/page.tsx (a rota dinâmica para edição).

O que acontece aqui:
O formulário de edição é pré-preenchido com os dados atuais do usuário (buscados via React Query).
O usuário faz as alterações necessárias e submete o formulário.
Após a atualização, o sistema invalida o cache e redireciona novamente para a listagem, onde as alterações são refletidas.
Resumo do fluxo:

Home → (opção de navegação) → Listagem de Usuários
Na Listagem:
Botão/link "Cadastrar Novo Usuário" → leva à Tela de Cadastro
Link "Editar" em cada usuário → leva à Tela de Edição
Após cadastro/edição, o usuário retorna à Listagem de Usuários com os dados atualizados.
Esse fluxo, combinado com a integração do React Query, garante que os dados sejam atualizados automaticamente no cache, proporcionando uma experiência fluida sem recarregamentos desnecessários da página.