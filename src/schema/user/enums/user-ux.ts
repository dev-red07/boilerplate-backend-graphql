import { GraphQLEnumType } from 'graphql';

const OrderDisplayEnum = new GraphQLEnumType({
  name: 'OrderDisplayEnumType',
  values: {
    LIST: { value: 0 },
    GRID: { value: 1 },
  },
});

const UserThemeEnum = new GraphQLEnumType({
  name: 'UserThemeEnumType',
  values: {
    LIGHT: { value: 0 },
    DARK: { value: 1 },
  },
});

export { OrderDisplayEnum, UserThemeEnum };
