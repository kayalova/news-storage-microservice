import {
    Entity, Column,
    PrimaryGeneratedColumn,
} from "typeorm"

export enum UserRole {
    AUTHOR = "author",
    READER = "reader"
}

@Entity({ name: "roles" })
export class RoleEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: "enum",
        enum: UserRole,
    })
    name: string

    @Column("simple-array")
    actions: string[] // валидация ложится на руки человека
}
