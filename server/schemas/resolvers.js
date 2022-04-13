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
    assets: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Asset.find(params).sort({ createdAt: -1 });
    },
    asset: async (parent, { assetId }) => {
      return Asset.findOne({ _id: assetId });
    },
  },
  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user with this email found!');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }

      const token = signToken(user);
      return { token, user };
    },
    addFavorite: async (parent, name, permalink, image_url, assetUser, openSeaId) => {
      const asset = await Asset.create(name, permalink, image_url, assetUser, openSeaId);

      await User.findOneAndUpdate(
        { username: assetUser },
        { $addToSet: { favorites: asset._id } }
      );

      return asset;
    },
    removeFavorite: async (parent, { assetUser, openSeaId }) => {
      return Asset.findOneAndDelete({ assetUser: assetUser, openSeaId: openSeaId});
    }
  },
};

module.exports = resolvers;
