# Loja - e-commerce

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![NPM](https://img.shields.io/badge/NPM-CB3837?style=for-the-badge&logo=npm&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)

## 📌 Sobre

Este projeto consiste em uma API REST para um pequeno e-commerce,
responsável pelo gerenciamento de clientes, produtos, favoritos,
carrinho e pedidos.

A aplicação foi desenvolvida com foco em organização de código,
separação de responsabilidades, segurança e regras de negócio.

## 🎯 Objetivo

O objetivo do projeto é fornecer uma API capaz de centralizar
as operações de um pequeno e-commerce, permitindo o gerenciamento
de produtos e clientes e o processamento de pedidos.

## ✨ Funcionalidades

### Cliente

- [x] Cadastro de usuário
- [x] Login de usuário
- [x] Autenticação JWT
- [x] Edição de dados
- [x] Deleção de conta
- [] Favoritar produtos
- [] Pesquisar produtos
- [] Consultar produtos
- [] Gerenciamento de carrinho
- [] Criação de pedido
- [] Consulta de pedido

### Administrador

- [] Cadastro produto
- [] Atualização de produtos
- [] Controle de estoque
- [] Gerenciamento de pedidos
- [] Alteração de status de pedidos

### Produto

- [x] Paginação de produtos
- [x] Criar estoque de produto
- [x] Editar estoque de produto
- [x] Deletar estoque de produto
- [] Categorias de produtos

## 📋 Regras de negócio

- Autenticação
    - [x] Validar cpf/email antes de cadastrar cliente;
    - [x] Controle de tentativas de cadastro;
    - [x] Controle de tentativas de login;
    - [x] Autenticação;
    - [] Validar email temporario ou inexistente;
- Cliente
    - [x] Validar autenticação do cliente para edição;
    - [x] Validar autenticação do cliente antes de exclusão;
    - [] Validar autenticação para visualizar dados;
    - [] Validar autenticação para visualizar historico;
- Produto
    - [x] Validar autenticação do cliente para lista produtos
    - [x] Validar autentucação do usuário antes de editar
    - [x] Validar autentucação do usuário antes de deletar

## 🔌 Endpoints

### Auth

| Metodo | Endpoit          | Descrição       |
| ------ | ---------------- | --------------- |
| post   | /api/v1/login    | Solicitar login |
| post   | /api/v1/register | Criar conta     |

### Cliente

| Metodo | Endpoit                  | Descrição                |
| ------ | ------------------------ | ------------------------ |
| get    | /api/v1/users/me         | Obter dados da conta     |
| get    | /api/v1/users/me/history | Obter historico da conta |
| put    | /api/v1/users/me         | Editar dados da conta    |
| delete | /api/v1/users/me         | Deletar conta            |

### Produtos

| Metodo | Endpoit              | Descrição                  |
| ------ | -------------------- | -------------------------- |
| get    | /api/v1/products     | Lista de produtos          |
| post   | /api/v1/products     | Criar estoque de produto   |
| put    | /api/v1/products/:id | Editar dados do produto    |
| delete | /api/v1/products/:id | Deletar estoque de produto |
