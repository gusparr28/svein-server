import { UserSignIn, UserSignUp } from '@root/utils/types/auth';
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
      entity: UserSignUp
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
        entity: UserSignIn
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

  fastify.get('/auth/signin/facebook/callback', {
    schema: {
      hide: true,
    },
  }, async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const userInfo = await authHandler.facebookSignIn(request);
      reply.code(200).send({
        status: 200,
        resource: userInfo,
      });
    } catch (e: any) {
      reply.code(500).send({
        status: 500,
        error: e.message,
      });
    }
  });

  fastify.get('/auth/signin/google/callback', {
    schema: {
      hide: true,
    },
  }, async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const userInfo = await authHandler.googleSignIn(request);
      reply.code(200).send({
        status: 200,
        resource: userInfo,
      });
    } catch (e: any) {
      reply.code(500).send({
        status: 500,
        error: e.message,
      });
    }
  });

  fastify.patch('/auth/user/update', {
    schema: Schemas.auth.update.schema,
  }, async (request: FastifyRequest<{
    Body: {
      entity: RequestUserDto,
    }
  }>, reply: FastifyReply) => {
    const { entity } = request.body;

    try {
      const updatedUser = await authHandler.update(entity);
      reply.code(200).send({
        status: 200,
        resource: toDto(updatedUser),
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
