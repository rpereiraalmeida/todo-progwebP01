# GRUPO ABERTO (??)

# To-Do App

To-Do é uma aplicação web para gerenciamento de tarefas diárias simples.
Com esta ferramenta é possível definir atividades e gerenciar o status das mesmas.


## Configurando ambiente

Para começar a usar o app, primeiro tenha o docker e docker compose instalado na máquina.
Em seguida va até a raiz do projeto e use o campo

> docker-compose up -d

Para subir um container docker com o PostgresSQL configurado, olhe o arquivo para ver as portas de acesso e credenciais de usuário caso tenha problemas.
Em seguida lembresse de olhar o arquivo `.env` presente na raiz do projeto. Ele contem as constante que são usadas para iniciar a aplicação presente no arquivo `app.js`.

### O Arquivo '.Env'

Variáveis:

`SERVER_PORT` responsável por informar a aplicação a porta que usará

`DB_PORT` porta que está rodando o banco de dados

`DB_NAME` nome do database criado por padrão

`DB_USER` usuário criado por padrão no banco

`DB_PASSWORD` senha do usuário padrão

## Iniciando o app
Ao fazer o clone do repositório vá até a raiz do projeto e execute o comando:

> npm install

Para baixar as dependências do projeto, então com as variáveis de ambiente devidamente atribuídas, use o  comando:
> npm start

Para executar a aplicação com `nodemon`, a aplicação por padrão como definido no arquivo `.env` deve ser executada na porta 3333

## Integrantes do Grupo:
  1) GABRIEL COLMAN RODRIGUES
  2) JOAO PEDRO FIGUEIREDO DE OLIVEIRA 
  3) MURILO ESTECA ARELHANO
  4) RAPHAEL ALMEIDA MECENAS
  5) RODRIGO PEREIRA DE ALMEIDA

## Histórias de Usuário

- [ ] Definir tarefas
- [ ] Agrupar tarefas em listas
- [ ] Modificar o status das tarefas
- [ ] Visualizar tarefas e listas
- [ ] Publicar listas
- [ ] Buscar por tarefas e listas

## Histórias Bônus

- [ ] Definir datas limite
- [ ] Acompanhar o andamento geral
- [ ] Compartilhar listas com outros usuários
- [ ] Adicionar etiquetas de marcação
