var Org = require('../models/Org');
const nodemailer = require("nodemailer");
var Teammate = require('../models/Teammate');
var Post = require('../models/Post');
var User = require('../models/User');

exports.createOrg = (req, res, next) => {
	// TODO: Add backend validations for name, file, location etc.
	console.log(req.user, 'in creating organisation');

	Org.findOne({ name: req.body.name })
	.then(foundOrg => {
		// console.log(foundOrg, 'This user already exists in DB.')
		if (foundOrg) {
			return res.status(409).json({
				success: false,
				message: 'Name taken. Please use another name.'
			});
		} else {
			// console.log('Here in the else condition')
				const { filename } = req.file;
				const iType = filename.split('.')[1];
				var newOrg = {
					name: req.body.name,
					creator: req.user.userId,
					imageUrl: {
						name: filename,
						imageType: `image/${iType}`
					},
					location: req.body.location,
				}
				// console.log(newOrg, 'Printing the org information')
				Org.create(newOrg, (err, createdOrg) => {
					console.log(createdOrg, err, 'this is createdOrg');
					if(!err) {
						Org.find({ creator: req.user.userId})
						.populate('creator')
						.exec()
						.then(foundOrgs => {
							// console.log(foundOrgs, 'All orgs created by logged in User');
							if(foundOrgs) return res.status(200).json({
								success: true,
								organisations: foundOrgs
							})
						})
					}
				});
			}
		});
			// return res.status(200).send(req.file)
}

exports.sendInvites = (req, res, next) => {
	// console.log(req.body, 'this is invite body');
	const smtpTransport = nodemailer.createTransport({
		service: "Gmail",
		auth: {
			user: 'onlyjaxsonteller@gmail.com',
			pass: 'jax@1212'
		}
	});
	let rand, mailOptions, host, link;
	// generate random ref code
	function randomN(v) {
		let rand = [];
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
		const {teammateEmail, org} = req.body;

		//creating new Teammate
		const newTeammate = {
			teammateEmail: teammateEmail,
			refCode: refCode,
			org: org,
		}
		//Checking if the invited user is already a member of any existing Orgs.
		Teammate.findOne({teammateEmail: teammateEmail})
		.exec()
		.then(teammate => {
			if(teammate) {
				console.log(teammate, 'this Teammate is already a part of one of existing Orgs');
				//find the Teammate and update the Org here
				Teammate.findOneAndUpdate({teammateEmail: teammateEmail}, {org: org}, {new: true}, (err, updatedTeammate) => {
					if(err) return res.status(500).json({
						success: false,
						message: 'Unable to update Org of existing Teammate'
					});
					if(updatedTeammate) return res.status(200).json({
						success: true,
						message: 'new Teammate validated and added to Org. Email authentication not required.',
						updatedTeammate
					});
				});
			}
			//if teammate does NOT exist in DB;
			if(!teammate) {
				Teammate.create(newTeammate, (err, invitedTeammate) => {
					if(err) return res.status(500).json({
						success: false,
						message: 'Server error encountered while creating newTeammate.'
					})
					if(invitedTeammate) {
						//send email for validation
						mailOptions = {
							to: teammateEmail,
							subject: "You've been invited to join altify organization",
							html: `Hello, <br>You've been invited to join an organization on altify.<br><br>Please <a href='${link}'>click here</a> to join.<br><br>Regards,<br>altify`
						}
						smtpTransport.sendMail(mailOptions, (err, info) => {
							if (err) return res.status(406).json({ error: "Encountered a problem while sending the invitation email" });
							return res.json({
								success: true,
								message: `Invitation email sent to ${mailOptions.to}`});
						});
					}
				});
			}

	});
}

exports.getOrgPosts = (req, res) => {
	var orgId = req.params.id;
	var userId = req.headers.userId;
	console.log(orgId, userId);
	console.log('req coming in getOrgPosts');
	Post.find({org: orgId}, null, {sort: {createdAt: -1}})
	.populate('user')
	.exec((err, orgPosts) => {
		if(err) return res.status(500).json({
			success: false,
			err
		})
		if(orgPosts) return res.status(200).json({
			success: true,
			orgId: orgId,
			orgPosts
		})
	})

	// Post.find({org: orgId}, (err, orgPosts) => {
	// 	if(err) return res.status(500).json({
	// 		success: false,
	// 		err
	// 	})
	// 	if(orgPosts) return res.status(200).json({
	// 		success: true,
	// 		orgId: orgId,
	// 		orgPosts
	// 	})
	// })

}

