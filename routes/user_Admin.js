var express = require('express');
var router = express.Router();
//protection
var csrf= require('csurf');
var passport = require('passport');
// Models
var User = require('../models/adminUsers');
var Events = require('../models/events');
var Blog_Post = require('../models/post');


//Profile section
router.get('/profile', isLoggedIn, function(req, res, next){
    user = req.user;
    res.render('partials/admins/profile',{user});
});
/* Rest */
router.get('/post/new',isLoggedIn, function(req, res){
  res.render('partials/post/new', {});
});
router.get('/post/:id/edit', function(req, res){
  Blog_Post.findById(req.params.id, function(err, data){
    res.render('partials/post/edit', {post:data});
  })
});
router.route('/post/:id', isLoggedIn)
      .get(function(req, res){
        Blog_Post.findById(req.params.id, function(err, data){
          res.render('partials/post/show', {post:data});
        })
      })
      .put(function(req, res){
        Blog_Post.findById(req.params.id, function(err, data){
          data.titulo = req.body.titulo;
          data.save(function(err){
            if (!err) {
              res.render('partials/post/show', {post:data});
            }else {
              res.render('partials/post/' + data.id + 'edit', {post:data});
            }
          });
        })
      })
      .delete(function(req, res){
        Blog_Post.findOneAndRemove({_id: req.params.id}, function(err){
          if (!err) {
            res.redirect("/admin/post");
          }else {
            console.log(String(err));
            res.redirect("admin/post" + req.params.id);
          }
        });
      });

router.route('/post', isLoggedIn)
            .get(function(req, res){
              Blog_Post.find({}, function(err, post){
                if (err) {
                  res.redirect("/");
                  return;
                }
                res.render('partials/post/mypost',{post:post});
              });
            })
            .post(function(req, res){
              var data = {
                titulo:req.body.titulo
              }
                console.log("pase por aqui :3");
              var Post = new Blog_Post(data);
              Post.save(function(err){
                if (err) {
                  console.log(String(err));
                }else {
                  console.log("Guardamos tu Post");
                  res.redirect("/admin/post/" + Post._id )
                }
              });
            });

/* logout*/
router.get('/logout', isLoggedIn, function(req, res, next){
  req.logout();
  res.redirect('/');
});

// Events
router.get('/new_event',isLoggedIn, function(req, res, next){
  res.render('partials/events/new_event', {user});
});
//Post new Events
router.post('/new_event', function(req, res, next){
    var item = {
      titulo: req.body.titulo,
      img_event: req.body.img_event,
      informacion: req.body.informacion,
      autor: req.body.autor
    };
    console.log(item);
    var data = new Events(item);
    data.save(function(err){
      if (err) {
        console.log(String(err));
      }
      console.log(data);
      res.redirect('/events');
    });
});

router.use('/', notLoggedIn, function(req,res,next){
  next();
});

//Views
router.get('/User_register', function(req,res,next){
  var messages = req.flash('error');
  res.render("partials/admins/User_register",{});
});
//Engine Post Data Base

router.post('/User_register', passport.authenticate('local.signup', {
    successRedirect: '/admin/profile',
    failureRedirect: '/admin/User_register',
    failureFlash: true
}));
//Engine Login Data Base
router.get('/User_login', function(req, res, next){
  var messages = req.flash('error');
  res.render("partials/admins/User_login",{});
});
router.post('/User_login', passport.authenticate('local.signin', {
    successRedirect: '/admin/profile',
    failureRedirect: '/admin/User_login',
    failureFlash: true
}));


module.exports = router;

function isLoggedIn(req, res, next){
  if (req.isAuthenticated()) {
    return next();
  }
    res.redirect('/');
}
function notLoggedIn(req, res, next){
    if (!req.isAuthenticated()) {
      return next();
    }
      res.redirect('/');
}
