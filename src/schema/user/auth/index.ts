import { GraphQLBoolean, GraphQLInt, GraphQLObjectType, GraphQLString } from 'graphql';

import { UserType } from 'schema/user';

const AuthoriseUserType = new GraphQLObjectType({
  name: 'AuthorizeUserType',
  fields: () => ({
    id: {
      type: GraphQLString,
      resolve: auth => auth.id,
    },
    userName: {
      type: GraphQLString,
      resolve: auth => auth.userName,
    },
    email: {
      type: GraphQLString,
      resolve: auth => auth.email,
    },
    role: {
      type: GraphQLInt,
      resolve: auth => auth.role,
    },
    status: {
      type: GraphQLInt,
      resolve: auth => auth.status,
    },
  }),
});

const AuthPayloadType = new GraphQLObjectType({
  name: 'AuthPayloadType',
  fields: () => ({
    accessToken: {
      type: GraphQLString,
      resolve: auth => auth.accessToken,
    },
    refreshToken: {
      type: GraphQLString,
      resolve: auth => auth.refreshToken,
    },
    tokenExpiresAt: {
      type: GraphQLString,
      resolve: auth => auth.tokenExpiresAt,
    },
    user: {
      type: UserType,
      resolve: auth => auth.user,
    },
    isNewUser: {
      type: GraphQLBoolean,
      resolve: auth => auth.isNewUser,
    },
  }),
});

export { AuthPayloadType, AuthoriseUserType };
