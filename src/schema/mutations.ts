import UserMutationFields from './user/mutations';
import AuthenticationMutationFields from './user/auth/mutations';
import AccountMutationFields from './accounts/mutations';
import PositionMutationFields from './positions/mutations';

const mutationFields = {
  ...UserMutationFields,
  ...AuthenticationMutationFields,
  ...AccountMutationFields,
  ...PositionMutationFields,
};

export default mutationFields;
