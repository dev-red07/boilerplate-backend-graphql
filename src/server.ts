import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { ApolloServerPluginLandingPageDisabled } from '@apollo/server/plugin/disabled';
import { createServer } from 'http';
import bodyParser, { json } from 'body-parser';
import cors from 'cors';
import { WebSocketServer } from 'ws';
import dotenv from 'dotenv';
import express from 'express';
import depthLimit from 'graphql-depth-limit';
import { applyMiddleware } from 'graphql-middleware';
import { ApolloServer } from '@apollo/server';
import schema from './schema';
import { customLogger } from 'utils/logger';
import { generateReferenceId } from 'utils/misc';
import { getPrismaInstance } from 'datasources/prisma';
import { authenticateUser } from 'schema/user/auth/services';

const prisma = getPrismaInstance();
dotenv.config();
const app = express();
const httpServer = createServer(app);
const { PORT, NODE_ENV } = process.env;

const startServer = async () => {
  const server = new ApolloServer({
    schema: applyMiddleware(schema),
    introspection: NODE_ENV !== 'PROD',
    plugins: [
      customLogger,
      process.env.NODE_ENV === 'PROD'
        ? ApolloServerPluginLandingPageDisabled()
        : ApolloServerPluginLandingPageLocalDefault({ embed: false }),
    ],
    validationRules: [depthLimit(5)],
  });

  await server.start();

  app.use(bodyParser.json());
  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        // console.log('middleware', req.headers);
        //const { operationName, query } = req.body;
        //console.log(`operation name ${operationName} and ${query} %% ${req.headers['user-agent']}`);
        const { authorization: sessionToken, 'auth-token': authToken } = req.headers;
        let user = await authenticateUser(req);
        return {
          sessionToken,
          authToken,
          user,
          prisma,
          requestId: generateReferenceId(4),
        };
      },
    })
  );
};

app.use(bodyParser.json());
app.use(require('express-status-monitor')());

process.on('uncaughtException', error => {
  console.error(error.stack);
});

startServer();

// const createCronJobs = () => {
//   const masterQueue = new Bull('UserQueue', redisOptions);
//   cron.schedule('*/2 * * * * *', async () => {
//     const users = await prisma.user.findMany({
//       where: {
//         enableCopyTrade: true,
//         user_account: {
//           some: {}, // Checks if at least one related user_account exists
//         },
//       },
//       select: {
//         id: true,
//         user_account: {
//           select: {
//             role: true,
//             apiKey: true,
//             multiplier: true,
//             accessToken: true,
//             status: true,
//             broker: true,
//           },
//         },
//       },
//     });

//     try {
//       const userJobs = users.map(user => ({
//         name: 'copyTradeJob', // Optional job name
//         data: {
//           id: user.id,
//           user_account: user.user_account, // Include the user_account data
//         },
//       }));
//       console.log('user jobs', userJobs);
//       await masterQueue.addBulk(userJobs);
//     } catch (err) {
//       console.log('err', err);
//     }

//     // await masterQueue.addBulk(users);
//     // users.map(user => {
//     //   masterQueue.add(user);
//     // });
//   });
// };

httpServer.listen({ port: PORT }, async () => {
  // createCronJobs();
  console.log(`Server running at http://localhost:${PORT}/graphql`);
});

// app.listen({ port: PORT }, async () => {
//   // if (NODE_ENV === 'PROD') {
//   //   await receiveMessage(CONTROL_EVENT_QUEUE_URL);
//   //   controlEventCron();
//   // }
//   console.log(`Server running on http://localhost:${PORT}`);
// });
