//Data Base
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//schema of mongodb
var Schema =mongoose.Schema;

//Crypt password
var bcrypt =require('bcrypt-nodejs');



var adminUsers = new Schema({
  email:{type: String, required: true},
  password:{type: String, required: true}
});

adminUsers.methods.encryptPassword = function(password){
return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};
adminUsers.methods.validPassword = function(password){
  return bcrypt.compareSync(password, this.password);
};
module.exports = mongoose.model('User', adminUsers);
