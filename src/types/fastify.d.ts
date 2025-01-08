import type database from '@database/index'
import 'fastify'

declare module 'fastify' {
	interface FastifyInstance {
		db: typeof database
	}
}
