import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany } from 'typeorm';
import { Characters } from './Characters';

@Entity()
export class Planets extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => Characters, character => character.planet)
    characters: Characters[];

    @Column({ unique: true })
    name: string;

    // @Column()
    // description: string;

    // @Column()
    // image_url: string;

    // @Column()
    // diameter: number;

    // @Column()
    // rotation_period: number;

    // @Column()
    // orbital_period: number;

    // @Column()
    // gravity: string;

    // @Column()
    // population: number;

    // @Column()
    // climate: string;

    // @Column()
    // terrain: string;

    // @Column()
    // surface_water: number;

    // @Column()
    // created: string;

    // @Column()
    // edited: string;

    // @Column()
    // url: string;

}