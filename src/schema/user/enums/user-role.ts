import { GraphQLEnumType } from 'graphql';

const UserRoleEnumType = new GraphQLEnumType({
  name: 'UserRoleEnumType',
  values: {
    SUPER_ADMIN: { value: 'SUPER_ADMIN' },
    ORGANIZATION_ADMIN: { value: 'ORGANIZATION_ADMIN' },
    PROPERTY_MANAGER: { value: 'PROPERTY_MANAGER' },
    PROPERTY_HOST: { value: 'PROPERTY_HOST' },
    PROPERTY_BILL_DESK: { value: 'PROPERTY_BILL_DESK' },
    PROPERTY_KITCHEN_STAFF: { value: 'PROPERTY_KITCHEN_STAFF' },
  },
});

export default UserRoleEnumType;
