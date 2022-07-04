import { FastifyReply, FastifyRequest } from 'fastify';
import { app } from '../app';

import { userRoutes } from './routes/users/users';

app.register(userRoutes);

app.register(async () => {
  // default route
  app.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    reply.code(200).send({
      status: 200,
      message: `you just found my server and now I know your IP: ${request.ip}`,
    });
  });

  // health route
  app.get('/health', async (_, reply: FastifyReply) => {
    reply.code(200).send({
      status: 200,
      message: 'your health is okay',
    });
  });

  // get route not found
  app.get('*', async (_, reply: FastifyReply) => {
    reply.code(404).send({
      status: 404,
      message: 'oops, where you going?',
    });
  });

  // post route not found
  app.post('*', async (_, reply: FastifyReply) => {
    reply.code(404).send({
      status: 404,
      message: 'oops, where you going?',
    });
  });

  // patch route not found
  app.patch('*', async (_, reply: FastifyReply) => {
    reply.code(404).send({
      status: 404,
      message: 'oops, where you going?',
    });
  });

  // put route not found
  app.put('*', async (_, reply: FastifyReply) => {
    reply.code(404).send({
      status: 404,
      message: 'oops, where you going?',
    });
  });

  // delete route not found
  app.delete('*', async (_, reply: FastifyReply) => {
    reply.code(404).send({
      status: 404,
      message: 'oops, where you going?',
    });
  });
});
