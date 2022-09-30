import { DataSource } from "typeorm";
import { RoleEntity, UserEntity, NewsEntity } from "../entities";

export const AppdataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres", // перенести в process.env
    password: "postgres",
    database: "newsmicroservice",
    synchronize: true, // эта штука точно работает нормально? 
    // entities: [__dirname + "/entities/*.{js,ts}"], EntityMetadataNotFoundError: No metadata for "NewsEntity" was found. ?
    entities: [NewsEntity, RoleEntity, UserEntity],
    subscribers: [],
    migrations: [],
})

export const connection = AppdataSource.initialize();
