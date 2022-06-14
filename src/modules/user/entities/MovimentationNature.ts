import {
	Column,
	Entity,
	PrimaryGeneratedColumn,
} from "typeorm";

@Entity("movimentation_nature")
export class MovimentationNature {
    @PrimaryGeneratedColumn("uuid")
	id: string;

    @Column()
	description: string;

    @Column()
	isEntry: boolean;
}