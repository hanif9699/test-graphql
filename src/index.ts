declare global {
  var __basedir: string;
}
global.__basedir = __dirname;
import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import http from 'http';
import logger from './utils/logger';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from './resolvers/hello';
import { PrismaClient } from '@prisma/client';
import app from './app';

const main = async () => {
  //Prisma client
  const prisma = new PrismaClient();

  //Graphl server
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver],
      validate: false
    }),
    context: ({ req, res }) => ({
      req,
      res,
      prisma
    })
  });

  //Start Apollo Server
  await apolloServer.start();

  //Apply middleware to apollo server
  apolloServer.applyMiddleware({
    app,
    cors: false
  });

  //Create http Server
  const httpServer = http.createServer(app);

  //Listen at port
  httpServer.listen(app.get('PORT'), () => {
    logger.debug(`Server Started at ${app.get('PORT')}`);
  });
};

main();
