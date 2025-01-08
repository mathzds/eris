import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("users")
export default class User {
	@PrimaryColumn({ type: "varchar", unique: true })
	discordID!: string;

	@Column({ type: "varchar" })
	discordUsername!: string;
}
