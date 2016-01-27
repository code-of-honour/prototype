var express = require('express');
var router = express.Router();

/* GET routes */
router.get('/', function(req, res, next) {
  res.send('Home');
});

router.get('/library', function(req, res, next) {
  res.send('Library');
});

router.get('/contact', function(req, res, next) {
  res.send('Contact Us');
});

router.get('projects', function(req, res, next) {
	res.send('Current Projects')
})

module.exports = router;
