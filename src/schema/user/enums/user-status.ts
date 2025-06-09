import { GraphQLEnumType } from 'graphql';

const UserStatusEnumType = new GraphQLEnumType({
  name: 'UserStatusEnumType',
  values: {
    INACTIVE: { value: 0 },
    ACTIVE: { value: 1 },
    UNPAID: { value: 2 },
  },
});

export default UserStatusEnumType;