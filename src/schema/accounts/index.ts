import { GraphQLEnumType, GraphQLID, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import getIndianDateObject from 'utils/misc';

const AccountsListType = new GraphQLObjectType({
  name: 'AccountListType',
  fields: () => ({
    nodes: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(AccountType))),
      resolve: obj => obj,
    },
  }),
});

const AccountType = new GraphQLObjectType({
  name: 'AccountType',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: account => account.id,
    },
    userId: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: account => account.userId,
    },
    accountName: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: account => account.alias,
    },
    type: {
      type: new GraphQLNonNull(AccountEnumType),
      resolve: account => account.role,
    },
    apiKey: {
      type: GraphQLString,
      resolve: account => account.apiKey,
    },
    apiSecret: {
      type: GraphQLString,
      resolve: account => account.apiSecret,
    },
    multiplier: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: account => account.multiplier.toString(),
    },
    status: {
      type: new GraphQLNonNull(AccountStatusEnumType),
      resolve: account => account.status,
    },
    broker: {
      type: new GraphQLNonNull(AccountBrokerEnumType),
      resolve: account => account.broker,
    },
    createdAt: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: repository => getIndianDateObject(repository.createdAt),
    },
  }),
});

const AccountStatusEnumType = new GraphQLEnumType({
  name: 'AccountStatusEnumType',
  values: {
    ACTIVE: { value: 1 },
    INACTIVE: { value: 0 },
    DELETED: { value: 2 },
  },
});

const AccountBrokerEnumType = new GraphQLEnumType({
  name: 'AccountBrokerEnumType',
  values: {
    ZERODHA: { value: 1 },
  },
});

const AccountEnumType = new GraphQLEnumType({
  name: 'AccountEnumType',
  values: {
    MASTER: { value: 1 },
    CHILD: { value: 0 },
  },
});

export { AccountsListType, AccountType, AccountStatusEnumType, AccountEnumType, AccountBrokerEnumType };
