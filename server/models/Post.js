var mongoose  = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
	didToday: {
		type: String,
		maxlength: 180,
		required: true,
	},
	learnedToday: {
		type: String,
		maxlength: 180,
		required: true,
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	org: {
		type: Schema.Types.ObjectId,
		ref: 'Org',
	},
	tag: {
		type: String,
	},
	comments: [{
		type: Schema.Types.ObjectId,
		ref: 'Comment',
	}],
	// likes: [{
	// 	type: Schema.Types.ObjectId,
	// 	ref: 'User',
	// }]
	likes: {
		type: Number,
		default: 0,
	}
}, {timestamps: true})

var Post = mongoose.model('Post', postSchema);

module.exports = Post;