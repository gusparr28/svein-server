interface ISchemas {
  auth: {
    signUp: {
      schema: Record<string, object>
    },
    signIn: {
      schema: Record<string, object>
    }
  },
  emptyGet: {
    schema: Record<string, object>
  },
  health: {
    schema: Record<string, object>
  }
}

const Schemas: ISchemas = {
  auth: {
    signUp: {
      schema: {
        body: {
          entity: {
            type: 'object',
            properties: {
              email: { type: 'string' },
              username: { type: 'string' },
              password: { type: 'string' },
            },
          },
        },
        response: {
          200: {
            description: 'Object with new user\'s information',
            type: 'object',
            properties: {
              status: { type: 'number' },
              resource: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  username: { type: 'string' },
                  email: { type: 'string' },
                },
              },
            },
          },
        },
      },
    },
    signIn: {
      schema: {
        body: {
          entity: {
            type: 'object',
            properties: {
              email: { type: 'string' },
              username: { type: 'string' },
              password: { type: 'string' },
            },
          },
        },
        response: {
          200: {
            description: 'Object with existing user\'s information',
            type: 'object',
            properties: {
              status: { type: 'number' },
              resource: {
                type: 'object',
                properties: {
                  token: { type: 'string' },
                },
              },
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
            status: { type: 'number' },
            message: { type: 'string' },
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
            status: { type: 'number' },
            message: { type: 'string' },
          },
        },
      },
    },
  },
};

export default Schemas;
