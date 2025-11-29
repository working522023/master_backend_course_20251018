import { GraphQLContext } from '../../common';
import { AuthService } from './auth.service';

const authService = new AuthService();

export const authResolvers = {
  Mutation: {
    register: async (_parent: any, { input }: { input: any }, context: GraphQLContext) => {
      return authService.register(input);
    },
    login: async (_parent: any, { input }: { input: any }, context: GraphQLContext) => {
      return authService.login(input);
    },
  },
}