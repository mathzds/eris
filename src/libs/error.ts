import { EmbedBuilder, WebhookClient } from "discord.js";
import colors from "./colors";

export async function onError(error: Error) {
	console.info(client.user.username);
	console.error(error.message);

	if (!process.env.WEBHOOK_ERROR_URL) return;

	const embed = new EmbedBuilder({
		author: {
			name: client.user.username,
			iconURL: client.user.displayAvatarURL({
				forceStatic: true,
			}),
		},
		title: "⚠️ | Error Report",
		description: `${error.name}: ${error.message}`,
		color: colors.danger,
	});

	const webhook = new WebhookClient({
		url: process.env.WEBHOOK_ERROR_URL,
	});

	await webhook.send({
		username:
			process.env.WEBHOOK_ERROR_USERNAME === ":client:"
				? client.user.username
				: process.env.WEBHOOK_ERROR_USERNAME,
		avatarURL:
			process.env.WEBHOOK_ERROR_AVATAR === ":client:"
				? client.user.displayAvatarURL()
				: process.env.WEBHOOK_ERROR_AVATAR,

		embeds: [embed],
	});

	process.exit(0);
}

process.on("SIGINT", () => {
	console.error("👋 Bye!");
	process.exit(0);
});
