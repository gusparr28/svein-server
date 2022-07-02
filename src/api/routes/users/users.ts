import { IRoutes } from '@root/interfaces/routes';
import { FastifyReply, FastifyRequest } from 'fastify';

const routes: IRoutes[] = [
  {
    url: '/users',
    method: 'GET',
    handler: (request: FastifyRequest, reply: FastifyReply): FastifyReply => reply.send('users'),
  },
];

export default routes;
