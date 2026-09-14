# Loja - e-commerce

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![NPM](https://img.shields.io/badge/NPM-CB3837?style=for-the-badge&logo=npm&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)

API para uma loja de vendas de produtos online

## 🔠 Requisitos

- Autenticação / Usuário
    - [x] Cadastro de clientes;
    - [x] Login de clientes;
    - [x] Gerar token de acesso;
    - [] Validação de dois fatores.
- Interface
    - [x] Editar dados do cliente;
    - [x] Exclusão permanente do cliente;
    - [] Visualizar dados do cliente;
    - [] Visualizar historico de ações no sistema;

## 💼 Regras de negócio

- Autenticação / Usuário
    - [x] Não cadastrar cliente cadastrado;
    - [x] Validar cadastro antes de cadastrar cliente;
    - [x] Controle de tentativas de cadastro;
    - [x] Controle de tentativas de login;
    - [] Verificar autenticação e direcionar cliente;
    - [] Validar email temporario ou inexistente;
- Interface
    - [x] Validar cadastro do cliente para edição;
    - [x] Validar cadastro do cliente antes de exclusão;
    - [] Validar autenticação para visualizar dados;
    - [] Validar autenticação para visualizar historico;

## 🌉 Endpoints

- Autenticação
    - `post /api/v1/login` Solicitar dados do cliente / login
    - `post /api/v1/register` Criar uma conta
- Interface
    - `get /api/v1/users/me` Obter informações do cliente
    - `get /api/v1/users/me/history` Obter historico do cliente
    - `put /api/v1/users/me` Editar dados da conta
    - `delete /api/v1/users/me` Deletar conta
