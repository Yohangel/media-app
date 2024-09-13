import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Scalable Media App',
      version: '1.0.0',
      description: 'API para gestionar contenido multimedia accesible según los tipos de usuarios'
    },
    servers: [
      {
        url: 'http://localhost:5002/api',
        description: 'API server'
      }
    ]
  },
  apis: ['./src/routes/*.ts'], 
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
