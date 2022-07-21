"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwt = void 0;
const verifyJwt = (fastify) => {
    fastify.addHook('onRequest', async (request, reply) => {
        try {
            await request.jwtVerify();
        }
        catch (e) {
            reply.code(401).send({
                status: 401,
                error: e,
            });
        }
    });
};
exports.verifyJwt = verifyJwt;
