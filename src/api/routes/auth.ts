import { FastifyReply, FastifyRequest } from 'fastify';
import { UserDto } from '@root/svein/users/dto/User.dto';
import { SignUp } from '@root/utils/types/auth';
import { app } from '../../app';
import AuthHandler from '../handlers/auth/AuthHandler';

const authHandler = AuthHandler.instance();

const authRoutes = async () => {
  app.post('/auth/signup', async (request: FastifyRequest<{
    Body: {
      entity: SignUp
    }
  }>, reply: FastifyReply) => {
    const { entity } = request.body;

    try {
      const { id, username, email } = await authHandler.save(entity);

      const userDto: UserDto = {
        id,
        username,
        email,
      };

      reply.code(200).send({
        status: 200,
        data: userDto,
      });
    } catch (e) {
      reply.code(500).send({
        status: 500,
        error: e,
      });
    }
  });
};

export { authRoutes };
