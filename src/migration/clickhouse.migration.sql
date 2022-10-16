-- clickhouse
CREATE DATABASE IF NOT EXISTS newsmicroservice

CREATE TABLE news_history (
    `news_id` UInt32,
    `header` FixedString(255),
    `description` String,
    `created_at` Date,
    `updated_at` Nullable(Date),
    `author` String
)
ENGINE = MergeTree
ORDER BY news_id;

-- пишется баш скрипт, который использует cli clickhouse'a (postgresql, etc ) и передает этим cli клиентам путь к файлу с миграциями (без версионирования)

/* 
делается версионирование чтобы добавить в существующую бд только новые изменения (без наката данных, то есть не добавлять ранее созданные таблицы которые были уже добавлены ранее через другую миграцию)
для версионирования есть библиотеки с миграциями 
у каждой бд +- своя библиотека версионирования

кликхаусу не нужен уникальный ид (для каждой строки как в случае с постгресом)


            1 asd qqweqwe author: {email: zarema firstname: zarema}
news_id     1; 1; 2 ; 3
header      asd; asd
descr       
author
createdAt
updateAr
 */