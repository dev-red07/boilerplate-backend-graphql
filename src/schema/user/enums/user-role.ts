import { GraphQLEnumType } from 'graphql';

const UserRoleEnumType = new GraphQLEnumType({
  name: 'UserRoleEnumType',
  values: {
    SUPER_ADMIN: { value: 'SUPER_ADMIN' },
    ORGANIZATION_ADMIN: { value: 'ORGANIZATION_ADMIN' },
  },
});

export default UserRoleEnumType;
