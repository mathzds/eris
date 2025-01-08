import colors from "@/libs/colors";
import { Event } from "@/types/app.d";
import { EmbedBuilder } from "discord.js";

export default new Event({
	name: "messageCreate",
	run: (message) => {
		if (message.author.bot) return;

		if (message.mentions.users.has(client.user.id)) {
			const embed = new EmbedBuilder({
				description:
					"Hello there! I'm a simple discord bot with userful features for you and your server.",
				color: colors.default,
			});

			message.reply({ embeds: [embed] });
		}
	},
});
