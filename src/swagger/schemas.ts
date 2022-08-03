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
    facebookSignIn: {
      schema: Pick<SchemaType, 'response'>
    },
    googleSignIn: {
      schema: Pick<SchemaType, 'response'>
    },
    update: {
      schema: SchemaType
    }
  },
  ip: {
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
            user: Type.String(),
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
    facebookSignIn: {
      schema: {
        response: {
          200: {
            description: 'Object with Facebook user\'s information',
            type: 'object',
            properties: {
              status: Type.Number(),
              resource: Type.Object({
                token: Type.String(),
                name: Type.String(),
                email: Type.String(),
                picture: Type.String(),
              }),
            },
          },
        },
      },
    },
    googleSignIn: {
      schema: {
        response: {
          200: {
            description: 'Object with Google user\'s information',
            type: 'object',
            properties: {
              status: Type.Number(),
              resource: Type.Object({
                token: Type.String(),
                name: Type.String(),
                email: Type.String(),
                picture: Type.String(),
              }),
            },
          },
        },
      },
    },
    update: {
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
            description: 'Object with updated user\'s information',
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
  },
  ip: {
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
