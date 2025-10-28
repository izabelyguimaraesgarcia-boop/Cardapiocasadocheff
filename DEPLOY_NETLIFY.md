# Guia de Deploy na Netlify

## Passo a Passo para Publicar seu Cardápio na Netlify (Gratuito)

### 1. Criar uma conta na Netlify
- Acesse [netlify.com](https://netlify.com)
- Clique em "Sign up"
- Escolha uma opção de login (GitHub, GitLab, Bitbucket ou email)
- Confirme seu email

### 2. Conectar seu repositório Git
Se você ainda não tem o código em um repositório Git, siga estas instruções:

**Opção A: Usar GitHub (Recomendado)**
1. Acesse [github.com](https://github.com) e crie uma conta (se não tiver)
2. Crie um novo repositório chamado `cardapio-casa-do-cheff`
3. No seu computador, abra o terminal na pasta do projeto
4. Execute os seguintes comandos:

```bash
git init
git add .
git commit -m "Initial commit - Cardápio Casa do Cheff"
git branch -M main
git remote add origin https://github.com/seu-usuario/cardapio-casa-do-cheff.git
git push -u origin main
```

### 3. Fazer Deploy na Netlify
1. Acesse [app.netlify.com](https://app.netlify.com)
2. Clique em "Add new site" → "Import an existing project"
3. Selecione seu provedor Git (GitHub, GitLab ou Bitbucket)
4. Autorize a Netlify a acessar seus repositórios
5. Selecione o repositório `cardapio-casa-do-cheff`
6. Configure o projeto:
   - **Build command**: `pnpm run build`
   - **Publish directory**: `dist`
7. Clique em "Deploy site"

A Netlify fará o deploy automaticamente e fornecerá um link temporário.

### 4. Configurar o domínio customizado
Após o deploy ser concluído:

1. Vá para as configurações do site na Netlify
2. Clique em "Domain settings"
3. Clique em "Edit site name"
4. Digite `cardapiocasadocheff`
5. Clique em "Save"

Seu site estará disponível em: **https://cardapiocasadocheff.netlify.app**

### 5. Atualizações futuras
Sempre que você fizer mudanças no código e fazer um `git push` para o repositório, a Netlify fará o deploy automaticamente!

---

## Alternativa: Deploy sem usar Git

Se preferir não usar Git, você pode fazer upload direto:

1. Acesse [app.netlify.com](https://app.netlify.com)
2. Clique em "Add new site" → "Deploy manually"
3. Selecione a pasta `dist` do seu projeto e arraste para a área de upload
4. Seu site será publicado automaticamente

---

## Suporte
Se tiver dúvidas durante o processo, consulte a [documentação oficial da Netlify](https://docs.netlify.com/).
