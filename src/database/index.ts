import { DataSource } from "typeorm";

export const database = new DataSource({
	type: "sqlite",
	database: "./database.sqlite",
	synchronize: true,
	logging: false,
	entities: [],
});

global.database = database;

export default database;
