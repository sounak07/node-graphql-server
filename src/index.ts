import express, {
  Request, Response, RequestHandler,
} from 'express';
import * as bodyParser from 'body-parser';
import { ApolloServer } from 'apollo-server-express';
import api from './api/routes/v1/index';
import corsMiddleware from './api/middlewares/corsMW';
import errorHandler from './api/middlewares/errorMW';
import connectDB from './database/connect';
import typeDefs from './api/graphql/typeDef';
import resolvers from './api/graphql/resolvers';

const server = express();

server.use(corsMiddleware);
server.use(bodyParser.json() as RequestHandler);
server.use(bodyParser.urlencoded({ extended: false }) as RequestHandler);

server.get('/health', async (req: Request, res: Response) => {
  res.status(200).send({ serverStatus: 'UP' });
});

connectDB();

server.use('/v1', api);
server.use(errorHandler);

const port = 5070 || process.env.PORT;

async function strtGraphQL() {
  const apolloServer = new ApolloServer({ typeDefs, resolvers });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app: server });
}

strtGraphQL();

// eslint-disable-next-line no-console
const app = server.listen(port, () => {
  console.log(`App runing at ${port}`);
});

export default app;
