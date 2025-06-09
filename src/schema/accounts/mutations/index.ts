import { CreateAccount, ToggleAccountStatus, UpdateAccessToken, UpdateAccount } from './update-account';

const AccountMutationFields = {
  createAccount: CreateAccount,
  toogleAccountStatus: ToggleAccountStatus,
  updateAccessToken: UpdateAccessToken,
  updateAccount : UpdateAccount,
};

export default AccountMutationFields;
