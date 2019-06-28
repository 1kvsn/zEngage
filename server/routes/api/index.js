const express = require('express');
const router = express.Router();
var multer = require('multer');
var path = require('path');

const userController = require('../../controllers/userController');
const orgController = require('../../controllers/orgController');
var uploadPath = path.join(__dirname, '../..', 'public/uploads');


//handle Image File Upload 
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, uploadPath)
	},
	filename: function (req, file, cb) {
		//ensure the fileName is not repeated. So, added Date.now()
		cb(null, Date.now() + '-' + file.originalname)
	}
})

var upload = multer({ storage: storage });

router.get('/check/token', userController.verifyToken, userController.checkToken);

// Check the refCode of Invited Member and validate it.
router.get('/users/register/verify/:id', userController.verifyInvitedMember);

//Login Form Submit 
router.post('/users/login', userController.loginUser);

//Register Page Submit
router.post('/register', userController.registerUser);

//CreateOrg page submit
router.post('/users/organisations', userController.verifyToken, upload.single('file'), orgController.createOrg);

//handle Invitation Email Post request
router.post('/users/org/invite', orgController.sendInvites);

//handle Member Post Saver request
router.post('/users/posts', userController.verifyToken, userController.savePosts)

//token verify 
router.get('/users/verify', userController.verifyToken)

//Handle Member Posts get request
router.get('/users/:id/posts', userController.userposts)

//Handle request for fetching all Org Posts
router.get('/users/org/:id/posts', orgController.getOrgPosts)

//gets list of all oranizations user is part of
router.get('/users/organisations', userController.verifyToken, userController.getOrganisations)

//get org details page
router.get('/users/org/:id', userController.getOrganisationDetails);

module.exports = router;