var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/top', function(req, res) {
		db.viaje.find({FechaInicio:{$regex:"08/"}}
		,'Consecutivo Aclaraciones _id Tema Tipo GastoPasaje FechaInicio Origen Destino Funcionario_id')
		.limit(3).populate('Funcionario_id').exec(function (err, fecha){
			if (err) res.send(500, err.message);
			db.viaje.find({$or:[{GastoPasaje:{$type:16}},{GastoPasaje:{$type:18}},{GastoPasaje:{$type:1}}]},'Consecutivo Aclaraciones _id Tema CostoHospedaje GastosViaticos Tipo GastoPasaje Origen Destino Funcionario_id').populate('Funcionario_id').sort({GastoPasaje : -1}).limit(3).exec(function (err, viajes){
				if (err) res.send(500, err.message);
				db.viaje.find({$or:[{GastosViaticos:{$type:16}},{GastosViaticos:{$type:18}},{GastosViaticos:{$type:1}}]},'Consecutivo Aclaraciones _id Tema CostoHospedaje GastosViaticos Tipo GastoPasaje Origen Destino Funcionario_id').populate('Funcionario_id').sort({GastosViaticos : -1}).limit(3).exec(function (err, viajes2){
					if (err) res.send(500, err.message);
					db.unidad.find({CounViajes : {$gt:1}},'_id Nombre CounViajes CountFuncionarios').exec(function (err, unidades){
						if (err) res.send(500, err.message);
						res.send({Recientes:fecha,GastoPasaje:viajes,GastosViaticos:viajes2,Unidades:unidades});
					});
				});
			});
		});
});
router.get('/viaje/:dato2/:dato3', function(req, res) {
	var criterio = req.params.dato2;
	var limite = req.params.dato3;
		if (criterio == "consecutivo" || criterio == "Consecutivo"){
			var consecutivo = limite;
			db.viaje.find({Consecutivo: {$regex :consecutivo}}).populate('Funcionario_id').exec(function (err, viajes){
			res.send(viajes);
			});
		}
		else if (criterio == "byId"){
			var id = limite;
			db.viaje.findById(id).populate('Funcionario_id').exec(function (err, viajes){
			res.send(viajes);
			});
		}
		else if (criterio == "maxPasaje"){
			db.viaje.find({$or:[{GastoPasaje:{$type:16}},{GastoPasaje:{$type:18}},{GastoPasaje:{$type:1}}]}).sort({GastoPasaje : -1}).populate('Funcionario_id').limit(parseInt(limite)).exec(function (err, viajes){
			res.send(viajes);
			});
		}
		else if (criterio == "maxViaticos"){
			db.viaje.find({$or:[{GastosViaticos:{$type:16}},{GastosViaticos:{$type:18}},{GastosViaticos:{$type:1}}]}).sort({GastosViaticos : -1}).populate('Funcionario_id').limit(parseInt(limite)).exec(function (err, viajes){
			res.send(viajes);
			});
		}
		else if (criterio == "maxHospedaje"){
			db.viaje.find({$or:[{CostoHospedaje:{$type:16}},{CostoHospedaje:{$type:18}},{CostoHospedaje:{$type:1}}]}).sort({CostoHospedaje : -1}).populate('Funcionario_id').limit(parseInt(limite)).exec(function (err, viajes){
			res.send(viajes);
			});
		}
		else if (criterio == "idFuncionario"){
			var funcionario = limite;
			db.viaje.findOne({Funcionario_id:funcionario}).populate('Funcionario_id').exec(function (err, viajes){
			res.send(viajes);
			});
		}
		});

router.get('/All/:dato2/', function(req, res) {
	var criterio = req.params.dato2;
		if (criterio == "viaje" || criterio == "Viaje"){
			db.viaje.find().populate('Funcionario_id').exec(function (err, viajes){
			res.send(viajes);
			});
		}
		else if (criterio == "funcionario" || criterio == "Funcionario"){
			db.funcionario.find().exec(function (err, funcionarios){
			res.send(funcionarios);
			});
		}
	});
	//}
router.get('/funcionario/:dato2/:dato3', function(req, res) {
	var criterio = req.params.dato2;
		if (criterio == "nombre"){
			var nombre = req.params.dato3;
			db.funcionario.find({'Nombre.Nombres':{$regex :nombre }}).exec(function (err, funcionarios){
			res.send(funcionarios);
			});
		}
});
/* GET home page. */
/*router.post('/users', function(req, res) {
	db.funcionario.findOne({Correo : req.body.email},function(err, usuario){
			if (err) res.send(500, err.message);
			if (req.body.password === usuario.Trabajo.Clave){
				res.json({
					id : usuario._id,
					Nombre : usuario.Nombre.Nombres +" "+ usuario.Nombre.ApellidoP +" "+ usuario.Nombre.ApellidoM,
					Correo : usuario.Correo
				});
			}	
			else {
				res.json({
					id : "none",
					Nombre : "none",
					Correo : "none"
				});
			}
		}
	);
});

router.get('/users/viajes/:id',function(req, res){
	db.viaje.find({Funcionario_id : req.params.id},'GastoTotal Consecutivo Aclaraciones Tema FechaInicio Destino DatosEvento ',
		function (err, viajes){
		if (err) res.send(500, err.message);
		res.status(200).jsonp(viajes)
	});
});*/

module.exports = router;