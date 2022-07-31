import { DataSource } from "typeorm";

export const AppdataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "newsmicroservice",
    synchronize: true,
    entities: [__dirname + "/entities/*.{js,ts}"],
    subscribers: [],
    migrations: [],
})

export const connection = AppdataSource.initialize();
