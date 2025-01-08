import type { FastifyInstance } from "fastify";
import indexRoutes from "./routes/index.routes";

export default async (fastify: FastifyInstance) => {
	fastify.register(indexRoutes);
};
