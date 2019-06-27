var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// TODO: add a field called 'members' -> []

var orgSchema = new Schema({
	name: {
		type: String,
		required: true,
		minLength: 4,
		maxLength: 16,
		lowercase: true,
	},
	creator: { 
		type: Schema.Types.ObjectId, 
		ref: 'User',
	},
	imageUrl: {
		name: String,
		imageType: String
	},
	location: {
		type: String,
	},
	members: [
		{
			type: Schema.Types.ObjectId,
			ref: 'User',
		}
	]
}, {timestamps: true})

var Org = mongoose.model('Org', orgSchema);

module.exports = Org;