import {
    Entity,
    Column, PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
} from "typeorm"

import { RoleEntity, UserRole } from "./Role.entity"

@Entity({ name: "users" })
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        name: "first_name",
        length: 50
    })
    firstName: string

    @Column({
        name: "last_name",
        length: 100
    })
    lastName: string

    @Column({ length: 100 })
    email: string

    @ManyToOne(() => RoleEntity, (role) => role.name)
    @JoinColumn({ name: "role_id" })
    role: UserRole
}


