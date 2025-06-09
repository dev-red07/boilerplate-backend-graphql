import { GraphQLError } from 'graphql';

class InvalidAction extends GraphQLError {
  constructor(message: string) {
    super(message, { extensions: { code: 'Invalid Actionð' } });

    Object.defineProperty(this, 'name', {
      value: 'InvalidAction',
    });
  }
}

export default InvalidAction;
