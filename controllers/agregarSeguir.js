var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res) {
	db.users.find({$or:[{PhoneNumber:req.body.telefono},{Email: req.body.email}]}).count(function (err, count){
		if (count != 0 ){
			if (req.body.tipo == "Funcionario"){
				db.users.findOneAndUpdate({$or:[{PhoneNumber:req.body.telefono},{Email: req.body.email}]},{$addToSet : {FuncionariosSeguidos :req.body.id }});
				var mensajes = new db.mensaje({
						Destino : req.body.telefono,
    					Mensaje : "Hola "+ req.body.nombre +", Se ha agregado a tu lista de "+req.body.tipo+"s que sigues a "+req.body.nombreSolicitud+".",
					});
				mensajes.save();
				res.redirect("/funcionario/"+req.body.id);
			}
			else{
				db.users.findOneAndUpdate({$or:[{PhoneNumber:req.body.telefono},{Email: req.body.email}]},{$addToSet : {ViajeSeguidos :req.body.id }});
				var mensajes = new db.mensaje({
						Destino : req.body.telefono,
    					Mensaje : "Hola "+ req.body.nombre +", Se ha agregado a tu lista de "+req.body.tipo+"s que sigues a "+req.body.nombreSolicitud+".",
					});
				mensajes.save();
				res.redirect("/profile/"+req.body.id);
			}
		}
		else{
				if (req.body.tipo == "Funcionario"){
					var user = new db.users({
						PhoneNumber : req.body.telefono,
					    Name : req.body.nombre,
					    Email : req.body.email,
					    FuncionariosSeguidos : [req.body.id],
					    ViajeSeguidos : []
					});
					user.save();
					var mensajes = new db.mensaje({
						Destino : req.body.telefono,
    					Mensaje : "Hola "+ req.body.nombre +", bienvenido a CheckTrip, la plataforma para seguir, registrar y aclarar los viajes de funcionarios públicos del ifai. Acabas de registrar tu numero desde checktrip.mx, ahora podrás recibir las notificaciones correspondientes al funcionario "+req.body.nombreSolicitud+" , además de las aclaraciones que dicho funcionario proporcione.",
					});
					mensajes.save();
					res.redirect("/funcionario/"+req.body.id);
					
				}
				else{
					var user = new db.users({
						PhoneNumber : req.body.telefono,
					    Name : req.body.nombre,
					    Email : req.body.email,
					    FuncionariosSeguidos : [],
					    ViajeSeguidos : [req.body.id]
					});
					user.save();
					var mensajes = new db.mensaje({
						Destino : req.body.telefono,
    					Mensaje : "Hola "+ req.body.nombre +", bienvenido a CheckTrip, la plataforma para seguir, registrar y aclarar los viajes de funcionarios públicos del ifai. Acabas de registrar tu numero desde checktrip.mx, ahora podrás recibir las notificaciones correspondientes al viaje con el numero de comision "+req.body.nombreSolicitud+" , además de las aclaraciones correspondientes de dicho viaje.",
					});
					mensajes.save();
					res.redirect("/profile/"+req.body.id);
				}
			}
	});
});

module.exports = router;