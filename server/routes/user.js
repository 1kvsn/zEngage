const express = require('express');
const router = express.Router();

var userController = require('../controllers/userController');

// //gets list of all oranizations user is part of
// router.get('/organisations', userController.getOrganisations)

// //get org details page
// router.get('/org/:id', userController.getOrganisationDetails);

module.exports = router;
