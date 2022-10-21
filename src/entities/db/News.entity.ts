import {
    Entity, Column,
    PrimaryGeneratedColumn,
    ManyToOne, JoinColumn,
} from "typeorm"
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

    @Column({
        name: "created_at",
        readonly: true,
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        nullable: true,
    })
    createdAt: Date

    @Column({
        name: "updated_at",
        // readonly: true,
        type: 'timestamp',
        nullable: true,
    })
    updatedAt: Date
}
