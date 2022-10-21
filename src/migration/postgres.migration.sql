
INSERT INTO roles (name, actions) VALUES ('author', 'create,update,read,delete');
-- INSERT INTO users (id, first_name, last_name, email, password, role_id) VALUES (1, 'Zarema', 'Kayalova', 'kayalova@gmail.com', 'ququ1212', 1) RETURNING id;
-- INSERT INTO news (header, description, user_id) VALUES ('MASS BREAKOUT FROM AZKABAN', 'In January 1996 a mass breakout from Azkaban set ten long-imprisoned Death Eaters loose.', 1);


--  когда в бд колонка camelcase ее нужно в sql запросе указывать в кавычках потому что постгрес сам приводит колонку к ловеркейс
/* 
даже если очистить таблицу, ид новых записей начнется с последней ранее удаленной строки этой таблицы
чтобы ресетнуть ид нужно проделать некоторые махинации

 */