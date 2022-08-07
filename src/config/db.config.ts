import { DataSource } from "typeorm";
import { NewsEntity } from "../entities/News.entity";

export const AppdataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "newsmicroservice",
    synchronize: true,
    // entities: [__dirname + "/entities/*.{js,ts}"], EntityMetadataNotFoundError: No metadata for "NewsEntity" was found.
    entities: [NewsEntity],
    subscribers: [],
    migrations: [],
})

export const connection = AppdataSource.initialize();
