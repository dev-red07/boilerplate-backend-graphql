import { GraphQLNonNull, GraphQLString } from 'graphql';

import { AuthenticationReturnTypes } from 'interfaces/user';

import { AuthoriseUserType, AuthPayloadType } from '..';
import { googleLogin, isUserExist, login, loginUser, signUp, signUpUser } from '../services';

const SignUpOrLogin = {
  type: AuthPayloadType,
  args: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (_root, { email, password }) => {
    // Check whether user exist or not ... If exists login or else signup
     //return login(email, password);
    //return signUpUser(email, password);
  },
};

const LoginUser = {
  type: AuthPayloadType,
  args: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (_root, { email, password }) => {
    return loginUser(email, password);
  },
};

const GoogleSignUpOrLogin = {
  type: AuthPayloadType,
  args: {
    userName: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    accessToken: { type: new GraphQLNonNull(GraphQLString) },
    refreshToken: { type: GraphQLString },
    tokenExpiresAt: { type: GraphQLString },
    image: { type: GraphQLString },
  },
  resolve: async (
    _root,
    { userName, email, accessToken, refreshToken, tokenExpiresAt, image }
  ): Promise<AuthenticationReturnTypes> => {
    if (await isUserExist(email)) {
      return googleLogin(email, accessToken, refreshToken, tokenExpiresAt);
    }
    return signUp(userName, email, accessToken, refreshToken, tokenExpiresAt, image);
  },
};

const AuthenticationMutationFields = {
  //signUpOrLogin: SignUpOrLogin,
  login: LoginUser,
  //googleSignUpOrLogin: GoogleSignUpOrLogin,
};

export default AuthenticationMutationFields;
