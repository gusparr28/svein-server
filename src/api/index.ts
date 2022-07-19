import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
// import { verifyJwt } from '../utils/hooks';
import { app } from '../app';
import { authRoutes } from './routes/auth';

// unprotected routes
app.register(async (fastify: FastifyInstance) => {
  authRoutes(fastify);
});

app.register(async (fastify: FastifyInstance) => {
  // verifyJwt(fastify);

  fastify.get('/', (request: FastifyRequest, reply: FastifyReply) => {
    reply.code(200).send({
      status: 200,
      message: `you just found my server and now I know your IP: ${request.ip}`,
    });
  });

  fastify.get('/health', (_, reply: FastifyReply) => {
    reply.code(200).send({
      status: 200,
      message: 'your health is okay',
    });
  });

  fastify.get('*', (_, reply: FastifyReply) => {
    reply.code(404).send({
      status: 404,
      message: 'oops, where you going?',
    });
  });

  fastify.post('*', (_, reply: FastifyReply) => {
    reply.code(404).send({
      status: 404,
      message: 'oops, where you going?',
    });
  });

  fastify.patch('*', (_, reply: FastifyReply) => {
    reply.code(404).send({
      status: 404,
      message: 'oops, where you going?',
    });
  });

  fastify.put('*', (_, reply: FastifyReply) => {
    reply.code(404).send({
      status: 404,
      message: 'oops, where you going?',
    });
  });

  fastify.delete('*', (_, reply: FastifyReply) => {
    reply.code(404).send({
      status: 404,
      message: 'oops, where you going?',
    });
  });
});
