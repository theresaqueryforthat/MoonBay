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
    user(username: String!): User
    assets: [Asset]!
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    createAssets: [Asset]!
  }
`;

module.exports = typeDefs;
