import fastify, { FastifyReply } from 'fastify';

const server = fastify();

server.get('/', async (_, reply: FastifyReply) => {
  reply.code(200).send({
    status: 200,
    message: 'peek-a-boo',
  });
});

export default server;
