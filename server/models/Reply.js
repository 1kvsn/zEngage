var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var replySchema = new Schema({
	comment: {
		type: Schema.Types.ObjectId,
		ref: 'Comment',
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	content: {
		type: String,
		maxLength: 180,
	},
	comments: [{
		type: Schema.Types.ObjectId,
		ref: 'Comment',
	}]
}, {timestamps: true})

var Reply = mongoose.model('Comment', replySchema);

module.exports = Reply;