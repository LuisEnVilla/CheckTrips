var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	//Top viajes mas caros en traslado
	db.viaje.find({$or:[{FechaInicio:{$regex:"08/"}},{FechaInicio:{$regex:"07/"}}]}
		,'_id Tema Tipo GastoPasaje FechaInicio Origen Destino Funcionario_id').skip(1)
		.limit(3).populate('Funcionario_id').exec(function (err, fecha){
			if (err) res.send(500, err.message);
			db.viaje.find({GastoPasaje : {$gt:8000}},'_id Tema CostoHospedaje ViaticosComp Tipo GastoPasaje Origen Destino Funcionario_id').limit(3).populate('Funcionario_id').exec(function (err, viajes){
				if (err) res.send(500, err.message);
			//viajes mas caros en viaticos
				db.viaje.find({ViaticosComp : {$gt:5000}},'_id Tema CostoHospedaje ViaticosComp Tipo GastoPasaje Origen Destino Funcionario_id').limit(3).populate('Funcionario_id').exec(function (err, viajes2){
					if (err) res.send(500, err.message);
					db.unidad.find({CounViajes : {$gt:1}},'_id Nombre CounViajes CountFuncionarios').exec(function (err, unidades){
						if (err) res.send(500, err.message);
						res.render('top',{fecha:fecha, viajes:viajes, viajes2:viajes2,unidades:unidades});
					});
				});
			});
		});
});

module.exports = router;