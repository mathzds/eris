import type { ISettingsGuild } from '@database/models/settings/Settings.model'
import type { FastifyInstance } from 'fastify'

export default async (server: FastifyInstance) => {
	server.get('/guilds', async (_, reply) => {
		const guilds = await database.settings.all<ISettingsGuild>()

		if (guilds.length === 0) {
			reply.type('application/json').status(404)
			return {
				error: 'Not found',
				statusCode: 404,
				message: 'No guilds entries on database has been found!',
			}
		}

		reply.type('application/json').status(200)
		return guilds
	})

	server.get('/guilds/:id', async (request, reply) => {
		const { id } = request.params as { id: string }

		const guildSettings = await database.settings.get<ISettingsGuild>(
			`guilds.${id}`,
		)

		if (!guildSettings) {
			reply.type('application/json').status(404)
			return {
				error: 'Not found',
				statusCode: 404,
				message: `The guild with id equals to ${id} has not been found in database!`,
			}
		}

		reply.type('application/json').status(200)
		return guildSettings
	})

	server.post('/guilds/', async (request, reply) => {
		const { id, language } = request.body as {
			id: string
			language: 'pt-BR' | 'en-US'
		}

		try {
			await database.settings.set<ISettingsGuild>(`guilds.${id}`, {
				language,
			})
			reply.type('application/json').code(200)
			return {
				message: 'Guild update complete successfully!',
			}
		} catch (error) {
			console.error(error)
			reply.type('application/json').code(400)
			return {
				message: 'Internal server error!',
			}
		}
	})
}
