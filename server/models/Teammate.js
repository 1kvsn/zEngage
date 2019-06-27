var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// TODO: maybe change the name from 'teammate' to 'invites'

var teammateSchema = new Schema({
	name: {
		type: String,
		default: 'aManWithNoName'
	},
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
	org: {
		type: Schema.Types.ObjectId,
		ref: 'Org',
	}
})

var Teammate = mongoose.model('Teammate', teammateSchema);

module.exports = Teammate;