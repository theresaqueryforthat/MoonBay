const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    email: String
    username: String
    password: String
    favorites: [Asset]!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Asset {
    _id: ID!
    name: String!
    permalink: String!
    image_url: String!
  }

  type Query {
    users: [User]!
    user(userId: ID!): User
    assets: [Asset]!
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String): User
    createAssets: [Asset]!
  }
`;

module.exports = typeDefs;
