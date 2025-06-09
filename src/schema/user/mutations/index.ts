import CreateUser from './create-user';
import { ChangeUserTradeStatus } from './enable-trade';

const UserMutationFields = {
  createUser: CreateUser,
  changeUserTradeStatus: ChangeUserTradeStatus,
};

export default UserMutationFields;
