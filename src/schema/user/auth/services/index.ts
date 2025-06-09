import { JsonWebTokenError, JwtPayload, sign, TokenExpiredError, verify } from 'jsonwebtoken';
import { nanoid } from 'nanoid';
import crypto from 'crypto';
import argon2 from 'argon2';
import { getPrismaInstance } from 'datasources/prisma';
import { user, UserRole } from '@prisma/client';
import AuthenticationError from 'utils/errors/authentication-error';

const prisma = getPrismaInstance();

const APP_SECRET = process.env.APP_SECRET || '';

const isUserExist = async (email): Promise<Boolean> => {
  const user = await prisma.user.findFirst({
    where: { email },
  });
  return user ? true : false;
};

const signUp = async (
  userName: string,
  email: string,
  accessToken: string,
  refreshToken?: string,
  tokenExpiresAt?: string,
  image?: string
) => {
  const userId = nanoid();

  const user = await prisma.user.create({
    data: { email, userName, id: userId, accessToken, refreshToken, tokenExpiresAt, image },
  });

  //create google ux.

  // await prisma.user_ux.create({
  //   data: {
  //     id: nanoid(),
  //     userId: user.id,
  //   },
  // });

  const token = sign({ userId: user.id }, APP_SECRET, {
    expiresIn: '30d',
  });
  return {
    token,
    user,
    isNewUser: true,
  };
};

const googleLogin = async (email: string, accessToken: string, refreshToken?: string, tokenExpiresAt?: string) => {
  const user = await prisma.user.findFirst({
    where: { email },
  });
  if (!user) {
    throw new Error('No such user found');
  }

  if (accessToken) {
    //Update access token
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        accessToken,
        refreshToken,
        tokenExpiresAt,
      },
    });
  }

  const token = generateLoginToken(user);
  return {
    token,
    user,
    isNewUser: false,
  };
};

const hashPassword = async (password: string): Promise<string> => {
  try {
    const hash = await argon2.hash(password, {
      type: argon2.argon2id,
      memoryCost: 2 ** 16, // 64 MB of memory usage
      timeCost: 3, // Iterations (number of passes)
      parallelism: 1, // Number of threads (set based on your system's capacity)
    });
    return hash;
  } catch (err) {
    console.error('Error hashing password:', err);
    throw new Error('Could not hash password');
  }
};

const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });
  if (user && (await verifyPassword(password, user.password))) {
    const { accessToken, refreshToken, tokenExpiresAt } = generateTokens(user);
    await prisma.user.update({
      where: { id: user.id },
      data: { accessToken, refreshToken, tokenExpiresAt },
    });
    return {
      user: {
        id: user.id,
        userName: user.email,
        email: user.email,
        role: user.role,
        status: 1,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      isNewUser: false,
      accessToken,
      refreshToken,
      tokenExpiresAt,
    };
  }

  throw Error('Invalid credentials');
};

const signUpUser = async (email, password) => {
  const userId = nanoid();
  const hashedPassword = await hashPassword(password);
  const user = {
    id: userId,
    email,
    password: await hashPassword(password),
    role: UserRole.SUPER_ADMIN,
    phoneNumber: '+918087080121',
    status: 1,
  };

  // console.log('verifying password');
  // console.log('', await verifyPassword("Password", hashedPassword));

  return await prisma.user.create({ data: user });
};

const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  try {
    // Verify the password against the hashed password
    return await argon2.verify(hashedPassword, password);
  } catch (err) {
    console.error('Error verifying password:', err);
    return false;
  }
};

//@ts-ignore
const login = async (email, password) => {
  //throw new AuthenticationError('Email Login not supported');

  const user = {
    id: email,
    userName: password,
    email: 'reddyshrikanth22@gmail.com',
    role: 1,
    status: 1,
  };
  return user;
};

const generateTokens = user => {
  const accessToken = generateLoginToken(user);
  const refreshToken = crypto.randomBytes(32).toString('hex');
  const tokenExpiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString();
  return { accessToken, refreshToken, tokenExpiresAt };
};

const generateLoginToken = user => {
  return sign({ userId: user.id }, APP_SECRET, {
    expiresIn: '30d',
  });
};

const authenticateUser = async (request): Promise<user | null> => {
  if (request?.headers?.authorization) {
    const [type, token] = request.headers.authorization.split(' ');
    if (type === 'Bearer') {
      try {
        const tokenPayload = verify(token, APP_SECRET) as JwtPayload;
        const userId = tokenPayload.userId;
        return await prisma.user.findUnique({ where: { id: userId } });
      } catch (error) {
        if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError) {
          throw new AuthenticationError('User is not authenticated. Session token is Invalid');
        } else {
          throw new AuthenticationError('User is not authenticated. Session token verification faild');
        }
      }
    }
  }
  // else if (operationName === 'GoogleSignUpOrLogin' || query.includes('IntrospectionQuery')) return null;
  // throw new AuthenticationError('User is not authenticated. Session token verification faild');
  return null;
};

export { isUserExist, login, signUp, googleLogin, authenticateUser, signUpUser, loginUser };
