# News storage microservice


Проект для создания и получения новостей. Получить новости может любой пользователь. Создать, обновить и удалить новость имеет право только автор этой новости, для этого ему нужно залогиниться и получить sessionId. 


Предполагается что создание и обновление новости - нечто важное, по этой причине после соответсвующих запросов приложение отправляет измененную/созданную новость через брокер сообщений в clickhouse для хранения с целью составления статистики


## Built with
 - Node.js
 - TypeScript
 - Express
 - PostgreSQL (typeorm)
 - Clickhouse
 - RabbitMQ
 - Redis


## Prerequisites
You need [Docker](https://www.docker.com/) to be installed and running on your computer


## Installation

```sh
$ git clone git@github.com:kayalova/news-storage-microservice.git
$ npm install
```

## To run application

```sh
$ docker-compose up
$ npm run start
```

## API 

В проекте 2 роли пользователей - атвор и читатель. После старта приложения необходимо запустить файл с мирациями в папке ```./src/migration``` для создания необходимых ролей. После этого можно создать автора
```
POST /api/users/create
body: json or form urlencoded
{ 
    firstName: string, 
    lastName: string, 
    email: string, 
    password: string, 
    role: string // should be "author"
}

POST /api/auth/login

GET /api/news/
query: all fields are optional 
{
    header: string,
    description: string,
    authorFirstName: string,
    authorLastName: string,
    skip: number
    take: number
}

GET /api/news/:id
params: {
    id: string
}

Authentictation required:

POST /api/news/create
body: json or form urlencoded
{
    header: string, 
    description: string, 
    id: string // should be actual id of author
}

PUT /api/news/update
body: json or form urlencoded
{
    header: string, //at least header or description should be provided
    description: string, 
    id: string
}

DELETE api/news/delete/:id
params {
    id: string
}

```
