import type db from "@database/index";
import type { Client } from "discord.js";

declare global {
	var client: Client<true>;
	var database: typeof db;

	interface globalThis {
		client: Client<true>;
		database: typeof db;
	}
}
