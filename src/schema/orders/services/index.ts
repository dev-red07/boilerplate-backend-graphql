import { getPrismaInstance } from 'datasources/prisma';
import { ZerodhaOrders } from 'interfaces/order';
import BrokerError from 'utils/errors/broker-error';
const prisma = getPrismaInstance();

// const fetchOrdersFromZerodha = async (sessionId: string) => {
 
//   return {};
// };

const getOrders = async (id: string) => {
  const accountRecord = await prisma.user_account.findFirst({
    where: {
      id,
    },
  });

  if (accountRecord) {
    const url = 'https://api.kite.trade/orders';
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `token ${accountRecord.apiKey}:${accountRecord.accessToken}`,
      },
    });
    if (response.status == 200) {
      //store latest received data in the database.
      const orders: ZerodhaOrders = (await response.json()) as ZerodhaOrders;
      const sortedData = orders.data.sort((a, b) => {
        return new Date(b.order_timestamp).getTime() - new Date(a.order_timestamp).getTime();
      });
     // console.log("data", sortedData);
      return {
        status: orders.status,
        data: sortedData,
      };
    } else {
      throw new BrokerError('Broker Error');
    }
  }
  return {};
};

const getTestOrders = async (id: string) => {
  throw new BrokerError('Broker Error');
  const accountRecord = await prisma.user_account.findFirst({
    where: {
      id,
    },
  });

  if (accountRecord) {
    const url = 'https://api.kite.trade/orders';
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `token ${accountRecord.apiKey}:${accountRecord.accessToken}`,
      },
    });
    if (response.status == 200) {
      //store latest received data in the database.
      const orders: ZerodhaOrders = (await response.json()) as ZerodhaOrders;
      const sortedData = orders.data.sort((a, b) => {
        return new Date(b.order_timestamp).getTime() - new Date(a.order_timestamp).getTime();
      });
      return {
        status: orders.status,
        data: sortedData,
      };
    } else {
      throw new BrokerError('Broker Error');
    }
  }
  return {};
};

export { getOrders, getTestOrders };
