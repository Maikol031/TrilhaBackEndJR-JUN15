
###  Trilha Inicial BackEnd Jr
[text](https://github.com/codigocerto/TrilhaBackEndJR-JUN15)

## Documentação:

Este projeto é uma API para gerenciamento de usuários e tarefas desenvolvida com Node.js e Express. A API utiliza autenticação JWT (JSON Web Tokens) e o banco de dados SQLite. A estrutura da API segue o padrão CRUD (Criar, Ler, Atualizar, Excluir) e retorna códigos de status HTTP apropriados.

Tecnologias Utilizadas
Linguagem: JavaScript
Framework: Express.js
Banco de Dados: SQLite
Autenticação: JSON Web Tokens (JWT)

Estrutura do Projeto
app.js: Ponto de entrada da aplicação.
routes/: Contém as rotas da API.
controllers/: Contém a lógica de controle das rotas.
models/: Define o modelo dos dados e interage com o banco de dados.
middleware/: Contém o middleware de autenticação JWT.

Códigos de Status HTTP
200 OK: Requisição bem-sucedida.
201 Created: Recurso criado com sucesso.
204 No Content: Recurso excluído com sucesso.
400 Bad Request: Requisição inválida ou com dados ausentes.
401 Unauthorized: Falha na autenticação ou token inválido.
404 Not Found: Recurso não encontrado.
500 Internal Server Error: Erro inesperado no servidor.

Como executar? 
Navegue até a raiz do projeto (TrilhaBackEndJR-JUN15) e em seu terminal execute "npm start"