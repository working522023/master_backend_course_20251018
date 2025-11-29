import http from 'http';
import express, { Application, json } from 'express';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

import {initializeRoutes} from './routes';
import { errorHandlerMiddleware, loggerMiddleware, requestIdMiddleware, setupSwagger } from './core';
import { createContext, schema } from './graphql';
import { rootResolver } from './graphql/resolvers';

const app: Application = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

app.use(requestIdMiddleware());
app.use(loggerMiddleware);


initializeRoutes(app);
setupSwagger(app);

// GraphQL
const startApolloServer = async (): Promise<http.Server> => {
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs: schema,
    resolvers: rootResolver,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use(
    '/graphql',
    json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => createContext(req, res),
    }),
  );

  return httpServer;
};
  


// 4) Error handler
app.use(errorHandlerMiddleware);

export { app,  startApolloServer };
