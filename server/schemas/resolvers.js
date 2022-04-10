const { User, Asset } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    user: async () => {
      return User.find({});
    },
    assets: async (parent, { _id }) => {
      const params = _id ? { _id } : {};
      return Asset.find(params);
    },
  },
  Mutation: {
    addProfile: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);

      return { token, user };
    },
    createAssets: async (parent, args) => {
      const asset = await Asset.create(args);
      return asset;
    },
  },
};

module.exports = resolvers;
