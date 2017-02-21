var Blogger = require('../models/blog');

module.exports = function(req, res, next){
  Blogger.find({}).populate("creator").exec(function(err, blog){
            console.log("Entro a middlware Find blog de " + req.session.blog);
          if (blog != null) {
            console.log("Encontro la imagen del creador: " + blog._id);
            res.locals.blog = blog;
            next();
          }else {
            console.log("No encontro la imagen");
            res.redirect("/");
          }
      })
}
