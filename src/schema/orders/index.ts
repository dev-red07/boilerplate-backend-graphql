import {
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

const OrderListType = new GraphQLObjectType({
  name: 'OrdersListType',
  fields: () => ({
    nodes: {
      type: new GraphQLList(new GraphQLNonNull(OrderType)),
      resolve: obj => obj.data,
    },
  }),
});

const OrderType = new GraphQLObjectType({
  name: 'OrderType',
  fields: () => ({
    orderId: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: order => order.order_id,
    },
    accountId: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: order => order.account_id || '',
    },
    placedBy: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: order => order.placed_by || '',
    },
    exchangeOrderId: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: order => order.exchange_order_id || '',
    },
    status: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: order => order.status,
    },
    orderTimeStamp: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: order => order.order_timestamp,
    },
    exchangeUpdateTimeStamp: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: order => order.exchange_update_timestamp,
    },
    exchangeTimeStamp: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: order => order.exchange_timestamp,
    },
    variety: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: order => order.variety,
    },
    modified: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: order => order.modified || '',
    },
    exchange: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: order => order.exchange || '',
    },
    tradingsymbol: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: order => order.tradingsymbol,
    },
    instrumentToken: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: order => order.instrument_token,
    },
    orderType: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: order => order.order_type,
    },
    transactionType: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: order => order.transaction_type,
    },
    validity: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: order => order.validity,
    },
    validityTtl: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: order => order.validity_ttl,
    },
    product: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: order => order.product,
    },
    quantity: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: order => order.quantity,
    },
    disclosedQuantity: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: order => order.disclosed_quantity,
    },
    price: {
      type: new GraphQLNonNull(GraphQLFloat),
      resolve: order => order.price,
    },
    triggerPrice: {
      type: new GraphQLNonNull(GraphQLFloat),
      resolve: order => order.trigger_price,
    },
    averagePrice: {
      type: new GraphQLNonNull(GraphQLFloat),
      resolve: order => order.average_price,
    },
    filledQuantity: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: order => order.filled_quantity,
    },
    pendingQuantity: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: order => order.pending_quantity,
    },
    cancelledQuantity: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: order => order.cancelled_quantity,
    },
    marketProtection: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: order => order.market_protection,
    },
    guid: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: order => order.guid,
    },
    // createdAt: {
    //   type: GraphQLString,
    //   resolve: user => getIndianDateObject(user.createdAt),
    // },
    // updatedAt: {
    //   type: GraphQLString,
    //   resolve: user => getIndianDateObject(user.updatedAt),
    // },
  }),
});

export { OrderType, OrderListType };
