var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// TODO: maybe change the name from 'teammate' to 'invites'

var memberSchema = new Schema({
	teammateEmail: {
		type: String,
		unique: true,
	},
	isVerified: { 
		type: Boolean, 
		default: false,
	},
	refCode: {
		type: String,
		unique: true,
	},
	org: [{
		type: Schema.Types.ObjectId,
		ref: 'Org',
	}]
})

var Member = mongoose.model('Member', memberSchema);

module.exports = Member;