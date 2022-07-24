import { Type } from '@sinclair/typebox';

export type SchemaType = {
  body: Record<string, object>
  response: Record<string, object>
};

interface ISchemas {
  auth: {
    signUp: {
      schema: SchemaType
    },
    signIn: {
      schema: SchemaType
    }
  },
  emptyGet: {
    schema: Pick<SchemaType, 'response'>
  },
  health: {
    schema: Pick<SchemaType, 'response'>
  }
}

const Schemas: ISchemas = {
  auth: {
    signUp: {
      schema: {
        body: {
          entity: Type.Object({
            email: Type.String(),
            username: Type.String(),
            password: Type.String(),
          }),
        },
        response: {
          200: {
            description: 'Object with new user\'s information',
            type: 'object',
            properties: {
              status: Type.Number(),
              resource: Type.Object({
                id: Type.String(),
                username: Type.String(),
                email: Type.String(),
              }),
            },
          },
        },
      },
    },
    signIn: {
      schema: {
        body: {
          entity: Type.Object({
            email: Type.Optional(
              Type.String(),
            ),
            username: Type.Optional(
              Type.String(),
            ),
            password: Type.String(),
          }),
        },
        response: {
          200: {
            description: 'Object with existing user\'s information',
            type: 'object',
            properties: {
              status: Type.Number(),
              resource: Type.Object({
                token: Type.String(),
              }),
            },
          },
        },
      },
    },
  },
  emptyGet: {
    schema: {
      response: {
        200: {
          description: 'Funny message with your IP address',
          type: 'object',
          properties: {
            status: Type.Number(),
            message: Type.String(),
          },
        },
      },
    },
  },
  health: {
    schema: {
      response: {
        200: {
          description: 'Message telling you\'re healthy',
          type: 'object',
          properties: {
            status: Type.Number(),
            message: Type.String(),
          },
        },
      },
    },
  },
};

export default Schemas;
