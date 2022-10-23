import {
    Entity,
    Column,
    ManyToOne,
    JoinColumn,
    PrimaryGeneratedColumn,
    BeforeInsert,
} from "typeorm"

import { RoleEntity } from "./Role.entity"
import * as utils from '../../utils'

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

    @Column({ length: 100, unique: true })
    email: string

    @Column({ length: 100 })
    password: string

    @ManyToOne(() => RoleEntity, { cascade: true })
    @JoinColumn({ name: "role_id" })
    role: RoleEntity

    @BeforeInsert()
    async hashPassword() {
        this.password = await utils.hash(this.password)
    }

}


