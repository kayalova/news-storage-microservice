import { DataSource } from "typeorm";
import { NewsEntity } from '../entities/News.entity'

export default class NewsRepository {
    private appDataSource: DataSource
    private repository;

    constructor(appDataSource: DataSource) {
        this.appDataSource = appDataSource
        this.repository = appDataSource.getRepository(NewsEntity)
    }

    getNews() {

    }

}