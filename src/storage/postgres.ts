import { DataSource } from "typeorm";

import { RoleEntity, UserEntity, NewsEntity } from "../entities";

export default new DataSource({
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: true, // эта штука точно работает нормально? 
    entities: [NewsEntity, RoleEntity, UserEntity],
    subscribers: [],
    migrations: [],
})
