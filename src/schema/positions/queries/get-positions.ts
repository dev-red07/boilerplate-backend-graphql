import { GraphQLNonNull, GraphQLString } from 'graphql';
import { PositionListType } from '..';
import { getPositions } from '../services';

const GetPositions = {
  type: PositionListType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (_root, { id }) => {
    // console.log('query called', sessionId);
    return await getPositions(id);
  },
};

export default GetPositions;
