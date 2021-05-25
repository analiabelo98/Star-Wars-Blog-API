import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToMany, JoinTable } from 'typeorm';
import { Planets } from './Planets';
import { Characters } from './Characters';

@Entity()
export class Users extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    //Planetas favoritos
    @ManyToMany(() => Planets)
    @JoinTable()
    planets: Planets[];

    //Personajes favoritos
    @ManyToMany(() => Characters)
    @JoinTable()
    characters: Characters[];

    // @Column()
    // first_name: string;

    // @Column()
    // last_name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

}