import { GraphQLError } from 'graphql';

class BrokerError extends GraphQLError {
  constructor(message: string) {
    super(message, { extensions: { code: 'BROKER_NOT_REACHABLE' } });

    Object.defineProperty(this, 'name', {
      value: 'NotReachableBroker',
    });
  }
}

export default BrokerError;
