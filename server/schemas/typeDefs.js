const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    email: String!
    username: String!
    password: String!
    favorites: [Asset]
  }

  type Asset {
    _id: ID!
    name: String!
    permalink: String!
    image_link: String!
  }

  type Query {
    me: User
    assets: [Asset]!
  }

  type Mutation {
    login(email: String): User
  }
`;

module.exports = typeDefs;
