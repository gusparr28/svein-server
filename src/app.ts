import Fastify, { FastifyInstance } from 'fastify';
import { environmentVariables } from './utils/loadEnvVariables';

const { NODE_ENV, PORT } = environmentVariables;

export const port = PORT;

export const app: FastifyInstance = Fastify({
  logger: {
    transport:
      NODE_ENV === 'development'
        ? {
          target: 'pino-pretty',
          options: {
            ignore: 'pid,hostname,time',
          },
        }
        : undefined,
  },
});
