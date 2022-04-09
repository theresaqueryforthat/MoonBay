const { User, Asset } = require('../models');

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
    createAssets: async (parent, args) => {
      const asset = await Asset.create(args);
      return asset;
    },
  },
};

module.exports = resolvers;
