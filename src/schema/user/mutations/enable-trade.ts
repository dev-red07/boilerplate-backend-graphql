import { GraphQLBoolean, GraphQLNonNull } from 'graphql';

const ChangeUserTradeStatus = {
  type: GraphQLBoolean,
  args: {
    status: { type: new GraphQLNonNull(GraphQLBoolean) },
  },
  resolve: async (_root, { status }, { user }) => {
    //return await changeUserTradeStatus(user.id, status);
    return false;
  },
};

export { ChangeUserTradeStatus };
