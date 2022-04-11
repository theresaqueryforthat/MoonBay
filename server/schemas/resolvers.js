const { AuthenticationError } = require('apollo-server-express');
const { User, Asset } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (parent, { userId }) => {
      return User.findOne({ _id: userId });
    },
    assets: async (parent, { _id }) => {
      const params = _id ? { _id } : {};
      return Asset.find(params);
    },
  },
  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, {
      email,
      password
    }) => {
      const user = await User.findOne({
        email
      });

      if (!user) {
        throw new AuthenticationError('No user with this email found!');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }

      const token = signToken(user);
      return {
        token,
        user
      };
    },
    createAssets: async (parent, args) => {
      const asset = await Asset.create(args);
      return asset;
    },
  },
};

module.exports = resolvers;
