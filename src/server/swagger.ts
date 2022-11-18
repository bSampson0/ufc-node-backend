const swaggerDocument = {
  swagger: '2.0',
  basePath: '/',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  paths: {
    '/fighter/': {
      get: {
        summary: 'Lists all the fighters',
        tags: ['fighter'],
        produces: ['application/json'],
        responses: {
          200: {
            description: 'Returns a list',
            schema: {
              $ref: '#/definitions/Fighter',
            },
          },
        },
      },
      post: {
        summary: 'Creates a fighter',
        tags: ['fighter'],
        parameters: [
          {
            name: 'fighter',
            in: 'body',
            required: true,
            schema: {
              $ref: '#/createUpdateDef/CreateUpdateFighter',
            },
          },
        ],
        produces: ['application/json'],
        responses: {
          201: {
            description: 'Returns a new fighter',
            schema: {
              $ref: '#/createUpdateDef/CreateUpdateFighter',
            },
          },
        },
      },
    },
    '/fighter/{id}': {
      get: {
        summary: 'Gets a fighter by its primary key',
        tags: ['fighter'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'integer',
          },
        ],
        responses: {
          200: {
            description: 'Returns a fighter with primary key',
            schema: {
              $ref: '#/definitions/Fighter',
            },
          },
        },
      },
      delete: {
        summary: 'Deletes a fighter by its primary key',
        tags: ['fighter'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'integer',
          },
        ],
        responses: {
          200: {
            description: 'OK',
          },
        },
      },
      put: {
        summary: 'Overrides the values of a fighter',
        tags: ['fighter'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              $ref: '#/definitions/Fighter',
            },
          },
          {
            name: 'fighter',
            in: 'body',
            required: true,
            schema: {
              $ref: '#/createUpdateDef/CreateUpdateFighter',
            },
          },
        ],
        responses: {
          200: {
            description: 'Returns a fighter',
            schema: {
              $ref: '#/definitions/Fighter',
            },
          },
        },
      },
      patch: {
        tags: ['fighter'],
        summary: 'patch a fighter',
        parameters: [
          {
            name: 'id',
            in: 'path',
            schema: {
              $ref: '#/definitions/Fighter',
            },
          },
          {
            name: 'fighter',
            in: 'body',
            schema: {
              $ref: '#/createUpdateDef/CreateUpdateFighter',
            },
          },
        ],
        responses: {
          200: {
            description: 'Returns a fighter and its partially overwritten values',
            schema: {
              $ref: '#/definitions/Fighter',
            },
          },
        },
      },
    },
  },
  definitions: {
    Fighter: {
      required: ['name', 'age'],
      properties: {
        id: {
          type: 'integer',
          format: 'int32',
          uniqueItems: true,
          readOnly: true,
        },
        name: {
          type: 'string',
          maxLength: 255,
        },
        age: {
          type: 'string',
          maxLength: 255,
        },
        height: {
          type: 'string',
          maxLength: 255,
        },
        nickname: {
          type: 'string',
          maxLength: 255,
        },
        ufcRecord: {
          type: 'string',
          maxLength: 255,
        },
        mmaRecord: {
          type: 'string',
          maxLength: 255,
        },
      },
    },
  },
  createUpdateDef: {
    CreateUpdateFighter: {
      required: ['name', 'age'],
      properties: {
        id: {
          type: 'integer',
          format: 'int32',
          uniqueItems: true,
          readOnly: true,
        },
        name: {
          type: 'string',
          maxLength: 255,
        },
        age: {
          type: 'string',
          maxLength: 255,
        },
        height: {
          type: 'string',
          maxLength: 255,
        },
        nickname: {
          type: 'string',
          maxLength: 255,
        },
        ufcRecord: {
          type: 'string',
          maxLength: 255,
        },
        mmaRecord: {
          type: 'string',
          maxLength: 255,
        },
      },
    },
  },
};

export default swaggerDocument;
