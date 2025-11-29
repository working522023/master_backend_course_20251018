import { authResolvers, userResolvers } from "../modules";


export const rootResolver = {
  Query: {
    ...userResolvers.Query,
  },
  Mutation: {
    ...authResolvers.Mutation,
    ...userResolvers.Mutation,
  },
};