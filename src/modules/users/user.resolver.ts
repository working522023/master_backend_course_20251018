import { GraphQLContext } from '../../common';
import { UserService } from './user.service';

const userService = new UserService();

export const userResolvers = {
  Query: {
    users: async (_parent: any, args: any, context: GraphQLContext) => {
      return userService.findAll(args.page, args.limit, args.search, args.sortBy, args.sortOrder);
    },
    user: async (_parent: any, { id }: { id: string }, context: GraphQLContext) => {
      return userService.findOne(id);
    },
  },
  Mutation: {
    createUser: async (_parent: any, { input }: any, context: GraphQLContext) => {
      return userService.create(input);
    },
    updateUser: async (_parent: any, { id, input }: any, context: GraphQLContext) => {
      return userService.update(id, input);
    },
    deleteUser: async (_parent: any, { id }: any, context: GraphQLContext) => {
      return userService.delete(id);
    },
  },
};