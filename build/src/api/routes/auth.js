"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const auth_handler_1 = __importDefault(require("../handlers/auth/auth.handler"));
const authHandler = auth_handler_1.default.instance();
const authRoutes = (fastify) => {
    fastify.post('/auth/signup', async (request, reply) => {
        const { entity } = request.body;
        try {
            const { id, username, email } = await authHandler.signUp(entity);
            const userDto = {
                id,
                username,
                email,
            };
            reply.code(200).send({
                status: 200,
                resource: userDto,
            });
        }
        catch (e) {
            reply.code(500).send({
                status: 500,
                error: e.message,
            });
        }
    });
    fastify.post('/auth/signin', async (request, reply) => {
        const { entity } = request.body;
        try {
            const token = await authHandler.signIn(entity);
            reply.code(200).send({
                status: 200,
                token,
            });
        }
        catch (e) {
            reply.code(500).send({
                status: 500,
                error: e.message,
            });
        }
    });
};
exports.authRoutes = authRoutes;
