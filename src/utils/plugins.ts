import bcrypt from 'fastify-bcrypt';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import { app } from '../app';
import { environmentVariables } from './loadEnvVariables';

app.register(bcrypt, {
  saltWorkFactor: 12,
});

app.register(cors, {
  origin: true,
});

app.register(jwt, {
  secret: environmentVariables.JWT_SECRET,
});
