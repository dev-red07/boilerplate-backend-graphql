import { nanoid } from 'nanoid';
import { getPrismaInstance } from 'datasources/prisma';

var KiteConnect = require("kiteconnect").KiteConnect

import InvalidAction from 'utils/errors/invalid-action';

const { COPS_URL } = process.env;

const prisma = getPrismaInstance();

const toggleAccountStatus = async (id: string, status: number) => {
  //todo get the master account of the account and pass the attribute and value.
  const masterAccount = await prisma.user_account.findFirst({
    where: {
      id,
    },
    include: {
      user: {
        include: {
          user_account: {
            where: {
              role: 1,
            },
          },
        },
      },
    },
  });
  //console.log('master account', masterAccount.user);

  try {
    const updatedAccount = await prisma.user_account.update({
      data: {
        status,
      },
      where: {
        id,
      },
    });

    const body = {
      masterAccountKey: masterAccount.user.user_account[0].apiKey,
      updateAccountKey: updatedAccount.apiKey,
      field: 'status',
      value: status,
    };
     await fetch(`${COPS_URL}/updateaccount`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    return true;
  } catch (err) {
    console.log('err', err);
    return false;
  }
};

const updateAccountRequestToken = async ({ apiKey, requestToken }: { apiKey: string; requestToken: string }) => {
  const accountRecord = await prisma.user_account.findFirst({
    where: {
      apiKey,
      status: 1,
    },
  });

  if (accountRecord) {
    //todo send an update to redis. after receiving an access token.
    // redis data structure.
    const kc = new KiteConnect({ api_key: apiKey });
    const response = await kc.generateSession(requestToken, accountRecord.apiSecret);
    try {
      await prisma.user_account.update({
        data: {
          requestToken,
          accessToken: response.access_token,
        },
        where: {
          id: accountRecord.id,
        },
      });
    } catch (err) {
      console.log(`error updaing userAccount ${err}`);
      return false;
    }
  }

  return true;
};

const updateTradingAccount = async ({
  id,
  name,
  multiplier,
  type,
  userId,
  broker,
}: {
  id;
  name: string;
  multiplier: string;
  type: number;
  userId: string;
  broker: number;
}) => {
  if (type == 1) {
    const masterAccounts = await prisma.user_account.count({
      where: {
        userId,
        status: {
          not: 2,
        },
        role: 1,
      },
    });

    if (masterAccounts === 1) throw new InvalidAction('Cannot add more than 1 Master account');
  }
  try {
    await prisma.user_account.update({
      where: {
        id,
      },
      data: {
        ...(name && { alias: name }),
        ...(multiplier && { multiplier: parseFloat(multiplier) }),
        ...(typeof type === 'number' && { role: type }),
        ...(broker && { broker }),
      },
    });
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        user_account: true,
        enableCopyTrade: true,
      },
    });

    const allAccounts = user.user_account
      .filter(acc => acc.status != 2)
      .map(acc => {
        return {
          apiKey: acc.apiKey,
          role: acc.role,
          accessToken: acc.accessToken,
          status: acc.status,
          multiplier: acc.multiplier,
        };
      });

    const body = {
      isTradingEnabled: user.enableCopyTrade,
      accounts: allAccounts,
    };

    const rawBody = JSON.stringify(body);
    // console.log('raw body', rawBody);
    await fetch(`${COPS_URL}/createhistory`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: rawBody,
    });
    return true;
  } catch (err) {
    console.log(err);
    throw new InvalidAction('Something went wrong');
  }
};

const createAccount = async ({
  name,
  apiKey,
  multiplier,
  type,
  apiSecret,
  userId,
  status,
  broker,
}: {
  name: string;
  apiKey: string;
  apiSecret: string;
  multiplier: string;
  type: number;
  userId: string;
  status: number;
  broker: number;
}) => {
  // throw new InvalidAction('Test err');

  //const testQueue = new Bull('testQueue', redisOptions);

  // testQueue.process((payload, done) => {
  //   console.log("preparing the process");
  //   setTimeout(() => {
  //     console.log("burger ready");
  //     done();
  //   },4000)
  // })

  // testQueue.add({
  //   name: 'shrikanth',
  //   orderID: 1234,
  //   list: ['abc', 'pqr'],
  // });

  if (type == 1) {
    const masterAccounts = await prisma.user_account.count({
      where: {
        userId,
        status: {
          not: 2,
        },
        role: 1,
      },
    });

    if (masterAccounts === 1) throw new InvalidAction('Cannot add more than 1 Master account');
  }

  const tradingAccounts = await prisma.user_account.count({
    where: {
      userId,
      status: {
        not: 2,
      },
    },
  });

  if (tradingAccounts >= 4) throw new InvalidAction('More than 4 accounts not allowed at this time!');

  try {
    await prisma.user_account.create({
      data: {
        id: nanoid(),
        alias: name,
        userId,
        apiKey,
        apiSecret,
        multiplier: parseFloat(multiplier),
        role: type,
        status,
        broker,
      },
    });
    return true;
  } catch (err) {
    console.log('err', err);
    return false;
  }
};

const getUserAccounts = async (userId: string) => {
  try {
    return await prisma.user_account.findMany({
      where: {
        userId,
        status: {
          not: 2,
        },
      },
      orderBy: {
        createdAt: 'asc', // Order by createdAt in ascending order
      },
    });
    // console.log(data);
  } catch (err) {
    console.log('err', err);
  }

  //console.log('fetching user accounts for user', userId);
};

export { toggleAccountStatus, createAccount, getUserAccounts, updateAccountRequestToken, updateTradingAccount };
