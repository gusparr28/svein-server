import Fastify, { FastifyInstance } from 'fastify';
import bcrypt from 'fastify-bcrypt';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import oauth2 from '@fastify/oauth2';

const { NODE_ENV, PORT, JWT_SECRET } = process.env;

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
  secret: JWT_SECRET!,
});

app.register(oauth2, {
  name: 'facebookOAuth2',
  credentials: {
    client: {
      id: '',
      secret: '',
    },
    auth: oauth2.FACEBOOK_CONFIGURATION,
  },
  startRedirectPath: '/login/facebook',
  callbackUri: 'http://localhost:3000/login/facebook/callback',
  scope: [],
});
