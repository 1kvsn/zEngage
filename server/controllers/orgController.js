var Org = require('../models/Org');
const nodemailer = require('nodemailer');
var Invite = require('../models/Invite');
var Post = require('../models/Post');
var User = require('../models/User');
var Comment = require('../models/Comment');

exports.createOrg = (req, res) => {
	//name and location existence check
	if (!req.body.name || !req.body.location) {
		return res.status(400).send({ message: "Name, Location and Image are mandatory to create an Organisation." });
	}

	//file size check
	// if(req.file.size && req.file.size >= 10000000/2) {
	// 	return res.status(400).send({message: 'Image is mandatory. Image file size must be below 5MB'});
	// }

	Org.findOne({ name: req.body.name })
		.then(foundOrg => {
			if (foundOrg) {
				return res.status(409).json({
					success: false,
					message: 'Name taken. Please use another name.'
				});
			} else {
				// const { filename } = req.file;
				// const iType = filename.split('.')[1];
				var newOrg = {
					name: req.body.name,
					creator: req.user.userId,
					// imageUrl: {
					// 	name: filename,
					// 	imageType: `image/${iType}`
					// },
					location: req.body.location,
					members: [req.user.userId]
				}
				Org.create(newOrg, (err, createdOrg) => {
					if (err) {
						return res.status(500).json({
							success: false,
							err
						});
					} else {
						User.findByIdAndUpdate(req.headers.userId,
							{
								$push: {
									createdOrganisations: createdOrg.id,
									organisations: createdOrg.id
								}
							}, { new: true }, (err, updatedUser) => {
								if (err) {
									res.status(500).json({
										success: false,
										message: 'Encountered error while updating User.',
										err
									});
								} else {
									Org.find({ members: req.user.userId })
										.then(foundOrgs => {
											console.log(foundOrgs, 'All orgs user is part of');
											if (foundOrgs) return res.status(200).json({
												success: true,
												organisations: foundOrgs
											})
										})
								}
							})
					}
				});
			}
		});
}


exports.sendInvites = (req, res) => {
	// console.log(req.body, 'this is invite body');
	const smtpTransport = nodemailer.createTransport({
		service: "Gmail",
		auth: {
			user: 'onlyjaxsonteller@gmail.com',
			pass: 'teller@1212'
		}
	});
	let rand, mailOptions, host, link;
	// generate random ref code
	function randomN(v) {
		rand = [];
		let alphaNum = 'abcdefghijklmnopqrstuvwxyz0123456789';
		for (let i = 0; i < v; i++) {
			let random = Math.floor(Math.random() * 36);
			rand.push(alphaNum[random])
		}
		return rand.join('');
	}
	// it'll provide your localhost or network address
	host = req.get("host");
	let refCode;
	refCode = randomN(6);
	link = `http://${host}/users/register?ref=${refCode}`;
	const { teammateEmail, org } = req.body;

	//creating new Teammate
	const newTeammate = {
		teammateEmail: teammateEmail,
		refCode: refCode,
		org: org,
	}
	//Checking if the invited user is already a member of any existing Orgs
	Invite.findOne({ teammateEmail: teammateEmail })
		.then(teammate => {
			if (teammate) {
				console.log(teammate, 'this Teammate is already a part of one of existing Orgs');
				//find the Teammate and update the Org here
				Invite.findOneAndUpdate({ teammateEmail: teammateEmail }, { org: org }, { new: true }, (err, updatedTeammate) => {
					if (err) return res.status(500).json({
						success: false,
						message: 'Unable to update Org of existing Teammate'
					});
					if (updatedTeammate) return res.status(200).json({
						success: true,
						message: 'new Teammate validated and added to Org. Email authentication not required.',
						updatedTeammate
					});
				});
			}
			//if teammate does NOT exist in DB;
			if (!teammate) {
				Invite.create(newTeammate, (err, invitedTeammate) => {
					if (err) return res.status(500).json({
						success: false,
						message: 'Server error encountered while creating newTeammate.'
					})
					if (invitedTeammate) {
						//send email for validation
						mailOptions = {
							to: teammateEmail,
							subject: "You've been invited to join an organization on zEngage",
							html: `Hello, <br>You've been invited to join an organization on zEngage.<br><br>Please <a href='${link}'>click here</a> to join.<br><br>Regards,<br>zEngage`
						}
						smtpTransport.sendMail(mailOptions, (err, info) => {
							if (err) return res.status(406).json({ error: "Encountered a problem while sending the invitation email" });
							return res.json({
								success: true,
								message: `Invitation email sent to ${mailOptions.to}`
							});
						});
					}
				});
			}
		});
}

exports.getOrgPosts = (req, res) => {
	var orgId = req.params.id;
	// var userId = req.headers.userId;
	Post.find({ org: orgId }, null, { sort: { createdAt: -1 } })
		.populate('user', '-password')
		.exec((err, orgPosts) => {
			if (err) {
				return res.status(500).json({
					success: false,
					err
				});
			} else {
				return res.status(200).json({
					success: true,
					orgId: orgId,
					orgPosts
				});
			}
		});
}

exports.addComments = (req, res) => {
	var newComment = {
		post: req.body.postId,
		user: req.headers.userId,
		content: req.body.comment,
	}
	Comment.create(newComment, (err, comment) => {
		if (err) {
			return res.status(500).json({
				success: false,
				message: 'Unable to save comment'
			});
		} else {
			Post.findByIdAndUpdate(req.body.postId, 
				{ $push: { comments: comment._id } }, 
				{ new: true }
				)
				.populate('user', '-password')
				.exec((err, updatedPost) => {
					if (err) {
						res.status(500).json({
							success: false,
							message: 'Encountered error while updating Post.',
							err
						});
					} else {
						Comment.find({ post: req.body.postId })
							.then(comments => {
								console.log(comments, 'are all comments for single post...');
								if (comments) {
									return res.status(200).json({
										success: true,
										comments: comments,
										post: updatedPost
									});
								}
							})
					}
				})
		}
	})
}