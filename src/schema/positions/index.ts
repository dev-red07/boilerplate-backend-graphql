import { GraphQLFloat, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';

const PositionListType = new GraphQLObjectType({
  name: 'PositionListType',
  fields: () => ({
    nodes: {
      type: new GraphQLList(new GraphQLNonNull(PositionType)),
      resolve: obj => obj.data,
    },
  }),
});

const PositionType = new GraphQLObjectType({
  name: 'PositionType',
  fields: () => ({
    tradingsymbol: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: position => position.tradingsymbol,
    },
    exchange: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: position => position.exchange,
    },
    instrumentToken: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: position => position.instrument_token,
    },
    product: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: position => position.product,
    },
    quantity: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: position => position.quantity,
    },
    overnightQuantity: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: position => position.overnight_quantity,
    },
    multiplier: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: position => position.multiplier,
    },
    averagePrice: {
      type: new GraphQLNonNull(GraphQLFloat),
      resolve: position => position.average_price,
    },
    closePrice: {
      type: new GraphQLNonNull(GraphQLFloat),
      resolve: position => position.close_price,
    },
    lastPrice: {
      type: new GraphQLNonNull(GraphQLFloat),
      resolve: position => position.last_price,
    },
    value: {
      type: new GraphQLNonNull(GraphQLFloat),
      resolve: position => position.value,
    },
    pnl: {
      type: new GraphQLNonNull(GraphQLFloat),
      resolve: position => position.pnl,
    },
    m2m: {
      type: new GraphQLNonNull(GraphQLFloat),
      resolve: position => position.m2m,
    },
    unrealised: {
      type: new GraphQLNonNull(GraphQLFloat),
      resolve: position => position.unrealised,
    },
    realised: {
      type: new GraphQLNonNull(GraphQLFloat),
      resolve: position => position.realised,
    },
    buyQuantity: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: position => position.buy_quantity,
    },
    buyPrice: {
      type: new GraphQLNonNull(GraphQLFloat),
      resolve: position => position.buy_price,
    },
    buyValue: {
      type: new GraphQLNonNull(GraphQLFloat),
      resolve: position => position.buy_value,
    },
    buyM2m: {
      type: new GraphQLNonNull(GraphQLFloat),
      resolve: position => position.buy_m2m,
    },
    sellQuantity: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: position => position.sell_quantity,
    },
    sellPrice: {
      type: new GraphQLNonNull(GraphQLFloat),
      resolve: position => position.sell_price,
    },
    sellValue: {
      type: new GraphQLNonNull(GraphQLFloat),
      resolve: position => position.sell_value,
    },
    sellM2m: {
      type: new GraphQLNonNull(GraphQLFloat),
      resolve: position => position.sell_m2m,
    },
    dayBuyQuantity: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: position => position.day_buy_quantity,
    },
    dayBuyPrice: {
      type: new GraphQLNonNull(GraphQLFloat),
      resolve: position => position.day_buy_price,
    },
    dayBuyValue: {
      type: new GraphQLNonNull(GraphQLFloat),
      resolve: position => position.day_buy_value,
    },
    daySellQuantity: {
      type: new GraphQLNonNull(GraphQLFloat),
      resolve: position => position.day_sell_quantity,
    },
    daySellPrice: {
      type: new GraphQLNonNull(GraphQLFloat),
      resolve: position => position.day_sell_price,
    },
    daySellValue: {
      type: new GraphQLNonNull(GraphQLFloat),
      resolve: position => position.day_sell_value,
    },
  }),
});

export { PositionType, PositionListType };
