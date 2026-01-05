import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Postman Clone API',
      version: '1.0.0',
      description: 'Full API documentation matching MySQL schema for Postman Clone',
    },
    servers: [
      { url: 'http://localhost:5000/api', description: 'Local development server' },
    ],
    tags: [
      { name: 'Users', description: 'User registration and authentication' },
      { name: 'Workspaces', description: 'Manage workspaces' },
      { name: 'Collections', description: 'Manage API collections under workspaces' },
      { name: 'Requests', description: 'Send and store HTTP requests' },
      { name: 'Responses', description: 'View saved responses for requests' },
      { name: 'Environments', description: 'Manage environment variables' },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            name: { type: 'string', example: 'Rishabh' },
            email: { type: 'string', example: 'rishabh@example.com' },
            password: { type: 'string', example: 'hashed_password' },
            created_at: { type: 'string', format: 'date-time' },
          },
        },
        Workspace: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            name: { type: 'string', example: 'API Testing Workspace' },
            user_id: { type: 'integer', example: 1 },
            created_at: { type: 'string', format: 'date-time' },
          },
        },
        Collection: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            name: { type: 'string', example: 'Auth APIs' },
            workspace_id: { type: 'integer', example: 1 },
            created_at: { type: 'string', format: 'date-time' },
          },
        },
        Request: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            collection_id: { type: 'integer', example: 1 },
            method: { type: 'string', example: 'POST' },
            url: { type: 'string', example: 'https://api.example.com/login' },
            headers: { type: 'object', example: { "Content-Type": "application/json" } },
            body: { type: 'object', example: { "email": "test@example.com", "password": "123456" } },
            created_at: { type: 'string', format: 'date-time' },
          },
        },
        Response: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            request_id: { type: 'integer', example: 1 },
            status_code: { type: 'integer', example: 200 },
            body: { type: 'object', example: { "message": "Success" } },
            created_at: { type: 'string', format: 'date-time' },
          },
        },
        Environment: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            workspace_id: { type: 'integer', example: 1 },
            name: { type: 'string', example: 'Local Environment' },
            variables: {
              type: 'object',
              example: { baseUrl: 'http://localhost:5000', authToken: 'abc123' },
            },
            created_at: { type: 'string', format: 'date-time' },
          },
        },
      },
      responses: {
        UnauthorizedError: {
          description: 'JWT token missing or invalid',
          content: {
            'application/json': {
              example: { message: 'Access denied. No token provided.' },
            },
          },
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

export const swaggerDocs = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log('📘 Swagger Docs available at: http://localhost:5000/api-docs');
};
