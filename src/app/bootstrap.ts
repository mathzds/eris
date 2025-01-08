import type {
	CommandType,
	ComponentsButton,
	ComponentsModal,
	ComponentsSelect,
	EventType,
} from '#app'
import { onError } from '@libs/error'
import {
	ActivityType,
	type ApplicationCommandDataResolvable,
	type BitFieldResolvable,
	Client,
	type ClientEvents,
	Collection,
	type CommandInteractionOptionResolver,
	type GatewayIntentsString,
	IntentsBitField,
	Partials,
} from 'discord.js'
import fs from 'node:fs/promises'
import path from 'node:path'

const EVENTS = new Collection<string, EventType<keyof ClientEvents>>()
const COMMANDS = new Collection<string, CommandType>()

const BUTTONS: ComponentsButton = new Collection()
const SELECTS: ComponentsSelect = new Collection()
const MODALS: ComponentsModal = new Collection()

async function loadEvents() {
	const eventsPath = path.resolve("src/app/", 'events')

	const eventsFiles = (
		await fs.readdir(eventsPath, {
			recursive: true,
			withFileTypes: true,
		})
	).filter(
		dirent =>
			dirent.isFile() &&
			(dirent.name.endsWith('.ts') || dirent.name.endsWith('.js')),
	)

	for (const eventFile of eventsFiles) {
		const event: EventType<keyof ClientEvents> = (
			await import(
				path.resolve(eventsPath, eventFile.parentPath, eventFile.name)
			)
		)?.default

		if (!event.name) continue

		EVENTS.set(event.name, event)
	}

	return () => {
		const events = EVENTS.values()

		for (const event of events) {
			try {
				if (event.name)
					event.once
						? client.once(event.name, event.run)
						: client.on(event.name, event.run)
				console.debug(
					`[${events.toArray().length}].purple events has been registered!`,
				)
			} catch (error) {
				console.error(
					`Unable to register the application event ${event.name}.\n${error}`,
				)
			}
		}
	}
}

async function loadCommands() {
	const commandsPath = path.resolve("src/app/", 'commands')

	const commandFiles = (
		await fs.readdir(commandsPath, {
			recursive: true,
			withFileTypes: true,
		})
	).filter(
		dirent =>
			dirent.isFile() &&
			(dirent.name.endsWith('.ts') || dirent.name.endsWith('.js')),
	)

	for (const commandFile of commandFiles) {
		const command: CommandType = (
			await import(
				path.resolve(commandsPath, commandFile.parentPath, commandFile.name)
			)
		)?.default

		if (!command.name) continue

		COMMANDS.set(command.name, command)

		if (command.buttons)
			command.buttons.forEach((run, key) => BUTTONS.set(key, run))
		if (command.selects)
			command.selects.forEach((run, key) => SELECTS.set(key, run))
		if (command.modals)
			command.modals.forEach((run, key) => MODALS.set(key, run))
	}

	return () => {
		const commands =
			COMMANDS.values().toArray() as ApplicationCommandDataResolvable[]

		try {
			client.application?.commands.set(commands)
			console.debug(`[${commands.length}].purple commands has been registered!`)
		} catch (error) {
			console.error(`Unable to register the application commands.\n${error}`)
		}
	}
}

export default async () => {
	const client = new Client<true>({
		intents: Object.keys(IntentsBitField.Flags) as BitFieldResolvable<
			GatewayIntentsString,
			number
		>,
		partials: [
			Partials.Channel,
			Partials.GuildMember,
			Partials.GuildScheduledEvent,
			Partials.Message,
			Partials.Reaction,
			Partials.ThreadMember,
			Partials.User,
		],
	})
	global.client = client

	const registerCommands = await loadCommands()
	const registerEvents = await loadEvents()

	client.once('ready', () => {
		registerCommands()
		registerEvents()

		client.user?.setPresence({
			status: 'idle',
			activities: [
				{
					name: 'Under development...',
					state: 'Mention me to get help!',
					type: ActivityType.Playing,
				},
			],
		})

		console.info(
			`Discord application connected as ${client.user?.displayName}!`,
		)
	})

	client.on('interactionCreate', async interaction => {
		if (interaction.isCommand()) {
			const command = COMMANDS.get(interaction.commandName)
			if (!command) return

			if (interaction.isAutocomplete() && command.autoComplete) {
				command.autoComplete(interaction)
				return
			}

			if (interaction.isChatInputCommand()) {
				const options = interaction.options as CommandInteractionOptionResolver
				command.run({ client, interaction, options })
				return
			}
		} else {
			if (interaction.isButton())
				BUTTONS.get(interaction.customId)?.(interaction)

			if (interaction.isStringSelectMenu())
				SELECTS.get(interaction.customId)?.(interaction)

			if (interaction.isModalSubmit())
				MODALS.get(interaction.customId)?.(interaction)
		}
	})

	client.on('error', error => onError(error))

	try {
		await client.login(process.env.DISCORD_TOKEN)
	} catch (error) {
		console.error('An error has occurred while trying to connect to discord!')
		console.error(`${error}`)
	}
}
