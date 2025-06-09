import { AccountsListType } from '..';
import { getUserAccounts } from '../services';

const GetUserAccounts = {
  type: AccountsListType,
  resolve: async (_root, {}, { user }) => {
    // console.log('query called', sessionId);
    return await getUserAccounts(user.id);
  },
};

export default GetUserAccounts;
