var jwt = require('jsonwebtoken');

var Org = require('../models/Org');
var User = require('../models/User');
var Post = require('../models/Post');
var Teammate = require('../models/Teammate');

//Login Form Submit 
exports.loginUser = (req, res, next) => {
	User.findOne({email: req.body.email}, (err, user) => {
		if(err) return  res.status(500).json({
			success: false,
			message: 'encountered error',
		});
		if(!user) return res.status(400).send('User NOT found. Please try again!');

		user.comparePassword(req.body.password, (err, isMatch) => {
			if(err) return res.status(500).next(err);
			if(!isMatch) return res.status(400).send('Incorrect Password. Please try again!');

			const token = jwt.sign({
				email: user.email,
				userId: user._id,
			},
			'thisisfreakingawesome',
			{
				expiresIn: "12h"
			}
			);

			console.log(token, 'login success');
			// res.setHeader("token", token);
			return res.status(200).json({
				message: 'Auth successfull',
				token: token,
				email: user.email,
				name: user.name,
				userId: user._id,
			});
		});
	});
}

exports.registerUser = (req, res) => {
	// console.log(req.body, 'this is req body in registerUser');

	if (!req.body.name || !req.body.password || !req.body.email) {
		return res.status(400).send({ message: "Name, Email and Password are mandatory."})
	}

	if (req.body.password.length < 6) {
		return res.status(400).send({ message: "Password should be atleast 6 chars." })
	}

	// TODO: Validation. for email Id, name, password: should be atleast 6 characters.

	User.findOne({email: req.body.email})
	.then(user => {
		if(user) {
			return res.status(403).json({
				success : false,
				message: 'Email already exists! please try with a different email.'
			});
		} else {
			var newUser = {
				name: req.body.name,
				email: req.body.email,
				password: req.body.password,
			}
			User.create(newUser, (err, user) => {
				// console.log(user, 'this is registered user');
				if(err) {
					return res.status(500).json({
						success: false,
						message: 'Server Error'
					})
				} 
				
				if(user && req.body.isInvited) {
					Teammate.findOneAndUpdate({teammateEmail: req.body.email}, {isVerified: req.body.isInvited}, (err, updatedTeammate) => {
						if(err) return res.status(500).json({
							success: false,
							message: 'Unable to update the invited Teammate!'
						})
						if(updatedTeammate) return res.status(200).json({
							success: true,
							message: 'Invited teammate registered successfully'
						})
					})
				} else return res.json({
					success: true,
					message: 'registration successfull'
				});
			});
		}
	});
}

exports.verifyToken = (req, res, next) => {
	var token = req.headers.authorization.split(' ')[1];
	// console.log(token, 'thisis verifyToken');
	jwt.verify(token, 'thisisfreakingawesome', (err, decoded) => {
		if(err) return res.status(403).json(err);
		// console.log(decoded, 'this is decoded');
		if(decoded) {
			req.headers.user = decoded;
			req.user = decoded;
			// console.log(req.headers.user, 'this is headers.user');
			next();
		}
	})
}

//handle Member Post Saver request
exports.savePosts = (req, res) => {
	console.log(req.body);
	//Saving info on new variable to save in DB. The keys matches with Keys in Schema.
	var newPost = {
		didToday: req.body.didToday,
		learnedToday: req.body.learnedToday,
		user: req.headers.user.userId,
		org: req.body.orgId,
		tag: req.body.tag,
	}

	Post.create(newPost, (err, post) => {
		if(err) return res.status(500).json({
			success: false,
			message: 'Unable to create Post. Server Error.',
			err
		})

		if(post) {
			User.findOneAndUpdate({_id: req.headers.user.userId}, {$push: {posts: post._id}})
			.exec((err, updatedUser) => {
				if(err) return res.status(500).json(err);
				if(updatedUser) return res.status(200).json({
					success: true,
					message: 'Post created successfully',
				})
			})
		}
	});
}

//Handle Teammate Posts get request
exports.userposts = (req, res) => {
	// console.log('request coming for userPosts');
	// console.log(req.params);
	Post.find({user: req.params.id}, null, {sort: {createdAt: -1}}, (err, userPosts) => {
		if(err) return res.status(500).json({
			success: false,
			message: 'Server Error',
			err
		})
		if(userPosts) {
			return res.status(200).json({
				success: true,
				userPosts
			})
		}
	})
}

exports.checkToken = (req, res) => {
	User.findById(req.user.userId).select('-password -email').exec(function(err, user) {
		return res.json({ user });
	});
}

exports.getOrganisations = (req, res) => {
	// TODO: Only send the orgs that the user is a member of 
	Org.find().then((orgsFound) => {
		if(!orgsFound) {
			return res.status(200).json({
				success: true,
				message: 'There are no organizations to show.'
			})
		} else {
			return res.status(200).json({ success: true, organisations: orgsFound }); 
		}
	})
}

exports.getOrganisationDetails =  (req, res) => {
	Org.findOne({_id: req.params.id})
	.populate('creator')
	.exec()
	.then(org => {
		if(!org) return res.status(500).json({
			success: false,
			message: 'Server error'
		})
		if(org) {
			Teammate.find({org: req.params.id})
			.populate('org')
			.exec()
			.then(teammate => {
				return res.status(200).json({
					success: true,
					org,
					teammate
				});
			});
		}
	});
}

// Check the refCode of Invited Member and validate it.
exports.verifyInvitedMember = (req, res) => {
	Teammate.findOne({ refCode: req.params.id })
		.then(foundTeammate => {
			if (!foundTeammate) {
				return res.status(500).json({
					success: false,
					message: 'Invited User Not Found!'
				});
			} else {
					return res.status(200).json({
						success: true,
						foundTeammate
					});
				}
		});
}