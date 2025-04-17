
![Logo](./public/images/banner%20buffs.png)

# 🦬 Buffs - Plataforma de Controle e Acompanhamento da Produção Leiteira e Manejo de Búfalas

O **Buffs** é um projeto acadêmico desenvolvido com **Next.js** com o objetivo de construir uma plataforma web para **controle e acompanhamento da produção leiteira e manejo de búfalas**. A aplicação tem foco em organização, acessibilidade e escalabilidade, facilitando o trabalho de produtores, técnicos e gestores rurais.

Este repositório contém a estrutura do frontend da aplicação, incluindo os principais diretórios, organização modular e instruções para rodar o projeto com variáveis de ambiente conectadas à API.

---

## Autores

- [@JoaoKuzinor](https://github.com/JoaoKuzinor)  
- [@paulocsa](https://github.com/paulocsa)  
- [@V1niSouza](https://github.com/V1niSouza)

<br>
<br>

# Como Trabalhar no Projeto

### 1. Fazer o Fork do Repositório

Para começar a trabalhar no projeto, você precisará fazer um fork do repositório. Isso cria uma cópia do projeto em sua conta do GitHub. Para fazer isso:




### a) Clique no botão Fork no canto superior direito.
### b) Escolha sua conta do GitHub como destino para o fork.
<hr>

### 2. Clonar o Repositório

Após o fork, você pode clonar o repositório na sua máquina local com o seguinte comando:

```
git clone https://github.com/seu-usuario/dsm4-buffs-frontend.git
```
<hr>

### 3. Criar uma Nova Branch

Sempre que for trabalhar em uma nova funcionalidade ou correção de bug, crie uma nova branch. Use o comando abaixo para criar e mudar para a nova branch:

```
git checkout -b nome-da-sua-branch
```

<hr>

### 4. Fazer Modificações e Commits

Realize as modificações necessárias no código. Após fazer as alterações, adicione e faça o commit dessas mudanças. Siga o commit pattern abaixo para garantir a consistência na formatação dos commits:

### Commit Pattern:

- Tipo de Commit: Descreve a natureza da alteração (ex.: ``feat``, ``fix``, ``docs``, ``style``, ``refactor``, ``test``).
- Escopo (opcional): Indica a área afetada (ex.: ``login``, ``dashboard``, ``API``).
- Descrição: Uma descrição clara e objetiva do que foi alterado.

### Exemplos de commits:
- ``feat(auth): add login functionality`` — Para uma nova funcionalidade relacionada à autenticação.
- ``fix(button): fix button color issue`` — Para corrigir um problema relacionado ao componente de botão.
- ``docs(readme): update setup instructions`` — Para atualizar a documentação do README.

### Comandos para adicionar e fazer o commit:
```
git add .
git commit -m "feat(auth): add login functionality"
```
<hr>

### 5. Subir suas Mudanças para o GitHub

Após o commit, envie suas mudanças para o seu repositório remoto:

```
git push origin nome-da-sua-branch
```
<hr>
### 6. Abrir um Pull Request (PR)
Depois de subir a branch para o seu repositório, vá até o repositório original e abra um Pull Request (PR). Isso permite que as suas mudanças sejam revisadas e, se tudo estiver certo, mescladas com o repositório principal.

Para abrir um PR:

1. Acesse o repositório original no GitHub.

2. Vá até a aba Pull Requests e clique em New pull request.

3. Escolha a sua branch e forneça uma descrição detalhada do que foi feito.



<br>
<br>


# Como rodar o projeto

Para rodar este projeto localmente, siga os passos abaixo:

### 1. **Clone o repositório**

Se você ainda não clonou o repositório, use o comando abaixo para cloná-lo:

```bash
git clone https://github.com/CyberLiveStock/dsm4-buffs-frontend.git
```

### 2. **Instale as dependências**

Navegue até a pasta do projeto e instale as dependências com o npm:

```bash
cd dsm4-buffs-frontend
npm install
```

Este comando vai baixar todas as dependências necessárias para o funcionamento do projeto, conforme especificado no arquivo `package.json`.

### 3. **Configure variáveis de ambiente (conectar com a API)**

Para conectar sua aplicação com a API, crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis de ambiente:

```bash
NEXT_PUBLIC_API_URL=https://api.exemplo.com
```

- `NEXT_PUBLIC_API_URL`: URL da sua API.

Essas variáveis de ambiente são acessíveis dentro da aplicação, e você pode usá-las no seu código conforme necessário.

### 4. **Inicie o servidor de desenvolvimento**

Para iniciar o servidor de desenvolvimento, execute o seguinte comando:

```bash
npm run dev
```



Isso vai iniciar a aplicação no modo de desenvolvimento. O servidor estará rodando em `http://localhost:3000`.

### 5. **Acesse a aplicação**

Abra o navegador e vá para `http://localhost:3000`. Você verá a aplicação rodando localmente.

<br>
<br>
<br>

# Estrutura do Projeto

Este projeto foi estruturado de forma modular para facilitar o desenvolvimento e manutenção do código. Abaixo está uma explicação de cada diretório e sua função.

### 📁 `src/`
Este diretório contém o código fonte do projeto. Aqui ficam todos os arquivos relacionados à aplicação, incluindo componentes, hooks, layouts, páginas e estilos.

---

### 📁 `src/components/`
Este diretório é responsável por armazenar todos os **componentes reutilizáveis** da aplicação. Componentes podem ser botões, cards, modais, ou qualquer outra parte da interface que seja utilizada em diferentes lugares.

**Exemplo:**
- `Button.js`: Componente de botão reutilizável.

---

### 📁 `src/hooks/`
Aqui ficam os **hooks personalizados** que podem ser utilizados para encapsular lógica reutilizável. Hooks como autenticação, manipulação de dados, entre outros, são armazenados neste diretório.

**Exemplo:**
- `useAuth.js`: Hook para gerenciar a autenticação do usuário.

---

### 📁 `src/layouts/`
Este diretório é onde você coloca **layouts reutilizáveis** que definem a estrutura geral de páginas, como cabeçalhos, rodapés, menus, etc. Geralmente, esses layouts contêm a estrutura básica de uma página e renderizam componentes filhos.

**Exemplo:**
- `DefaultLayout.js`: Layout padrão da aplicação, com cabeçalho e rodapé.

---

### 📁 `src/pages/`
Este diretório contém as **páginas** da aplicação, que são usadas para mapear as rotas. Cada arquivo dentro deste diretório representa uma rota da aplicação (por exemplo, `index.js` para a página inicial).

**Exemplo:**
- `index.js`: Página inicial.
- `login.js`: Página de login.

---

### 📁 `src/styles/`
Este diretório contém os **estilos CSS** da aplicação. Aqui você pode ter tanto arquivos globais como locais (CSS Modules). O arquivo `globals.css` é geralmente usado para estilos que devem ser aplicados em toda a aplicação, enquanto arquivos de CSS Module são usados para componentes específicos.

**Exemplo:**
- `globals.css`: Estilos globais aplicados em toda a aplicação.
- `Button.module.css`: Estilos específicos para o componente Button, utilizando CSS Module.

---

### 📁 `src/utils/`
Este diretório é destinado a **funções utilitárias** que não se encaixam diretamente em componentes ou hooks. Pode incluir funções para formatação de data, cálculos ou qualquer outra lógica auxiliar.

**Exemplo:**
- `formatDate.js`: Função para formatar datas.

---

### 📁 `src/services/`
Aqui você deve armazenar funções que se comunicam com APIs ou fazem manipulação de dados. Esse diretório contém o código que lida com a obtenção de informações externas ou processamento de dados da aplicação.

**Exemplo:**
- `api.js`: Funções para fazer requisições à API (ex: `fetchUsuarios`).

---

### 📁 `public/` (opcional)
Este diretório (caso exista) é utilizado para armazenar **arquivos públicos** que podem ser acessados diretamente via URL, como imagens, fontes, ou o favicon.

**Exemplo:**
- `favicon.ico`: Favicon da aplicação.
- `logo.png`: Imagem do logo.

---

## Conclusão

Essa estrutura modularizada foi criada para tornar o projeto escalável, organizado e fácil de manter. A separação de responsabilidades entre componentes, hooks, layouts e outros ajuda a garantir que o código permaneça limpo e reutilizável à medida que o projeto cresce.
