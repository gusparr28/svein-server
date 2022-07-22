import Fastify, { FastifyInstance } from 'fastify';
import bcrypt from 'fastify-bcrypt';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import oauth2 from '@fastify/oauth2';
import fastifySwagger from '@fastify/swagger';
import fastifyBasicAuth from '@fastify/basic-auth';
import validate from './swagger/validate';

const {
  NODE_ENV, PORT, JWT_SECRET, STAGING_URL, PRODUCTION_URL,
} = process.env;

const validatedHost: string = NODE_ENV === 'development' ? `localhost:${PORT!}` : NODE_ENV === 'staging'
  ? STAGING_URL!
  : PRODUCTION_URL!;

const exposeRoute: boolean = NODE_ENV === 'development' ? true : NODE_ENV === 'staging';

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

// bcrypt
app.register(bcrypt, {
  saltWorkFactor: 12,
});

// cors
app.register(cors, {
  origin: true,
});

// jwt
app.register(jwt, {
  secret: JWT_SECRET!,
});

// basic-auth
app.register(fastifyBasicAuth, { validate, authenticate: true });

// swagger
app.register(fastifySwagger, {
  routePrefix: '/docs',
  exposeRoute,
  uiHooks: {
    onRequest: app.basicAuth,
  },
  swagger: {
    info: {
      title: 'Svein Server API Documentation',
      version: '0.0.1',
    },
    host: validatedHost,
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
  },
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
