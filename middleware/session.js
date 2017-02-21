var User = require('../models/adminUsers');

module.exports = function(req, res, next){
	if(!req.session.user_id){
    console.log('Usuarion no logeado');
		next();
	}
	else{
		User.findById(req.session.user_id, function(err, user){
			if(err)
			{
				console.log(err);
				res.redirect('/User_login')
			}else{
        console.log("encontrado");
				res.locals = { user : user }
				next();
			}
		});

	}
};
