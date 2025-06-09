import { getPrismaInstance } from 'datasources/prisma';
import { getOrders } from 'schema/orders/services';
import InvalidAction from 'utils/errors/invalid-action';

const prisma = getPrismaInstance();

const getUserTradeStatus = async (id: string) => {
  const user = await prisma.user.findFirst({
    where: {
      id,
    },
  });

  return user.enableCopyTrade;
};

const getUserOrderDisplay = async (userId: string) => {
  const ux = await prisma.user_ux.findFirst({
    where: {
      userId,
    },
  });

  return ux.orderDisplay;
};

const getUserTheme = async (userId: string) => {
  console.log('fetching theme from ,', userId);
  const ux = await prisma.user_ux.findFirst({
    where: {
      userId,
    },
  });
  return ux.theme;
};

// const changeUserTradeStatus = async (id: string, status: boolean) => {
//   console.log(`change user status ${id} and ${status}`);
//   const user = await prisma.user.findFirst({
//     where: {
//       id,
//     },
//     select: {
//       user_account: true,
//       enableCopyTrade: true,
//     },
//   });

//   if (user.status === 0) throw new InvalidAction('User is not active. Please contact administrator');

//   const masterAccount = user.user_account.filter(acc => acc.role === 1 && acc.status === 1);

//   if (status && masterAccount && masterAccount.length > 0) {
//     try {
//       await getOrders(masterAccount[0].id);
//     } catch (err) {
//       throw new InvalidAction('Please Connect/verify your Master (primary) account first');
//     }

//     const allAccounts = user.user_account
//       .filter(acc => acc.status != 2)
//       .map(acc => {
//         return {
//           apiKey: acc.apiKey,
//           role: acc.role,
//           accessToken: acc.accessToken,
//           status: acc.status,
//           multiplier: acc.multiplier,
//         };
//       });

//     const body = {
//       isTradingEnabled: status,
//       accounts: allAccounts,
//     };

//     const rawBody = JSON.stringify(body);

//     //console.log('all accounts ', allAccounts);
//     //const rawBody = JSON.stringify(allAccounts);
//     const response = await fetch(`${COPS_URL}/createhistory`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: rawBody,
//     });
//     if (response.status === 200) {
//       await prisma.user.update({
//         where: {
//           id,
//         },
//         data: {
//           enableCopyTrade: status,
//         },
//       });
//       return true;
//     } else {
//       throw new InvalidAction('something went wrong');
//     }
//   } else {
//     const response = await fetch(`${COPS_URL}/deletehistory`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         apiKey: masterAccount[0].apiKey,
//       }),
//     });

//     if (response.status === 200) {
//       await prisma.user.update({
//         where: {
//           id,
//         },
//         data: {
//           enableCopyTrade: status,
//         },
//       });
//       return true;
//     } else {
//       throw new InvalidAction('something went wrong');
//     }
//   }
// };

export { getUserTradeStatus, getUserTheme, getUserOrderDisplay };
