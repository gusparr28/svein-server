import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { RequestUserDto, toDto } from '../../svein/users/domain/user.dto';
import Schemas from '../../swagger/schemas';
import AuthHandler from '../handlers/auth/auth.handler';

const authHandler = AuthHandler.instance();

const authRoutes = (fastify: FastifyInstance) => {
  fastify.post('/auth/signup', {
    schema: Schemas.auth.signUp.schema,
  }, async (request: FastifyRequest<{
    Body: {
      entity: RequestUserDto
    }
  }>, reply: FastifyReply) => {
    const { entity } = request.body;
    try {
      const user = await authHandler.signUp(Schemas.auth.signUp.schema, entity);
      reply.code(200).send({
        status: 200,
        resource: toDto(user),
      });
    } catch (e: any) {
      reply.code(500).send({
        status: 500,
        error: e.message,
      });
    }
  });

  fastify.post('/auth/signin', {
    schema: Schemas.auth.signIn.schema,
  }, async (
    request: FastifyRequest<{
      Body: {
        entity: RequestUserDto
      }
    }>,
    reply: FastifyReply,
  ) => {
    const { entity } = request.body;
    try {
      const token = await authHandler.signIn(Schemas.auth.signIn.schema, entity);
      reply.code(200).send({
        status: 200,
        resource: {
          token,
        },
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
