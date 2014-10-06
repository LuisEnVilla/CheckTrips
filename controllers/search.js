var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/top', function(req, res) {
	db.viaje.find({FechaInicio:{$regex:"08/"}}
		,'Consecutivo Aclaraciones _id Tema  GastoPasaje FechaInicio Origen Destino Funcionario_id')
		.limit(4).populate('Funcionario_id').exec(function (err, fecha){
			if (err) res.send(500, err.message);
			db.viaje.find({$or:[{GastoPasaje:{$type:16}},{GastoPasaje:{$type:18}},{GastoPasaje:{$type:1}}]},'Consecutivo Aclaraciones _id Tema  GastoPasaje FechaInicio Origen Destino Funcionario_id').populate('Funcionario_id').sort({GastoPasaje : -1}).limit(4).exec(function (err, viajes){
				if (err) res.send(500, err.message);
				db.viaje.find({$or:[{GastosViaticos:{$type:16}},{GastosViaticos:{$type:18}},{GastosViaticos:{$type:1}}]},'Consecutivo Aclaraciones _id Tema  GastoPasaje FechaInicio Origen Destino Funcionario_id').populate('Funcionario_id').sort({GastosViaticos : -1}).limit(4).exec(function (err, viajes2){
					if (err) res.send(500, err.message);
					res.render('search',{fecha:fecha, viajes:viajes, viajes2:viajes2});
				});
			});
		});
});
router.get('/viajes', function(req, res) {
	db.viaje.find({},
		'Consecutivo Aclaraciones _id Tema  GastoPasaje FechaInicio Origen Destino Funcionario_id')
		.populate('Funcionario_id').exec(function (err, viajes){
			if (err) res.send(500, err.message);
			res.render('viajes',{viajes:viajes});			
		});
});

router.post('/viajes',(function(req,res){
	db.viaje.find({Consecutivo : req.body.buscar},'Consecutivo Aclaraciones _id Tema  GastoPasaje FechaInicio Origen Destino Funcionario_id')
	.populate('Funcionario_id').exec(function (err, viajes){
			if (err) res.send(500, err.message);
			res.render('viajes',{viajes:viajes});			
		});
}));

router.get('/funcionarios', function(req, res) {
	db.funcionario.find({Viajes:{$exists:true}}).sort({"Nombre.Nombres" : 1}).populate('Viajes').exec((function(err,aux){
		res.render('searchfun',{funcionarios:aux});
		//res.send(aux);
	}));
});

router.post('/funcionarios', function(req, res) {
	db.funcionario.find({'Nombre.Nombres':req.body.buscar}).sort({"Nombre.Nombres" : 1}).populate('Viajes').exec((function(err,aux){
		res.render('searchfun',{funcionarios:aux});
		//res.send(aux);
	}));
});

router.get('/dependencias', function(req, res) {
	db.unidad.find().sort({Nombre : 1}).populate('Viajes').exec(function (err, unidades){
			if (err) res.send(500, err.message);
			//res.send(unidades);
			res.render('dependencias',{dependencias:unidades});			
		});
});

router.post('/dependencias', function(req, res) {
	db.unidad.find({Nombre :{$regex:req.body.buscar}}).sort({Nombre : 1}).populate('Viajes').exec(function (err, unidades){
			if (err) res.send(500, err.message);

			//res.send(unidades);
			res.render('dependencias',{dependencias:unidades});			
		});
});

module.exports = router;