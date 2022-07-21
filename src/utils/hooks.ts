import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';

export const verifyJwt = (fastify: FastifyInstance) => {
  fastify.addHook('onRequest', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify();
    } catch (e) {
      reply.code(401).send({
        status: 401,
        error: e,
      });
    }
  });
};
