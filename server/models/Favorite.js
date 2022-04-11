const { Schema, model } = require('mongoose');
const favoriteSchema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	}
});
const Favorite = model('Favorite', favoriteSchema);
module.exports = Favorite;
