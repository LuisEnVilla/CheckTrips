var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
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
						res.render('search',{fecha:fecha, viajes:viajes, viajes2:viajes2,unidades:unidades});
					});
				});
			});
		});
});

module.exports = router;