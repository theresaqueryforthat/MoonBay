const {
  Asset
} = require('../models');

module.exports = {
  // create a new asset entry in the database
  // with association to the currently logged-in user
  // so that it can be retrieved later via getAssetByUserId
  createAsset: async (req, res) => {
    const userId = req.session.user.id;
    const {
      username,
      password
    } = req.body;
    if (!userId || !username || !password) {
      return res.status(400).json({
        error: 'You must provide the userId, username, and password for a new Asset entry'
      });
    }
    try {
      const asset = await Asset.create({
        userId,
        username,
        password
      });
      res.json(asset);
    } catch (e) {
      res.json(e);
    }
  },
  getAssetByUserId: async (req, res) => {
    req.session.save(() => {
      if (req.session.visitCount) {
        req.session.visitCount++;
      } else {
        req.session.visitCount = 1;
      }
    });
    try {
      const usersAssets = await Asset.findAll({
        where: {
          userId: req.params.userId
        }
      });

      const Asset = usersAssets.map(user => user.get({
        plain: true
      }));

      res.json(Asset);
    } catch (e) {
      res.json(e);
    }
  },
  getAllAssets: async (req, res) => {
    if (!req.session.loggedIn) {
      console.log('user not logged in! redirecting...')
      return res.redirect('/login');
    }
    try {
      const userAssets = await Asset.findAll({
        where: {
          userId: req.session.user.id,
        }
      });
      res.render('saved', {
        layout: 'loggedIn',
        userAsset: userAssets.map(userAsset => userAsset.get({
          plain: true
        })),
        user: req.session.user,
      });
    } catch (e) {
      res.json(e);
    }
  },
}
