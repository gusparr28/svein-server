import Fastify, { FastifyInstance } from 'fastify';
import './database';

const environment = process.env.NODE_ENV;

export const port = process.env.PORT;

export const app: FastifyInstance = Fastify({
  logger: {
    transport:
      environment === 'development'
        ? {
          target: 'pino-pretty',
          options: {
            ignore: 'pid,hostname,time',
          },
        }
        : undefined,
  },
});
