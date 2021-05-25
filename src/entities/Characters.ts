import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne } from 'typeorm';
import { Planets } from './Planets';

@Entity()
export class Characters extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Planets, planet => planet.characters)
    planet: Planets;

    @Column({ unique: true })
    name: string;

    // @Column()
    // description: string;

    // @Column()
    // image_url: string;

    // @Column()
    // height: number;

    // @Column()
    // mass: number;

    // @Column()
    // hair_color: string;

    // @Column()
    // skin_color: string;

    // @Column()
    // eye_color: string;

    // @Column()
    // birth_year: string;

    // @Column()
    // gender: string;

    // @Column()
    // created: string;

    // @Column()
    // edited: string;

    // @Column()
    // url: string;

}