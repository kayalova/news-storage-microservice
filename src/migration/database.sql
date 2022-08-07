CREATE DATABASE NEWSMICROSERVICE;

-- '1980-01-21'
    -- createdAt DATE NOT NULL DEFAULT CURRENT_DATE,
CREATE TABLE news(
    id SERIAL PRIMARY KEY,
    header varchar(255) NOT NULL,
    description TEXT,
    author varchar(100) NOT NULL,
    views INTEGER,
    isPublished BOOLEAN NOT NULL DEFAULT FALSE,
    createdAt DATE NOT NULL DEFAULT CURRENT_DATE
);

INSERT INTO news (header, description, author, views) VALUES
    ('MASS BREAKOUT FROM AZKABAN', 'descr', 'Daily Prophet', 11),
    ('BLACK STILL AT LARGE', 
     'Sirius Black, possibly the most infamous prisoner ever to be held in Azkaban fortress, 
                              is still eluding capture, the Ministry of Magic confirmed today.
                              "We are doing all we can to recapture Black," said the Minister of Magic, 
                              Cornelius Fudge, this morning, "and we beg the magical community to remain calm."',
     'Daily Prophet',
     21);


