// src/graphql/schema.ts
import { gql } from 'graphql-tag';

export const schema = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    role: String!
    status: String!
  }

  type PaginationMeta {
    total: Int!
    page: Int!
    limit: Int!
    totalPages: Int!
    hasNextPage: Boolean!
    hasPrevPage: Boolean!
  }

  type UserList {
    data: [User!]!
    meta: PaginationMeta!
  }

  type MessageResponse { message: String! }

  type Tokens { accessToken: String!, refreshToken: String! }
  type AuthPayload {
    token: String
  }

  input SignupInput { firstName: String!, lastName: String!, email: String!, password: String! }
  input LoginInput { email: String!, password: String! }
  input CreateUserInput { firstName: String!, lastName: String, email: String!, password: String!}
  input UpdateUserInput { firstName: String, lastName: String, status: String, role: String }

  type Query {
    # getProfile: User!
    users(page: Int, limit: Int, sortBy: String, sortOrder: String, search: String): UserList!
    user(id: ID!): User!
  }

  type Mutation {
    register(input: SignupInput!): User!
    login(input: LoginInput!): AuthPayload!
    createUser(input: CreateUserInput!): User!
    updateUser(id: ID!, input: UpdateUserInput!): User!
    deleteUser(id: ID!): MessageResponse!
  }
`;
