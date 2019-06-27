var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 12;

// TODO: add a field called 'organisations' -> [], createdOrganisations -> []

var userSchema = new Schema({
	name: {
		type: String,
		lowercase: true,
		required: [true, "can't be blank"],
		minLength: 4,
		maxLength: 10,
	},
	email: {
		type: String,
		lowercase: true,
		required: [true, "can't be blank"],
		unique: true,
	},
	password: {
		type: String,
		required: true,
		minLength: 6,
	},
	posts: [{
		type: Schema.Types.ObjectId,
		ref: 'Post'
	}]
})

userSchema.pre('save', function(next) {
	var user = this;
	
	if(!user.isModified('password')) return next();

	//generate a salt
	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
		if(err) return next(err);

		 // hash the password along with our new salt
		bcrypt.hash(user.password, salt, function(err, hash) {
			if(err) return next(err);

			// override the cleartext password with the hashed one
			user.password = hash;
			next();
		});
	});
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
		if(err) return cb(err);
		cb(null, isMatch);
	});
}

var User = mongoose.model('User', userSchema);

module.exports = User;