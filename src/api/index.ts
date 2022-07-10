import { FastifyReply, FastifyRequest } from 'fastify';
import { app } from '../app';

import { authRoutes } from './routes/auth';

app.register(authRoutes);

app.register(async () => {
  app.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    reply.code(200).send({
      status: 200,
      message: `you just found my server and now I know your IP: ${request.ip}`,
    });
  });

  app.get('/health', async (_, reply: FastifyReply) => {
    reply.code(200).send({
      status: 200,
      message: 'your health is okay',
    });
  });

  app.get('*', async (_, reply: FastifyReply) => {
    reply.code(404).send({
      status: 404,
      message: 'oops, where you going?',
    });
  });

  app.post('*', async (_, reply: FastifyReply) => {
    reply.code(404).send({
      status: 404,
      message: 'oops, where you going?',
    });
  });

  app.patch('*', async (_, reply: FastifyReply) => {
    reply.code(404).send({
      status: 404,
      message: 'oops, where you going?',
    });
  });

  app.put('*', async (_, reply: FastifyReply) => {
    reply.code(404).send({
      status: 404,
      message: 'oops, where you going?',
    });
  });

  app.delete('*', async (_, reply: FastifyReply) => {
    reply.code(404).send({
      status: 404,
      message: 'oops, where you going?',
    });
  });
});
