import { GraphQLBoolean } from 'graphql';
import { exitAllPositions } from '../services';

const ExitAllPositions = {
  type: GraphQLBoolean,
  resolve: async (_root, {}, { user }) => {
    return await exitAllPositions(user.id);
  },
};

export { ExitAllPositions };
