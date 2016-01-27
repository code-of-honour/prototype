var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer')

/* GET Hello World page. */
router.get('/', function(req, res) {
    res.render('index', { title: 'Prototype' });
});

router.get('/library', function(req, res) {
    res.render('library', { title: 'Library' });
});

router.get('/about', function(req, res) {
    res.render('about', { title: 'About Me' });
});

router.get('/contact', function(req, res) {
    res.render('contact', { title: 'Contact' });
});

/* GET Userlist page. */
router.get('/userlist', function(req, res) {
	var db = req.db // extract the db object we passed to our http req
	var collection = db.get('usercollection')
	collection.find({}, {}, function(e, docs) {
		res.render('userlist', {
			"userlist" : docs 
		})
	})
})

/* GET New User page. */
router.get('/newuser', function(req, res) {
	res.render('newuser', { title: 'Add New User'})
})

/* POST to Add User Service */
router.post('/adduser', function(req, res) {
	var db = req.db
	var userName = req.body.username
	var userEmail = req.body.useremail
	var collection = db.get('usercollection')
	collection.insert({
		"username" : userName,
		"email" :userEmail
	}, function (err, doc) {
		if (err) {
			res.send("Problem adding information")
		}
		else {
			res.redirect("userlist")
		}
	})
})

module.exports = router;

/* Tell our app which collection we want to use
 * Do a find, then return the results as the variable "docs"
 * Once we have those docs, do a render of userlist (which will need a corresponding jade template)
 * Give it the userlist variable to work with and apssing our db docs to the variable
 */
