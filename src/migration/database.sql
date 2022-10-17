
INSERT INTO roles (id, name, actions) VALUES (1, 'author', 'create,update,read,delete');
INSERT INTO users (id, first_name, last_name, email, password, role_id) VALUES (1, 'Zarema', 'Kayalova', 'kayalova@gmail.com', 'ququ1212', 1);
INSERT INTO news (header, description, user_id) VALUES ('MASS BREAKOUT FROM AZKABAN', 'In January 1996 a mass breakout from Azkaban set ten long-imprisoned Death Eaters loose.', 1);



-- postgres

-- CREATE DATABASE NEWSMICROSERVICE;

-- -- '1980-01-21'
--     -- createdAt DATE NOT NULL DEFAULT CURRENT_DATE,
-- CREATE TABLE news(
--     id SERIAL PRIMARY KEY,
--     header varchar(255) NOT NULL,
--     description TEXT,
--     author integer REFERENCES authors(id) NOT NULL, -- ?
--     isPublished BOOLEAN NOT NULL DEFAULT FALSE,
--     createdAt DATE NOT NULL DEFAULT CURRENT_DATE
-- );


-- INSERT INTO users (first_name, last_name, email, password, role_id) VALUES ('Zarema', 'Kayalova', 'kayalova@gmail.com', 'ququ1212', 1);
-- INSERT INTO users (first_name, last_name, email, password, role_id) VALUES ('Adam', 'Smith', 'greatadam@greatbritain.com', 'father of modern economics', 1);
-- INSERT INTO news (header, description, user_id) VALUES ('MASS BREAKOUT FROM AZKABAN', 'In January 1996 a mass breakout from Azkaban set ten long-imprisoned Death Eaters loose.', 1);


-- -- не получается свзять автора и новость
-- -- update news set author=3 where id=1

--  когда в бд колонка camelcase ее нужно в sql запросе указывать в кавычках потому что постгрес сам приводит колонку к ловеркейс
/* 
даже если очистить таблицу, 
ид новых записей начнется с последней ранее удаленной строки этой таблицы

чтобы ресетнуть ид нужно проделать некоторые махинации
 */