import { FastifyReply } from 'fastify';
import UsersHandler from '../../handlers/users/UsersHandler';
import { app } from '../../../app';

const usersHandler = new UsersHandler();

const userRoutes = async () => {
  app.get('/users', async (_, reply: FastifyReply) => {
    const users = await usersHandler.getUsers();
    reply.code(200).send(users);
  });
};

export { userRoutes };
