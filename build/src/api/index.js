"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { verifyJwt } from '../utils/hooks';
const app_1 = require("../app");
const auth_1 = require("./routes/auth");
// unprotected routes
app_1.app.register(async (fastify) => {
    (0, auth_1.authRoutes)(fastify);
});
app_1.app.register(async (fastify) => {
    // verifyJwt(fastify);
    fastify.get('/', (request, reply) => {
        reply.code(200).send({
            status: 200,
            message: `you just found my server and now I know your IP: ${request.ip}`,
        });
    });
    fastify.get('/health', (_, reply) => {
        reply.code(200).send({
            status: 200,
            message: 'your health is okay',
        });
    });
    fastify.get('*', (_, reply) => {
        reply.code(404).send({
            status: 404,
            message: 'oops, where you going?',
        });
    });
    fastify.post('*', (_, reply) => {
        reply.code(404).send({
            status: 404,
            message: 'oops, where you going?',
        });
    });
    fastify.patch('*', (_, reply) => {
        reply.code(404).send({
            status: 404,
            message: 'oops, where you going?',
        });
    });
    fastify.put('*', (_, reply) => {
        reply.code(404).send({
            status: 404,
            message: 'oops, where you going?',
        });
    });
    fastify.delete('*', (_, reply) => {
        reply.code(404).send({
            status: 404,
            message: 'oops, where you going?',
        });
    });
});
