var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
	post: {
		type: Schema.Types.ObjectId,
		ref: 'Post',
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	comment: {
		type: String,
		maxLength: 180,
	}
}, {timestamps: true})

var Comment = mongoose.model('Comment', postSchema);

module.exports = Comment;