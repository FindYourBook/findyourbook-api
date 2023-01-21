import { hashSync } from "bcryptjs"
import { BeforeInsert, BeforeRemove, BeforeUpdate, Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import Posts from "./posts.entitites"

@Entity("users") 
class Users {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    name: string

    @Column({ unique: true })
    email: string

    @Column()
    isAdm: boolean

    @Column({ default: true })
    isActive: boolean

    @Column({ select: false })
    password: string

    @CreateDateColumn()
    createdOn: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt: Date

    @BeforeRemove()
    isActiveChanged() {
        this.isActive = false
    }

    @BeforeUpdate()
    @BeforeInsert()
    hashPassword() {
        this.password = hashSync(this.password, 10)
    }

    @OneToMany(() => Posts, posts => posts.user)
    posts: Posts
}

export default Users