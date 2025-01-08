import type { FastifyInstance } from 'fastify'

export default async (server: FastifyInstance) => {
	server.get('/', async (_, reply) => {
		reply.type('application/json').status(200)
		return {
			endpoints: [
				'/statistics/',
				'/statistics/guilds',
				'/statistics/guilds/:id',
				'/statistics/users',
				'/statistics/users/:id',
			],
		}
	})

	server.get('/guilds', async (_, reply) => {
		const guilds = client.guilds.cache

		reply.type('application/json').code(200)
		return {
			count: guilds.size,
			guilds,
		}
	})
	server.get('/guilds/:id', async (request, reply) => {
		const { id } = request.params as { id: string }
		const guild = await client.guilds.fetch(id)

		reply.type('application/json').code(200)
		return guild
	})

	server.get('/users', async (_, reply) => {
		const users = client.users.cache

		reply.type('application/json').code(200)
		return {
			count: users.size,
			users,
		}
	})
	server.get('/users/:id', async (request, reply) => {
		const { id } = request.params as { id: string }
		const user = await client.users.fetch(id)

		reply.type('application/json').code(200)
		return user
	})
}
