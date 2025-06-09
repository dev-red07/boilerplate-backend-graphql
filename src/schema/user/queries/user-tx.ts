import { getUserOrderDisplay, getUserTheme } from '../services';
import { OrderDisplayEnum, UserThemeEnum } from '../enums/user-ux';

const GetUserTheme = {
  type: UserThemeEnum,

  resolve: async (_root, {}, { user }) => {
    // console.log('query called', sessionId);
    return await getUserTheme(user.id);
  },
};

const UserOrderDisplay = {
  type: OrderDisplayEnum,
  resolve: async (_root, {}, { user }) => {
    // console.log('query called', sessionId);
    return await getUserOrderDisplay(user.id);
  },
};

export { GetUserTheme, UserOrderDisplay };
