import "reflect-metadata";
import { DataSource } from "typeorm";
import User from "./models/user";

export const database = new DataSource({
	type: "sqlite",
	database: "./database.sqlite",
	synchronize: true,
	logging: false,
	entities: [User],
});

database
	.initialize()
	.then(() => {
		console.log("Database connected");
	})
	.catch((error) => {
		console.error(error);
	});

global.database = database;
