import AccountQueries from './accounts/queries';
import OrderQueryFields from './orders/queries';
import PositionQueryFields from './positions/queries';
import UserQueryFields from './user/queries';

const queries = {
  ...OrderQueryFields,
  ...AccountQueries,
  ...UserQueryFields,
  ...PositionQueryFields,
};

export default queries;
