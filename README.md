# Loja - e-commerce

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)

API para uma loja de vendas de produtos online

## 🔠 Requisitos

- Autenticação
    - [] Cadastro de clientes;
    - [] Login de clientes;
    - [] Visualizar dados do cliente;
    - [] Editar dados do cliente;
    - [] Exclusão permanente do cliente;

## 💼 Regras de negócio

- Autenticação
    - [] Controle de tentativas de cadastro;
    - [] Controle de tentativas de login;
    - [] Não cadastrar cliente cadastrado;
    - [] Validar cadastro antes de cadastrar cliente;
    - [] Validar cadastro do cliente para edição;
    - [] Validar cadastro do cliente antes de exclusão;

## 🌉 Endpoints

- Autenticação
    - `get /users` buscar dados cadastrado
    - `post /users` criar uma conta
    - `put /users/:id` editar dados da conta
    - `delete /users/:id` deletar conta
