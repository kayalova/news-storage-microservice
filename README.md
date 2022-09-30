# news-storage-microservice


Проект для создания и просмотра новостей

2 роли: автор и читатель
автор: создает новость, удаляет, редактирует
читатель: получает, отфильтровывает

Список сущностей:
1. Пользователь
2. Роль
3. Новость

Описание 
User Entity
1. id
2. firstname
3. lastname
4. role_id // admin user developer manager 
5. email


Role Entity
1. id 1
2. name
3. actions: [create, edit, delete, read]

News Entity
1. id
2. header
3. description
4. author -> user_id
5. created_at
