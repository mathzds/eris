declare namespace NodeJS {
	interface ProcessEnv {
		NODE_ENV?: string;
		HOST?: string;
		PORT?: number;

		DISCORD_TOKEN: string;
		WEBHOOK_ERROR_URL?: string;
		WEBHOOK_ERROR_USERNAME: string;
		WEBHOOK_ERROR_AVATAR: string;
	}
}
