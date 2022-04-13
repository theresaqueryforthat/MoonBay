const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const assetSchema = new Schema({
  name: { type: String },
  permalink: { type: String },
  image_url: { type: String },
  assetUser: { type: String },
  createdAt: { type: Date, default: Date.now, get: (timestamp) => dateFormat(timestamp) },
  openSeaId: { type: String },
});

const Asset = model('Asset', assetSchema);

module.exports = Asset;
