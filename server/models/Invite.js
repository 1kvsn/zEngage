var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var inviteSchema = new Schema({
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

var Invite = mongoose.model('Invite', inviteSchema);

module.exports = Invite;