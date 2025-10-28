# Guia de Deploy na Vercel

## Passo a Passo para Publicar seu Cardápio na Vercel (Gratuito)

### 1. Criar uma conta na Vercel
- Acesse [vercel.com](https://vercel.com)
- Clique em "Sign Up"
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

### 3. Fazer Deploy na Vercel
1. Acesse [vercel.com/dashboard](https://vercel.com/dashboard)
2. Clique em "Add New..." → "Project"
3. Clique em "Import Git Repository"
4. Selecione seu repositório `cardapio-casa-do-cheff`
5. Configure o projeto:
   - **Framework Preset**: Vite
   - **Build Command**: `pnpm run build` (deixe como está)
   - **Output Directory**: `dist` (deixe como está)
6. Clique em "Deploy"

### 4. Configurar o domínio customizado
Após o deploy ser concluído:

1. Vá para as configurações do projeto na Vercel
2. Clique em "Domains"
3. Clique em "Add Domain"
4. Digite `cardapiocasadocheff.vercel.app`
5. Clique em "Add"

Seu site estará disponível em: **https://cardapiocasadocheff.vercel.app**

### 5. Atualizações futuras
Sempre que você fizer mudanças no código e fazer um `git push` para o repositório, a Vercel fará o deploy automaticamente!

---

## Alternativa: Deploy sem usar Git

Se preferir não usar Git, você pode fazer upload direto:

1. Acesse [vercel.com/dashboard](https://vercel.com/dashboard)
2. Clique em "Add New..." → "Project"
3. Clique em "Upload"
4. Selecione a pasta `dist` do seu projeto
5. Configure o projeto e clique em "Deploy"

---

## Suporte
Se tiver dúvidas durante o processo, consulte a [documentação oficial da Vercel](https://vercel.com/docs).
