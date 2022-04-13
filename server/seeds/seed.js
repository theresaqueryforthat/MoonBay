const db = require('../config/connection');
const { User, Asset } = require('../models');
const favoriteSeeds = require('./favoriteSeeds.json');

db.once('open', async () => {
  try {
    await Asset.deleteMany({});

    for (let i = 0; i < favoriteSeeds.length; i++) {
      const { _id, assetUser } = await Asset.create(favoriteSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: assetUser },
        {
          $addToSet: {
            favorites: 
              _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
