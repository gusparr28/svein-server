import { FastifyRequest, FastifyReply } from 'fastify';
import { app } from '../app';
import { protectedRoutes } from './protectedRoutes';

app.addHook('onRequest', async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const path: string = request.routerPath;
    if (protectedRoutes[path]) {
      await request.jwtVerify();
    }
  } catch (e) {
    reply.code(401).send({
      status: 401,
      error: e,
    });
  }
});
