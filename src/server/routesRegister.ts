import type { FastifyInstance } from 'fastify'
import indexRoutes from './routes/index.routes'
import settingsRoutes from './routes/settings.routes'
import statisticsRoutes from './routes/statistics.routes'

export default async (fastify: FastifyInstance) => {
	fastify.register(indexRoutes)
	fastify.register(settingsRoutes, { prefix: 'settings' })
	fastify.register(statisticsRoutes, { prefix: 'statistics' })
}
