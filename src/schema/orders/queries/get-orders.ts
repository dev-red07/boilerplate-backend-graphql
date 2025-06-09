import { GraphQLNonNull, GraphQLString } from 'graphql';
import { OrderListType } from '..';
import { getOrders } from '../services';

const GetOrders = {
  type: OrderListType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (_root, { id }) => {
    // console.log('query called', sessionId);
    return await getOrders(id);
  },
};

export default GetOrders;
