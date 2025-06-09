import { GraphQLBoolean } from 'graphql';
import { getUserTradeStatus } from '../services';

const GetUserTradeStatus = {
  type: GraphQLBoolean,

  resolve: async (_root, {}, { user }) => {
    // console.log('query called', sessionId);
    return await getUserTradeStatus(user.id);
  },
};

export default GetUserTradeStatus;
