const { Schema, model } = require('mongoose');

const assetSchema = new Schema({
  name: { type: String, required: true },
  permalink: { type: String, required: true },
  image_link: { type: String, required: true },
});

const Asset = model('Asset', assetSchema);

module.exports = Asset;
