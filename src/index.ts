import express, { RequestHandler } from 'express';
import * as bodyParser from 'body-parser';
import { applyMiddleware } from 'graphql-middleware';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { ApolloServer } from 'apollo-server-express';
import corsMiddleware from './api/middlewares/corsMW';
import errorHandler from './api/middlewares/errorMW';
import connectDB from './database/connect';
import typeDefs from './api/graphql/typeDef';
import resolvers from './api/graphql/resolvers';
import verifyTokenMW from './api/middlewares/graphqlMW';

const port = process.env.PORT || 5070;

async function strtGraphQL() {
  const server = express();

  server.use(corsMiddleware);
  server.use(bodyParser.json() as RequestHandler);
  server.use(bodyParser.urlencoded({ extended: false }) as RequestHandler);

  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const schemaWithMiddleware = applyMiddleware(schema, verifyTokenMW);

  const apolloServer = new ApolloServer({
    schema: schemaWithMiddleware,
    context: ({ req, res }: any) => ({ req, res }),
  });

  await connectDB();
  server.use(errorHandler);
  await apolloServer.start();

  apolloServer.applyMiddleware({ app: server });

  server.listen(port, () => {
    console.log(`App runing at ${port}`);
  });
}

strtGraphQL();
