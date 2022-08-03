import Fastify, { FastifyInstance } from 'fastify';
import bcrypt from 'fastify-bcrypt';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import oauth2, { OAuth2Namespace } from '@fastify/oauth2';
import fastifySwagger from '@fastify/swagger';
import fastifyBasicAuth from '@fastify/basic-auth';
import validate from './swagger/validate';
import Schemas from './swagger/schemas';

declare module 'fastify' {
  interface FastifyInstance {
    facebookOAuth2: OAuth2Namespace;
    googleOAuth2: OAuth2Namespace;
  }
}

const {
  NODE_ENV, PORT, JWT_SECRET, STAGING_URL, PRODUCTION_URL, FACEBOOK_ID, FACEBOOK_SECRET, GOOGLE_ID,
  GOOGLE_SECRET,
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

// oauth2

app.register(oauth2, {
  name: 'facebookOAuth2',
  scope: [],
  credentials: {
    client: {
      id: FACEBOOK_ID!,
      secret: FACEBOOK_SECRET!,
    },
    auth: oauth2.FACEBOOK_CONFIGURATION,
  },
  startRedirectPath: '/auth/signin/facebook',
  callbackUri: 'http://localhost:3000/auth/signin/facebook/callback',
  schema: Schemas.auth.facebookSignIn.schema,
});

app.register(oauth2, {
  name: 'googleOAuth2',
  scope: ['profile', 'email'],
  credentials: {
    client: {
      id: GOOGLE_ID!,
      secret: GOOGLE_SECRET!,
    },
    auth: oauth2.GOOGLE_CONFIGURATION,
  },
  startRedirectPath: '/auth/signin/google',
  callbackUri: 'http://localhost:3000/auth/signin/google/callback',
  schema: Schemas.auth.googleSignIn.schema,
});
