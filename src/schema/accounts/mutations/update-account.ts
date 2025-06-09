import { GraphQLBoolean, GraphQLNonNull, GraphQLString } from 'graphql';
import { createAccount, toggleAccountStatus, updateAccountRequestToken, updateTradingAccount } from '../services';
import { AccountBrokerEnumType, AccountEnumType, AccountStatusEnumType } from '..';

const ToggleAccountStatus = {
  type: GraphQLBoolean,
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    status: { type: new GraphQLNonNull(AccountStatusEnumType) },
  },
  resolve: async (_root, { id, status }) => {
    return await toggleAccountStatus(id, status);
  },
};

const UpdateAccessToken = {
  type: GraphQLBoolean,
  args: {
    apiKey: { type: new GraphQLNonNull(GraphQLString) },
    requestToken: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (_root, { apiKey, requestToken }) => {
    return await updateAccountRequestToken({ apiKey, requestToken });
  },
};

const CreateAccount = {
  type: GraphQLBoolean,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    apiKey: { type: new GraphQLNonNull(GraphQLString) },
    apiSecret: { type: new GraphQLNonNull(GraphQLString) },
    multiplier: { type: new GraphQLNonNull(GraphQLString) },
    type: { type: new GraphQLNonNull(AccountEnumType) },
    status: { type: new GraphQLNonNull(AccountStatusEnumType) },
    broker: { type: new GraphQLNonNull(AccountBrokerEnumType) },
  },
  resolve: async (_root, { name, apiKey, apiSecret, multiplier, type, status, broker }, { user }) => {
    return await createAccount({ name, apiKey, apiSecret, multiplier, type, userId: user.id, status, broker });
  },
};

const UpdateAccount = {
  type: GraphQLBoolean,
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: GraphQLString },
    multiplier: { type: GraphQLString },
    type: { type: AccountEnumType },
    broker: { type: AccountBrokerEnumType },
  },
  resolve: async (_root, { id, name, multiplier, type, broker }, { user }) => {
    return await updateTradingAccount({ id, name, multiplier, type, userId: user.id, broker });
  },
};

export { ToggleAccountStatus, CreateAccount, UpdateAccessToken, UpdateAccount };
