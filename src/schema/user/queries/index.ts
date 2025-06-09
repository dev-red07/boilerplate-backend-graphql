import GetUserTradeStatus from './trade-status';
import { GetUserTheme, UserOrderDisplay } from './user-tx';

const UserQueryFields = {
  getUserTradeStatus: GetUserTradeStatus,
  getUserTheme: GetUserTheme,
  getUserOrderDisplay: UserOrderDisplay,
};

export default UserQueryFields;
