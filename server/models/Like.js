var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var likeSchema = new Schema({
	post: {
		type: Schema.Types.ObjectId,
		ref: 'Post',
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	count: 0,
}, {timestamps: true})

var Like = mongoose.model('Like', likeSchema);

module.exports = Like;