var passport = require('passport');
var User = require('../models/adminUsers');
var LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user, done){
  done(null, user.id);
});
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
    done(err, user);
  });
});

passport.use('local.signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function(req, email, password, done){
  req.checkBody('email', 'Invalid email').notEmpty().isEmail();
  req.checkBody('password', 'Invalid password').notEmpty().isLength({min:4});
  var errors = req.validationErrors();
  if (errors) {
    var messages = [];
    errors.forEach(function(error){
      messages.push(error.msg);
    });
    return done(null, false, req.flash('error', messages));
  }
  User.findOne({'email': email}, function(err, user){
    if (err) {console.log("1");return done(err);}
    if (user) {
      console.log("Alredy in use");
      return done(null, false, {message: 'Ya este correo de perro esta en uso'});
    }
    var newUser = new User();
    newUser.email = email;
    console.log("este es tu email: " + newUser.email);
    newUser.password = newUser.encryptPassword(password);
    newUser.save(function(err, result){
      if (err) {
        return done(err);
      }
      //  console.log("ok user");
        return done(null, newUser);
    });
  });
}));

passport.use('local.signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, email, password, done){
  req.checkBody('email', 'Invalid email').notEmpty().isEmail();
  req.checkBody('password', 'Invalid password').notEmpty();
  var errors = req.validationErrors();
  if (errors) {
    var messages = [];
    errors.forEach(function(error){
      messages.push(error.msg);
    });
    return done(null, false, req.flash('error', messages));
  }
  User.findOne({'email': email}, function(err, user){
    if (err) {
      return done(err);
    }
    if (!user) {
      console.log("Alredy in use");
      return done(null, false, {message: 'No se encuentra a ese perro'});
    }
    if (!user.validPassword(password)) {
        return done(null, false, {message: 'La contrasenia esta mal escrita'});
    }
      req.session.user_id = user._id
      console.log("Iniciando session con:" + req.session.user_id);
      return done(null, user);
  });
}));
