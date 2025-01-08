import { Command } from '@/types/app.d'

export default new Command({
	name: 'ping',
	description: 'See the bot latency',
	run: async ({ interaction }) => {
		await interaction.reply(`My latency is ${client.ws.ping}ms`)
	},
})
