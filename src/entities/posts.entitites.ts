import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import Users from "./users.entities"

@Entity("posts")
class Posts {
    @PrimaryGeneratedColumn("uuid")
    id: string
    
    @Column()
    description: string

    @Column()
    book: string

    @Column()
    subway: string

    @Column()
    location: string

    @Column()
    picture: string

    @CreateDateColumn()
    createdOn: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt: Date

    @ManyToOne(() => Users, users => users.posts)
    user: Users
}

export default Posts