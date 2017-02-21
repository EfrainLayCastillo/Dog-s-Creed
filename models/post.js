var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

var post_Schema = new Schema({
  titulo:{type:String, required:true}

});

module.exports =mongoose.model('Post', post_Schema);
