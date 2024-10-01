const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'API documentation for the online-bookstore API',
    },
    components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'Authorization',
          description:
            'Enter your bearer token in the format **Bearer &lt;token&gt;**',
        },
      },
      schemas: {
        Book: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'The unique identifier for the book',
            },
            title: {
              type: 'string',
              description: 'The title of the book',
            },
            isbn: {
              type: 'string',
              description: 'The ISBN of the book',
            },
            author: {
              type: 'string',
              description: 'The authorId of the book',
            },
            category: {
              type: 'string',
              description: 'The categoryId of the book',
            },
            reviews: {
              type: 'array',
              items: {
                type: 'string',
                description: 'List reviewId of the book',
              },
            },
          },
        },
        Author: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'The unique identifier for the author',
            },
            name: {
              type: 'string',
              description: 'The name of the author',
            },
            birthDate: {
              type: 'string',
              format: 'date',
              description: 'The birth date of the author',
            },
            nationality: {
              type: 'string',
              description: 'The nationality of the author',
            },
          },
        },
        Category: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'The unique identifier for the category',
            },
            name: {
              type: 'string',
              description: 'The name of the category',
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.js'],
};

const specs = swaggerJsdoc(options);
module.exports = specs;
