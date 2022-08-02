global.__basedir = __dirname;
import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import morganMiddleware from './middleware/morganMiddleware';
import http from 'http';
import logger from './utils/logger';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from './resolvers/hello';

declare global {
  var __basedir: string;
}

const main = async () => {
  const app = express();

  //Set
  app.set('PORT', '1000');
  app.set('trust proxy', 1);

  //Middleware
  app.use(cors());
  app.use(morganMiddleware);

  //Graphl server
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver],
      validate: false
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
