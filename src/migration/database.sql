-- CREATE DATABASE NEWSMICROSERVICE;

-- -- '1980-01-21'
--     -- createdAt DATE NOT NULL DEFAULT CURRENT_DATE,
-- CREATE TABLE news(
--     id SERIAL PRIMARY KEY,
--     header varchar(255) NOT NULL,
--     description TEXT,
--     author integer REFERENCES authors(id) NOT NULL, -- ?
--     views INTEGER,
--     isPublished BOOLEAN NOT NULL DEFAULT FALSE,
--     createdAt DATE NOT NULL DEFAULT CURRENT_DATE
-- );

-- INSERT INTO news (header, description, author, views) VALUES
--     ('MASS BREAKOUT FROM AZKABAN', 'descr', 'In January 1996, a mass breakout from Azkaban set ten long-imprisoned Death Eaters loose.', 11),
--     ('BLACK STILL AT LARGE', 
--      'Sirius Black, possibly the most infamous prisoner ever to be held in Azkaban fortress, 
--                               is still eluding capture, the Ministry of Magic confirmed today.
--                               "We are doing all we can to recapture Black," said the Minister of Magic, 
--                               Cornelius Fudge, this morning, "and we beg the magical community to remain calm."',
--      'Daily Prophet',
--      21);


-- INSERT INTO authors (name, nickname, email) VALUES ('Daily Prophet', 'dailyProphet', 'daily@prophet.official');
-- INSERT INTO news (header, description, is_published, views) VALUES ('MASS BREAKOUT FROM AZKABAN', 'In January 1996 a mass breakout from Azkaban set ten long-imprisoned Death Eaters loose.', false, 1000); -- выполнилось без автора
-- INSERT INTO news (header, description, is_published, views, "author_id") VALUES ('MASS BREAKOUT FROM AZKABAN', 'In January 1996 a mass breakout from Azkaban set ten long-imprisoned Death Eaters loose.', false, 1000, 1);

-- -- не получается свзять автора и новость
-- -- update news set author=3 where id=1

--  когда в бд колонка camelcase ее нужно в запросе указывать в кавычках потому что постгрес сам приводит колонку к ловеркейс