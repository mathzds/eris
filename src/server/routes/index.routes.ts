import type { FastifyInstance } from "fastify";

export default async (server: FastifyInstance) => {
	server.get("/", async (_, reply) => {
		reply.type("text/plain").status(200);
		return "Hello, world!";
	});
};
