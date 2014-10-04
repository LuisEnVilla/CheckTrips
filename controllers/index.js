var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	db.viaje.find({FechaInicio:{$regex:"08/"}}
		,'Consecutivo Aclaraciones _id Tema Tipo GastoPasaje FechaInicio Origen Destino Funcionario_id')
		.limit(3).populate('Funcionario_id').exec(function (err, fecha){
			if (err) res.send(500, err.message);
			db.viaje.find({GastoPasaje : {$gt:8000}},'Consecutivo Aclaraciones _id Tema CostoHospedaje GastosViaticos Tipo GastoPasaje Origen Destino Funcionario_id').limit(3).populate('Funcionario_id').exec(function (err, viajes){
				if (err) res.send(500, err.message);
				db.viaje.find({GastosViaticos : {$gt:8000}},'Consecutivo Aclaraciones _id Tema CostoHospedaje GastosViaticos Tipo GastoPasaje Origen Destino Funcionario_id').limit(3).populate('Funcionario_id').exec(function (err, viajes2){
					if (err) res.send(500, err.message);
					db.unidad.find({CounViajes : {$gt:1}},'_id Nombre CounViajes CountFuncionarios').exec(function (err, unidades){
						if (err) res.send(500, err.message);
						res.render('index',{fecha:fecha, viajes:viajes, viajes2:viajes2,unidades:unidades});
					});
				});
			});
		});
});

module.exports = router;