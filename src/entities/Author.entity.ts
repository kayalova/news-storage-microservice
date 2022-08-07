import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { NewsEntity } from "./News.entity"

@Entity({ name: "authors" })
export class AuthorEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length: 255,
    })
    name: string

    @Column({
        length: 100,
        unique: true,
    })
    shortName: string

    @OneToMany(() => NewsEntity, (news) => news.author, { cascade: true })
    news: NewsEntity[]

    @Column({ nullable: false, default: false })
    isPublished: boolean

    @Column({ type: "int" })
    views: number
}