var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res) {
	db.users.find({$or:[{PhoneNumber:req.body.telefono},{Email: req.body.email}]}).count(function (err, count){
		if (count != 0 ){
			if (req.body.tipo == "Funcionario"){
				db.findOne({$or:[{PhoneNumber:req.body.telefono},{Email: req.body.email}]}, function (err, user){
				  user.FuncionariosSeguidos.$addtoset(req.body.id);
				  user.save();
				});
				res.redirect("/funcionario/"+req.body.id);
			}
		}
		else{
				var user = new db.users({
					PhoneNumber : req.body.telefono,
				    Name : req.body.nombre,
				    Email : req.body.email,
				    FuncionariosSeguidos : [],
				    ViajeSeguidos : []
					});
					user.save(function(err, tvshow) {
						res.redirect("/funcionario/"+req.body.id);
					});
			}
	});
});

module.exports = router;