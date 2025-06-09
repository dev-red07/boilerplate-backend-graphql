import { GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';
import mutationFields from './mutations';
import queries from './queries';

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  //@ts-ignore
  fields: () => mutationFields,
});

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    ...queries,
    version: {
      type: new GraphQLNonNull(GraphQLString),
      // @ts-ignore
      // Figure out this warning
      resolve: (_root, _args, { dataSources }) => '2.9',
    },
    appVersions: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: async (_root, _args) => {
        return '1.0.0';
      },
    },
    me: {
      type: new GraphQLNonNull(GraphQLString),
      args: {},
      resolve: async (_root, {}, { user }) => {
        if (user === null) {
          throw new Error('Unauthenticated!');
        }
        return 'hi';
      },
    },
  }),
});

const schema = new GraphQLSchema({ query: QueryType, mutation: MutationType });

export default schema;
