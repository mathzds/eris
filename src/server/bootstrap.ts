import Fastify from 'fastify'
import routesRegister from './routesRegister'

export default () => {
	const server = Fastify()

	server.register(routesRegister)

	server.listen(
		{ host: process.env.HOST ?? '0.0.0.0', port: process.env.PORT ?? 8080 },
		(err, address) => {
			if (err) {
				console.error(err)
				process.exit(1)
			}

			console.info(`Web server successfully listening on ${address}`)
		},
	)
}
