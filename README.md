# Loja - e-commerce

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)

API para uma loja de vendas de produtos online

## 🔠 Requisitos

- Autenticação / Usuário
    - [x] Cadastro de clientes;
    - [x] Login de clientes;
    - [x] Editar dados do cliente;
    - [] Exclusão permanente do cliente;
    - [] Validação de dois fatores;

## 💼 Regras de negócio

- Autenticação / Usuário
    - [x] Não cadastrar cliente cadastrado;
    - [x] Validar cadastro antes de cadastrar cliente;
    - [x] Validar cadastro do cliente para edição;
    - [] Validar cadastro do cliente antes de exclusão;
    - [] Controle de tentativas de cadastro;
    - [] Controle de tentativas de login;

## 🌉 Endpoints

- Autenticação / Usuário
    - `get /users` Obter informações do usuário
    - `post /login` Solicitar dados do cliente / login
    - `post /register` Criar uma conta
    - `put /users/:id` Editar dados da conta
    - `delete /users/:id` Deletar conta
