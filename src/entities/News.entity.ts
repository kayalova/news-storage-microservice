import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm"
import { AuthorEntity } from "./Author.entity"

@Entity({ name: "news" })
export class NewsEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length: 255,
    })
    header: string

    @Column("text")
    description: string

    @ManyToOne(() => AuthorEntity, (author) => author.news, { cascade: true })
    author: AuthorEntity

    // @Column({
    //     type: 'date',
    //     nullable: false,
    //     default: Date.now()
    // })
    // createdat: string

    @Column({ nullable: false, default: false })
    isPublished: boolean

    @Column({ type: "int" })
    views: number
}