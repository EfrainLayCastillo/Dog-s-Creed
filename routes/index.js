var express = require('express');
var router = express.Router();
var Events = require('../models/events');

router.use('/', function(req,res,next){
  user = req.user;
  next();
});
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Dog\'s Creed', user });
});
/* GET Events Page */
router.get('/events', function(req, res, next){
  Events.find()
        .then(function(doc){
            res.render('partials/events/index', {user, Event_items: doc});
        });
});
router.get('/team_workers', function(req, res, next){
  res.render('partials/team_workers/index');
});
/* GET Projects page */
router.get('/projects', function(req, res, next){
  res.render('partials/projects/index', {user});
});
/* GET Development page */
router.get('/development', function(req, res, next){
  res.render('partials/development/index', {user});
});

module.exports = router;
