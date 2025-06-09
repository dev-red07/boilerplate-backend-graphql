import { GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import getIndianDateObject from 'utils/misc';
import UserStatusEnumType from './enums/user-status';
import UserRoleEnumType from './enums/user-role';

const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: user => user.id,
    },

    email: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: user => user.email,
    },
    status: {
      type: new GraphQLNonNull(UserStatusEnumType),
      resolve: user => user.status,
    },
    role: {
      type: new GraphQLNonNull(UserRoleEnumType),
      resolve: user => user.role,
    },
    createdAt: {
      type: GraphQLString,
      resolve: user => getIndianDateObject(user.createdAt),
    },
    updatedAt: {
      type: GraphQLString,
      resolve: user => getIndianDateObject(user.updatedAt),
    },
  }),
});

export { UserType };
