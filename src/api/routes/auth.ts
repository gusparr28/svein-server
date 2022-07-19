import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { UserDto } from '@root/svein/users/dto/user.dto';
import { SignIn, SignUp } from '@root/utils/types/auth';
import AuthHandler from '../handlers/auth/auth.handler';

const authHandler = AuthHandler.instance();

const authRoutes = (fastify: FastifyInstance) => {
  fastify.post('/auth/signup', async (request: FastifyRequest<{
    Body: {
      entity: SignUp
    }
  }>, reply: FastifyReply) => {
    const { entity } = request.body;

    try {
      const { id, username, email } = await authHandler.signUp(entity);

      const userDto: UserDto = {
        id,
        username,
        email,
      };

      reply.code(200).send({
        status: 200,
        resource: userDto,
      });
    } catch (e: any) {
      reply.code(500).send({
        status: 500,
        error: e.message,
      });
    }
  });

  fastify.post('/auth/signin', async (
    request: FastifyRequest<{
      Body: {
        entity: SignIn
      }
    }>,
    reply: FastifyReply,
  ) => {
    const { entity } = request.body;

    try {
      const token = await authHandler.signIn(entity);
      reply.code(200).send({
        status: 200,
        token,
      });
    } catch (e: any) {
      reply.code(500).send({
        status: 500,
        error: e.message,
      });
    }
  });
};

export { authRoutes };
