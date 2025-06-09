import { getPrismaInstance } from 'datasources/prisma';
import { ZerodhaPositions } from 'interfaces/position';
import BrokerError from 'utils/errors/broker-error';

const prisma = getPrismaInstance();

const { COPS_URL } = process.env;

const exitAllPositions = async (userId: string) => {
  const masterAccount = await prisma.user_account.findMany({
    where: {
      userId,
      role: 1,
      status: 1,
    },
    select: {
      apiKey: true,
    },
  });

  if (masterAccount && masterAccount.length > 0) {
    const response = await fetch(`${COPS_URL}/exitall`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ apikey: masterAccount[0].apiKey }),
    });
    if (response.status === 200) {
      return true;
    }
    throw new BrokerError('Something went wrong!');
  }
  throw new BrokerError('Something went wrong!');
};

const getPositions = async (id: string) => {
  const accountRecord = await prisma.user_account.findFirst({
    where: {
      id,
    },
  });

  if (accountRecord) {
    const url = 'https://api.kite.trade/portfolio/positions';
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `token ${accountRecord.apiKey}:${accountRecord.accessToken}`,
      },
    });
    if (response.status == 200) {
      const positions: ZerodhaPositions = (await response.json()) as ZerodhaPositions;
      return {
        data: positions.data.net,
      };
    } else {
      throw new BrokerError('Broker Error');
    }
  }

  return {};
};

export { getPositions, exitAllPositions };
