import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import Schemas from '../swagger/schemas';
// import { verifyJwt } from '../utils/hooks';
import { app } from '../app';
import { authRoutes } from './routes/auth';

// unprotected routes
app.register(async (fastify: FastifyInstance) => {
  authRoutes(fastify);
});

app.register(async (fastify: FastifyInstance) => {
  // verifyJwt(fastify);

  fastify.get('/', {
    schema: Schemas.emptyGet.schema,
  }, (request: FastifyRequest, reply: FastifyReply) => {
    reply.code(200).send({
      status: 200,
      message: `you just found my server and now I know your IP: ${request.ip}`,
    });
  });

  fastify.get('/health', {
    schema: Schemas.health.schema,
  }, (_, reply: FastifyReply) => {
    reply.code(200).send({
      status: 200,
      message: 'your health is okay',
    });
  });

  fastify.get('*', {
    schema: {
      hide: true,
    },
  }, (_, reply: FastifyReply) => {
    reply.code(404).send({
      status: 404,
      message: 'oops, where you going?',
    });
  });

  fastify.post('*', {
    schema: {
      hide: true,
    },
  }, (_, reply: FastifyReply) => {
    reply.code(404).send({
      status: 404,
      message: 'oops, where you going?',
    });
  });

  fastify.patch('*', {
    schema: {
      hide: true,
    },
  }, (_, reply: FastifyReply) => {
    reply.code(404).send({
      status: 404,
      message: 'oops, where you going?',
    });
  });

  fastify.put('*', {
    schema: {
      hide: true,
    },
  }, (_, reply: FastifyReply) => {
    reply.code(404).send({
      status: 404,
      message: 'oops, where you going?',
    });
  });

  fastify.delete('*', {
    schema: {
      hide: true,
    },
  }, (_, reply: FastifyReply) => {
    reply.code(404).send({
      status: 404,
      message: 'oops, where you going?',
    });
  });
});
