import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class NewsEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length: 255,
    })
    header: string

    @Column("text")
    description: string

    @Column({
        length: 100,
    })
    author: string

    @Column({ type: 'date' })
    createdat: string

    @Column()
    isPublished: boolean

    @Column({ type: "int" })
    views: number
}   