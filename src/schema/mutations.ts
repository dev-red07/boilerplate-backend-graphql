import UserMutationFields from './user/mutations';
import AuthenticationMutationFields from './user/auth/mutations';


const mutationFields = {
  ...UserMutationFields,
  ...AuthenticationMutationFields,
};

export default mutationFields;
