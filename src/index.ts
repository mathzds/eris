import bootstrapApp from "#app/boostrap";
import bootstrapServer from "#fastify/bootstrap";
import "@database/index";
import "@libs/error";
import "@libs/logger";
import dotenv from "dotenv";

dotenv.config();
bootstrapApp().then(() => bootstrapServer());
