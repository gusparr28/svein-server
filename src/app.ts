import Fastify, { FastifyInstance } from 'fastify';
import bcrypt from 'fastify-bcrypt';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import { environmentVariables } from './utils/loadEnvVariables';

const { NODE_ENV, PORT, JWT_SECRET } = environmentVariables;

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

// plugins
app.register(bcrypt, {
  saltWorkFactor: 12,
});

app.register(cors, {
  origin: true,
});

app.register(jwt, {
  secret: JWT_SECRET,
});
