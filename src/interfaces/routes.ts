import { FastifyReply, FastifyRequest } from 'fastify';

export interface IRoutes {
  url: string;
  method: string;
  handler: (request: FastifyRequest, reply: FastifyReply) => FastifyReply;
}
