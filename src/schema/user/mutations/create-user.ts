import { GraphQLNonNull, GraphQLString } from 'graphql';
import { UserType } from '..';


const CreateUser = {
  type: UserType,
  args: {
    firstName: { type: new GraphQLNonNull(GraphQLString) },
    lastName: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: () => 'shrikanth',
};



export default CreateUser;
