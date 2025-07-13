# 🔧 Handyman API 

Este é o back-end do projeto acadêmico **Handyman**, uma API desenvolvida para dar suporte ao site de conexão entre prestadores de serviços manuais e clientes.

## 🌐 Links do projeto

- 🖥️ Front-end: [https://handymanssfront.vercel.app/](https://handymanssfront.vercel.app/)
- 🔗 API (produção): [https://handyman-back-production.up.railway.app](https://handyman-back-production.up.railway.app)


## 🚀 Tecnologias utilizadas

O back-end foi desenvolvido com as seguintes tecnologias:

- 🟨 [Node.js](https://nodejs.org/)
- ⚙️ [Express](https://expressjs.com/)
- 🟦 [TypeScript](https://www.typescriptlang.org/)
- 🧬 [Mongoose](https://mongoosejs.com/) (ODM para MongoDB)
- 🧾 [JWT (JSON Web Token)](https://jwt.io/) para autenticação
- 🔐 [bcryptjs](https://www.npmjs.com/package/bcryptjs) para hash de senhas
- 🔌 [Socket.IO](https://socket.io/) para comunicação em tempo real
- 🛢️ Banco de dados: [MongoDB](https://www.mongodb.com/)

## 🔐 Segurança

- As senhas dos usuários são **criptografadas com hash** utilizando `bcryptjs`.
- A autenticação de usuários é feita por meio de **tokens JWT**.
- As rotas protegidas exigem um token válido no cabeçalho da requisição.

## 📌 Funcionalidades principais

- Cadastro e login de usuários
- Autenticação com JWT
- Requisições seguras ao banco de dados MongoDB com Mongoose
- Comunicação em tempo real com Socket.IO
- CRUD para serviços manuais e usuários

## 🧪 Como rodar localmente

Clone o repositório:

git clone https://github.com/samuelmuzy/Handyman-back.git

cd handyman-backend

Instale as dependências:

npm install

Inicie o servidor:

npm run dev

## 📚 Sobre o projeto
Este back-end foi desenvolvido como parte de um projeto acadêmico, com o objetivo de aplicar práticas modernas de desenvolvimento de APIs seguras e escaláveis, integrando autenticação, banco de dados e comunicação em tempo real.

## 👨‍💻 Contribuição
Sinta-se à vontade para abrir issues ou enviar pull requests com melhorias ou sugestões. Toda contribuição é bem-vinda!





