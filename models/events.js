var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var Schema = mongoose.Schema;

var EventsScrhema = new Schema({
    titulo: {type:String, required:true},
    img_event: {type:String, required:true},
    informacion: {type:String, required:true},
    autor:{type:String, required:true},
    creator:{
      type: Schema.Types.ObjectId,
      ref: "User"
    }
});

module.exports = mongoose.model('Events', EventsScrhema);
