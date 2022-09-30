import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { UserEntity } from "./User.entity"

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

    @ManyToOne(
        () => UserEntity,
    )
    @JoinColumn({ name: "user_id" })
    author: UserEntity

    @CreateDateColumn({
        name: "created_at",
        readonly: true,
        type: 'timestamp'
    })
    createdAt: Date

    @UpdateDateColumn({
        name: "updated_at",
        readonly: true,
        type: 'timestamp'
    })
    updatedAt: Date
}