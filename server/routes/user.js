const express = require('express');
const router = express.Router();
var Org = require('../models/Org');
var Teammate = require('../models/Teammate');

var userController = require('../controllers/userController');

//gets list of all existing oranizations
router.get('/organisations', (req, res) => {
	// console.log(req.body, 'request coming in OrgList');
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
})

//get org details page
router.get('/org/:id', (req, res) => {
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
});

module.exports = router;
